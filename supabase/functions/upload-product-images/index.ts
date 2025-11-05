import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import JSZip from 'https://esm.sh/jszip@3.10.1';

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
    const zipFile = formData.get('file') as File;

    if (!zipFile) {
      throw new Error('No ZIP file provided');
    }

    console.log(`Processing ZIP file: ${zipFile.name}`);

    // Read ZIP file into memory
    const zipArrayBuffer = await zipFile.arrayBuffer();
    
    // Load ZIP with JSZip
    const zip = await JSZip.loadAsync(zipArrayBuffer);
    
    console.log('ZIP file loaded, extracting images...');

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    // Process each file in the ZIP
    const filePromises: Promise<void>[] = [];
    
    zip.forEach((relativePath, file) => {
      // Skip directories and hidden files
      if (file.dir || relativePath.startsWith('__MACOSX') || relativePath.startsWith('.')) {
        return;
      }

      // Check if it's an image file
      const ext = relativePath.split('.').pop()?.toLowerCase();
      if (!['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext || '')) {
        return;
      }

      // Extract model number from filename (remove path and extension)
      const fileName = relativePath.split('/').pop() || '';
      const modelNumber = fileName.replace(/\.[^/.]+$/, '');

      console.log(`Processing: ${fileName} -> Model: ${modelNumber}`);

      const processPromise = (async () => {
        try {
          // Get file data as Uint8Array
          const fileData = await file.async('uint8array');
          
          // Determine content type
          let contentType = 'image/jpeg';
          if (ext === 'png') contentType = 'image/png';
          else if (ext === 'webp') contentType = 'image/webp';
          else if (ext === 'gif') contentType = 'image/gif';

          // Find product by model number
          const { data: product, error: productError } = await supabaseClient
            .from('products')
            .select('id, model')
            .eq('model', modelNumber)
            .maybeSingle();

          if (productError) {
            console.error(`Error finding product ${modelNumber}:`, productError);
            errors.push(`${modelNumber}: Database error`);
            errorCount++;
            return;
          }

          if (!product) {
            console.log(`Product not found for model: ${modelNumber}`);
            errors.push(`${modelNumber}: Product not found`);
            errorCount++;
            return;
          }

          // Upload image to storage
          const storageFileName = `${product.model}.${ext}`;
          const { error: uploadError } = await supabaseClient
            .storage
            .from('product-images')
            .upload(storageFileName, fileData, {
              contentType,
              upsert: true
            });

          if (uploadError) {
            console.error(`Error uploading image for ${modelNumber}:`, uploadError);
            errors.push(`${modelNumber}: Upload failed - ${uploadError.message}`);
            errorCount++;
            return;
          }

          // Get public URL
          const { data: { publicUrl } } = supabaseClient
            .storage
            .from('product-images')
            .getPublicUrl(storageFileName);

          // Update product with image URL
          const { error: updateError } = await supabaseClient
            .from('products')
            .update({ image_url: publicUrl })
            .eq('id', product.id);

          if (updateError) {
            console.error(`Error updating product ${modelNumber}:`, updateError);
            errors.push(`${modelNumber}: Failed to update product`);
            errorCount++;
            return;
          }

          successCount++;
          console.log(`Successfully processed: ${modelNumber}`);
        } catch (error) {
          console.error(`Error processing ${modelNumber}:`, error);
          errors.push(`${modelNumber}: ${error instanceof Error ? error.message : 'Unknown error'}`);
          errorCount++;
        }
      })();

      filePromises.push(processPromise);
    });

    // Wait for all files to be processed
    await Promise.all(filePromises);

    console.log(`Processing complete. Success: ${successCount}, Errors: ${errorCount}`);

    return new Response(
      JSON.stringify({
        success: true,
        successCount,
        errorCount,
        totalFiles: successCount + errorCount,
        errors: errors.slice(0, 20),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in upload-product-images function:', error);
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
