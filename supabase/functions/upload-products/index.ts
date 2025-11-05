import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import * as XLSX from 'https://esm.sh/xlsx@0.18.5';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const tierPrice = formData.get('tierPrice') as string;

    if (!file) {
      throw new Error('No file provided');
    }

    if (!tierPrice || !['100', '200', '300'].includes(tierPrice)) {
      throw new Error('Invalid tier price');
    }

    console.log(`Processing file: ${file.name}, Tier: $${tierPrice}`);

    // Read the file
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(arrayBuffer));
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    console.log(`Found ${jsonData.length} rows to process`);

    // Determine tier name based on price
    let tierName = 'standard';
    if (tierPrice === '100') tierName = 'basic';
    else if (tierPrice === '300') tierName = 'elite';

    // Get tier ID
    const { data: tierData, error: tierError } = await supabaseClient
      .from('box_tiers')
      .select('id')
      .eq('tier_name', tierName)
      .single();

    if (tierError || !tierData) {
      throw new Error(`Tier not found: ${tierName}`);
    }

    // Delete existing combinations for this tier to prevent duplicates
    console.log(`Deleting existing combinations for tier: ${tierName}`);
    const { error: deleteError } = await supabaseClient
      .from('box_combinations')
      .delete()
      .eq('tier_id', tierData.id);

    if (deleteError) {
      console.error('Error deleting existing combinations:', deleteError);
      throw new Error(`Failed to clear existing combinations: ${deleteError.message}`);
    }
    console.log('Existing combinations cleared successfully');

    // Process data in background
    const processData = async () => {
      let successCount = 0;
      let errorCount = 0;
      const errors: string[] = [];
      const BATCH_SIZE = 10;

      // Process in batches to reduce memory usage
      for (let batchStart = 0; batchStart < jsonData.length; batchStart += BATCH_SIZE) {
        const batchEnd = Math.min(batchStart + BATCH_SIZE, jsonData.length);
        const batch = jsonData.slice(batchStart, batchEnd);

        // Process batch in parallel
        await Promise.all(
          batch.map(async (row: any, index) => {
            const rowNum = batchStart + index + 1;
            try {
              // Extract product data
              const products = [
                {
                  brand: row['Main BRAND'],
                  model: row['Main MODEL'],
                  product_name: row['Main PRODUCT NAME'],
                  user_price: parseFloat(row['Main User$']?.toString().replace(/[$,]/g, '') || '0'),
                  retail_price: parseFloat(row['Main Retail$']?.toString().replace(/[$,]/g, '') || '0'),
                },
                {
                  brand: row['Sec1 BRAND'],
                  model: row['Sec1 MODEL'],
                  product_name: row['Sec1 PRODUCT NAME'],
                  user_price: parseFloat(row['Sec1 User$']?.toString().replace(/[$,]/g, '') || '0'),
                  retail_price: parseFloat(row['Sec1 Retail$']?.toString().replace(/[$,]/g, '') || '0'),
                },
                {
                  brand: row['Sec2 BRAND'],
                  model: row['Sec2 MODEL'],
                  product_name: row['Sec2 PRODUCT NAME'],
                  user_price: parseFloat(row['Sec2 User$']?.toString().replace(/[$,]/g, '') || '0'),
                  retail_price: parseFloat(row['Sec2 Retail$']?.toString().replace(/[$,]/g, '') || '0'),
                },
              ];

              const productIds: string[] = [];

              // Upsert each product using upsert for efficiency
              for (const product of products) {
                if (!product.model || !product.product_name) continue;

                const { data, error } = await supabaseClient
                  .from('products')
                  .upsert({
                    brand: product.brand,
                    model: product.model,
                    product_name: product.product_name,
                    user_price: product.user_price,
                    retail_price: product.retail_price,
                  }, {
                    onConflict: 'model',
                    ignoreDuplicates: false
                  })
                  .select('id')
                  .single();

                if (error) {
                  console.error(`Error upserting product ${product.model}:`, error);
                  continue;
                }
                if (data) productIds.push(data.id);
              }

              if (productIds.length === 3) {
                // Insert box combination
                const { error: comboError } = await supabaseClient
                  .from('box_combinations')
                  .insert({
                    tier_id: tierData.id,
                    item1_id: productIds[0],
                    item2_id: productIds[1],
                    item3_id: productIds[2],
                    total_user_price: parseFloat(row['Items User Total']?.toString().replace(/[$,]/g, '') || '0'),
                    total_retail_price: parseFloat(row['Retail Total']?.toString().replace(/[$,]/g, '') || '0'),
                    packed_height: parseFloat(row['Packed Height (in)'] || '0'),
                    secondary_types: row['Secondary Types'],
                    box_ship_cost: parseFloat(row['Box+Ship']?.toString().replace(/[$,]/g, '') || '0'),
                  });

                if (comboError) {
                  console.error(`Error inserting combination for row ${rowNum}:`, comboError);
                  errors.push(`Row ${rowNum}: ${comboError.message}`);
                  errorCount++;
                } else {
                  successCount++;
                }
              } else {
                errors.push(`Row ${rowNum}: Missing product data`);
                errorCount++;
              }
            } catch (rowError) {
              console.error(`Error processing row ${rowNum}:`, rowError);
              errors.push(`Row ${rowNum}: ${rowError instanceof Error ? rowError.message : 'Unknown error'}`);
              errorCount++;
            }
          })
        );

        // Log progress every batch
        if (batchEnd % 50 === 0 || batchEnd === jsonData.length) {
          console.log(`Processed ${batchEnd}/${jsonData.length} rows`);
        }
      }

      console.log(`Processing complete. Success: ${successCount}, Errors: ${errorCount}`);
    };

    // Start background processing (don't await)
    processData().catch(err => console.error('Background processing error:', err));

    // Return immediate response
    return new Response(
      JSON.stringify({
        success: true,
        message: `Processing ${jsonData.length} rows in background. Check logs for progress.`,
        totalRows: jsonData.length,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in upload-products function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
