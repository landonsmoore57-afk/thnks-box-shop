import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { decompress } from 'https://deno.land/x/zip@v1.2.5/mod.ts';

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

    // Read ZIP file
    const zipArrayBuffer = await zipFile.arrayBuffer();
    const zipBytes = new Uint8Array(zipArrayBuffer);
    
    // Create temp directory for extraction
    const tempDir = await Deno.makeTempDir();
    const zipPath = `${tempDir}/upload.zip`;
    
    // Write ZIP to temp file
    await Deno.writeFile(zipPath, zipBytes);
    
    // Extract ZIP
    const extractDir = `${tempDir}/extracted`;
    await decompress(zipPath, extractDir);

    // Read all files from extracted directory
    const files: { name: string; data: Uint8Array; contentType: string }[] = [];
    
    for await (const entry of Deno.readDir(extractDir)) {
      if (entry.isFile) {
        const filePath = `${extractDir}/${entry.name}`;
        const data = await Deno.readFile(filePath);
        
        // Get file extension and content type
        const ext = entry.name.split('.').pop()?.toLowerCase();
        let contentType = 'image/jpeg';
        if (ext === 'png') contentType = 'image/png';
        else if (ext === 'webp') contentType = 'image/webp';
        else if (ext === 'gif') contentType = 'image/gif';
        
        // Extract model number from filename (remove extension)
        const modelNumber = entry.name.replace(/\.[^/.]+$/, '');
        
        files.push({
          name: modelNumber,
          data,
          contentType
        });
      }
    }

    console.log(`Found ${files.length} image files in ZIP`);

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    // Process each image
    for (const file of files) {
      try {
        // Find product by model number
        const { data: product, error: productError } = await supabaseClient
          .from('products')
          .select('id, model')
          .eq('model', file.name)
          .maybeSingle();

        if (productError) {
          console.error(`Error finding product ${file.name}:`, productError);
          errors.push(`${file.name}: Database error`);
          errorCount++;
          continue;
        }

        if (!product) {
          console.log(`Product not found for model: ${file.name}`);
          errors.push(`${file.name}: Product not found`);
          errorCount++;
          continue;
        }

        // Upload image to storage
        const fileName = `${product.model}.${file.contentType.split('/')[1]}`;
        const { error: uploadError } = await supabaseClient
          .storage
          .from('product-images')
          .upload(fileName, file.data, {
            contentType: file.contentType,
            upsert: true
          });

        if (uploadError) {
          console.error(`Error uploading image for ${file.name}:`, uploadError);
          errors.push(`${file.name}: Upload failed`);
          errorCount++;
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabaseClient
          .storage
          .from('product-images')
          .getPublicUrl(fileName);

        // Update product with image URL
        const { error: updateError } = await supabaseClient
          .from('products')
          .update({ image_url: publicUrl })
          .eq('id', product.id);

        if (updateError) {
          console.error(`Error updating product ${file.name}:`, updateError);
          errors.push(`${file.name}: Failed to update product`);
          errorCount++;
          continue;
        }

        successCount++;
        console.log(`Successfully processed image for model: ${file.name}`);
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
        errors.push(`${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        errorCount++;
      }
    }

    // Cleanup temp directory
    await Deno.remove(tempDir, { recursive: true });

    console.log(`Processing complete. Success: ${successCount}, Errors: ${errorCount}`);

    return new Response(
      JSON.stringify({
        success: true,
        successCount,
        errorCount,
        totalFiles: files.length,
        errors: errors.slice(0, 20), // Return first 20 errors
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
