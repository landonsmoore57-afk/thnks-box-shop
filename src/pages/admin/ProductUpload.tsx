import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';

const AdminProductUpload = () => {
  const [file, setFile] = useState<File | null>(null);
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
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Process each row
      for (const row of jsonData as any[]) {
        // Extract product data from columns
        const mainProduct = {
          brand: row['Main BRAND'],
          model: row['Main MODEL'],
          product_name: row['Main PRODUCT NAME'],
          user_price: parseFloat(row['Main User$']?.toString().replace('$', '') || '0'),
          retail_price: parseFloat(row['Main Retail$']?.toString().replace('$', '') || '0'),
        };

        const sec1Product = {
          brand: row['Sec1 BRAND'],
          model: row['Sec1 MODEL'],
          product_name: row['Sec1 PRODUCT NAME'],
          user_price: parseFloat(row['Sec1 User$']?.toString().replace('$', '') || '0'),
          retail_price: parseFloat(row['Sec1 Retail$']?.toString().replace('$', '') || '0'),
        };

        const sec2Product = {
          brand: row['Sec2 BRAND'],
          model: row['Sec2 MODEL'],
          product_name: row['Sec2 PRODUCT NAME'],
          user_price: parseFloat(row['Sec2 User$']?.toString().replace('$', '') || '0'),
          retail_price: parseFloat(row['Sec2 Retail$']?.toString().replace('$', '') || '0'),
        };

        // Upsert products
        const products = [mainProduct, sec1Product, sec2Product];
        for (const product of products) {
          if (product.model && product.product_name) {
            await supabase
              .from('products')
              .upsert({
                brand: product.brand,
                model: product.model,
                product_name: product.product_name,
                user_price: product.user_price,
                retail_price: product.retail_price,
              }, {
                onConflict: 'model'
              });
          }
        }

        // Get product IDs
        const { data: item1Data } = await supabase
          .from('products')
          .select('id')
          .eq('model', mainProduct.model)
          .single();

        const { data: item2Data } = await supabase
          .from('products')
          .select('id')
          .eq('model', sec1Product.model)
          .single();

        const { data: item3Data } = await supabase
          .from('products')
          .select('id')
          .eq('model', sec2Product.model)
          .single();

        // Determine tier based on retail total or price
        const retailTotal = parseFloat(row['Retail Total']?.toString().replace('$', '') || '0');
        let tierName = 'Standard'; // Default
        if (retailTotal >= 350) {
          tierName = 'Elite';
        } else if (retailTotal < 250) {
          tierName = 'Basic';
        }

        const { data: tierData } = await supabase
          .from('box_tiers')
          .select('id')
          .eq('tier_name', tierName)
          .single();

        if (item1Data && item2Data && item3Data && tierData) {
          // Insert box combination
          await supabase
            .from('box_combinations')
            .insert({
              tier_id: tierData.id,
              item1_id: item1Data.id,
              item2_id: item2Data.id,
              item3_id: item3Data.id,
              total_user_price: parseFloat(row['Items User Total']?.toString().replace('$', '') || '0'),
              total_retail_price: retailTotal,
              packed_height: parseFloat(row['Packed Height (in)'] || '0'),
              secondary_types: row['Secondary Types'],
              box_ship_cost: parseFloat(row['Box+Ship']?.toString().replace('$', '') || '0'),
            });
        }
      }

      toast({
        title: "Success",
        description: `Uploaded ${jsonData.length} box combinations`,
      });
    } catch (error) {
      console.error('Error processing spreadsheet:', error);
      toast({
        title: "Error",
        description: "Failed to process spreadsheet. Please check the format.",
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
