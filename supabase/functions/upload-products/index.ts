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

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    // Process each row
    for (let i = 0; i < jsonData.length; i++) {
      try {
        const row = jsonData[i] as any;

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

        // Upsert each product
        for (const product of products) {
          if (!product.model || !product.product_name) continue;

          const { data: existingProduct } = await supabaseClient
            .from('products')
            .select('id')
            .eq('model', product.model)
            .maybeSingle();

          if (existingProduct) {
            productIds.push(existingProduct.id);
          } else {
            const { data: newProduct, error } = await supabaseClient
              .from('products')
              .insert({
                brand: product.brand,
                model: product.model,
                product_name: product.product_name,
                user_price: product.user_price,
                retail_price: product.retail_price,
              })
              .select('id')
              .single();

            if (error) {
              console.error(`Error inserting product ${product.model}:`, error);
              continue;
            }
            if (newProduct) productIds.push(newProduct.id);
          }
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
            console.error(`Error inserting combination for row ${i + 1}:`, comboError);
            errors.push(`Row ${i + 1}: ${comboError.message}`);
            errorCount++;
          } else {
            successCount++;
          }
        } else {
          errors.push(`Row ${i + 1}: Missing product data`);
          errorCount++;
        }

        // Log progress every 50 rows
        if ((i + 1) % 50 === 0) {
          console.log(`Processed ${i + 1}/${jsonData.length} rows`);
        }
      } catch (rowError) {
        console.error(`Error processing row ${i + 1}:`, rowError);
        errors.push(`Row ${i + 1}: ${rowError instanceof Error ? rowError.message : 'Unknown error'}`);
        errorCount++;
      }
    }

    console.log(`Processing complete. Success: ${successCount}, Errors: ${errorCount}`);

    return new Response(
      JSON.stringify({
        success: true,
        successCount,
        errorCount,
        totalRows: jsonData.length,
        errors: errors.slice(0, 10), // Return first 10 errors
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
