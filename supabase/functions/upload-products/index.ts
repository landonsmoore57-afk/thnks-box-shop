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


    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];
    const BATCH_SIZE = 50; // Process 50 rows at a time

    console.log('Starting product and combination processing...');

    // Process in batches
    for (let batchStart = 0; batchStart < jsonData.length; batchStart += BATCH_SIZE) {
      const batchEnd = Math.min(batchStart + BATCH_SIZE, jsonData.length);
      const batch = jsonData.slice(batchStart, batchEnd);

      // Collect all products and combinations for batch insert
      const productsToUpsert: any[] = [];
      const combinationsToInsert: any[] = [];

      for (let i = 0; i < batch.length; i++) {
        const row = batch[i] as any;
        const rowNum = batchStart + i + 1;

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

          // Add valid products to batch
          for (const product of products) {
            if (product.model && product.product_name) {
              productsToUpsert.push(product);
            }
          }

          // Store row data for later combination creation
          (row as any)._rowNum = rowNum;
        } catch (rowError) {
          console.error(`Error preparing row ${rowNum}:`, rowError);
          errors.push(`Row ${rowNum}: ${rowError instanceof Error ? rowError.message : 'Unknown error'}`);
          errorCount++;
        }
      }

      // Batch upsert all products
      if (productsToUpsert.length > 0) {
        const { error: upsertError } = await supabaseClient
          .from('products')
          .upsert(productsToUpsert, {
            onConflict: 'model',
            ignoreDuplicates: false
          });

        if (upsertError) {
          console.error('Batch upsert error:', upsertError);
        }
      }

      // Now get product IDs and create combinations
      for (let i = 0; i < batch.length; i++) {
        const row = batch[i] as any;
        const rowNum = batchStart + i + 1;

        try {
          const productModels = [
            row['Main MODEL'],
            row['Sec1 MODEL'],
            row['Sec2 MODEL']
          ].filter(Boolean);

          if (productModels.length !== 3) {
            errors.push(`Row ${rowNum}: Missing product models`);
            errorCount++;
            continue;
          }

          // Fetch product IDs
          const { data: productData, error: fetchError } = await supabaseClient
            .from('products')
            .select('id, model')
            .in('model', productModels);

          if (fetchError || !productData || productData.length !== 3) {
            errors.push(`Row ${rowNum}: Could not find all products`);
            errorCount++;
            continue;
          }

          // Map products by model
          const productMap = new Map(productData.map(p => [p.model, p.id]));

          combinationsToInsert.push({
            tier_id: tierData.id,
            item1_id: productMap.get(productModels[0]),
            item2_id: productMap.get(productModels[1]),
            item3_id: productMap.get(productModels[2]),
            total_user_price: parseFloat(row['Items User Total']?.toString().replace(/[$,]/g, '') || '0'),
            total_retail_price: parseFloat(row['Retail Total']?.toString().replace(/[$,]/g, '') || '0'),
            packed_height: parseFloat(row['Packed Height (in)'] || '0'),
            secondary_types: row['Secondary Types'],
            box_ship_cost: parseFloat(row['Box+Ship']?.toString().replace(/[$,]/g, '') || '0'),
          });

          successCount++;
        } catch (rowError) {
          console.error(`Error processing row ${rowNum}:`, rowError);
          errors.push(`Row ${rowNum}: ${rowError instanceof Error ? rowError.message : 'Unknown error'}`);
          errorCount++;
        }
      }

      // Batch insert combinations
      if (combinationsToInsert.length > 0) {
        const { error: comboError } = await supabaseClient
          .from('box_combinations')
          .insert(combinationsToInsert);

        if (comboError) {
          console.error('Batch insert combinations error:', comboError);
          errorCount += combinationsToInsert.length;
          successCount -= combinationsToInsert.length;
        }
      }

      // Log progress
      console.log(`Processed ${batchEnd}/${jsonData.length} rows (Success: ${successCount}, Errors: ${errorCount})`);
    }

    console.log(`Processing complete. Success: ${successCount}, Errors: ${errorCount}`);

    return new Response(
      JSON.stringify({
        success: true,
        successCount,
        errorCount,
        totalRows: jsonData.length,
        errors: errors.slice(0, 20),
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
