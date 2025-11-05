import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminProductUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [tierPrice, setTierPrice] = useState<string>("200");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const processSpreadsheet = async () => {
    if (!file) return;

    setUploading(true);
    try {
      console.log(`Uploading ${file.name} for $${tierPrice} tier...`);

      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tierPrice', tierPrice);

      // Call edge function
      const { data, error } = await supabase.functions.invoke('upload-products', {
        body: formData,
      });

      if (error) throw error;

      console.log('Upload response:', data);

      if (data.success) {
        toast({
          title: "Upload Complete",
          description: `Successfully processed ${data.successCount} of ${data.totalRows} combinations. ${data.errorCount} errors.`,
        });

        if (data.errors && data.errors.length > 0) {
          console.error('Upload errors:', data.errors);
        }
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading spreadsheet:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload spreadsheet",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Product Upload</h1>
            <p className="text-muted-foreground">Upload box combinations via spreadsheet</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Upload Excel spreadsheets (.xlsx, .xlsm) with box combination data. 
                The spreadsheet should include Main, Sec1, and Sec2 product information.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5" />
                  Upload Spreadsheet
                </CardTitle>
                <CardDescription>
                  Select an Excel file containing product and box combination data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tier">Box Tier</Label>
                  <Select value={tierPrice} onValueChange={setTierPrice} disabled={uploading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">$100 Box (Basic)</SelectItem>
                      <SelectItem value="200">$200 Box (Standard)</SelectItem>
                      <SelectItem value="300">$300 Box (Elite)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Select which box tier this spreadsheet data is for
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Excel File</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".xlsx,.xlsm,.xls"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                </div>

                {file && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Selected file:</p>
                    <p className="text-sm text-muted-foreground">{file.name}</p>
                  </div>
                )}

                <Button
                  onClick={processSpreadsheet}
                  disabled={!file || uploading}
                  className="w-full"
                  size="lg"
                >
                  {uploading ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload & Process
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminProductUpload;
