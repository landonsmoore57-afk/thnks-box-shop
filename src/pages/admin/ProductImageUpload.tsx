import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Upload, FileImage, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AdminProductImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.toLowerCase().endsWith('.zip')) {
        toast.error('Please select a ZIP file');
        return;
      }
      setFile(selectedFile);
    }
  };

  const processZipFile = async () => {
    if (!file) {
      toast.error('Please select a ZIP file');
      return;
    }

    setUploading(true);
    console.log('Uploading ZIP file:', file.name);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data, error } = await supabase.functions.invoke('upload-product-images', {
        body: formData,
      });

      if (error) {
        console.error('Error uploading ZIP:', error);
        toast.error('Failed to process ZIP file');
        return;
      }

      console.log('Upload result:', data);

      if (data.success) {
        toast.success(
          `Processing complete! ${data.successCount} images uploaded successfully.${
            data.errorCount > 0 ? ` ${data.errorCount} failed.` : ''
          }`
        );
        
        if (data.errors && data.errors.length > 0) {
          console.error('Upload errors:', data.errors);
        }

        setFile(null);
      } else {
        toast.error(data.error || 'Failed to process ZIP file');
      }
    } catch (error) {
      console.error('Error processing ZIP:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/dashboard')}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold">Upload Product Images</h1>
            <p className="text-muted-foreground mt-2">
              Upload a ZIP file containing product images
            </p>
          </div>

          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Instructions:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Prepare a ZIP file containing your product images</li>
                <li>Name each image file with the exact product model number (e.g., "ABC123.jpg")</li>
                <li>Supported formats: JPG, PNG, WebP, GIF</li>
                <li>Images will be matched to products by model number</li>
                <li>Existing images will be replaced if uploading again</li>
              </ul>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileImage className="h-5 w-5" />
                ZIP File Upload
              </CardTitle>
              <CardDescription>
                Select a ZIP file containing product images named by model number
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  type="file"
                  accept=".zip"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="cursor-pointer"
                />
                {file && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <Button
                onClick={processZipFile}
                disabled={!file || uploading}
                className="w-full"
                size="lg"
              >
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? 'Processing...' : 'Upload & Process'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminProductImageUpload;
