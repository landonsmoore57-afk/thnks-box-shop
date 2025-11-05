import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Check, Package } from "lucide-react";
import { type BoxItem } from "@/data/boxCombinations";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type SelectionStep = "item1" | "item2" | "item3" | "color1" | "color2" | "color3" | null;

const BuildYourBox = () => {
  const [selectedTier, setSelectedTier] = useState<"Basic" | "Standard" | "Elite">("Standard");
  const [item1, setItem1] = useState<BoxItem | null>(null);
  const [item2, setItem2] = useState<BoxItem | null>(null);
  const [item3, setItem3] = useState<BoxItem | null>(null);
  const [item1Color, setItem1Color] = useState<string | null>(null);
  const [item2Color, setItem2Color] = useState<string | null>(null);
  const [item3Color, setItem3Color] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<SelectionStep>(null);
  const [availableItems, setAvailableItems] = useState<BoxItem[]>([]);
  const [allCombinations, setAllCombinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { addItem } = useCart();
  const navigate = useNavigate();

  // Fetch box combinations from database
  useEffect(() => {
    const fetchCombinations = async () => {
      try {
        const tierMap: Record<string, string> = {
          'Basic': 'basic',
          'Standard': 'standard',
          'Elite': 'elite'
        };

        const { data: tierData } = await supabase
          .from('box_tiers')
          .select('id')
          .eq('tier_name', tierMap[selectedTier])
          .single();

        if (!tierData) return;

        const { data: combinations, error } = await supabase
          .from('box_combinations')
          .select(`
            *,
            item1:products!box_combinations_item1_id_fkey(id, brand, model, product_name, user_price, retail_price, image_url),
            item2:products!box_combinations_item2_id_fkey(id, brand, model, product_name, user_price, retail_price, image_url),
            item3:products!box_combinations_item3_id_fkey(id, brand, model, product_name, user_price, retail_price, image_url)
          `)
          .eq('tier_id', tierData.id);

        if (error) {
          console.error('Error fetching combinations:', error);
          toast.error('Failed to load products');
          return;
        }

        setAllCombinations(combinations || []);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchCombinations();
  }, [selectedTier]);

  const handleTierChange = (tier: string) => {
    setSelectedTier(tier as "Basic" | "Standard" | "Elite");
    setItem1(null);
    setItem2(null);
    setItem3(null);
    setItem1Color(null);
    setItem2Color(null);
    setItem3Color(null);
    setCurrentStep(null);
    setLoading(true);
  };

  const handleChooseItem1 = () => {
    // Get unique item1 options from database
    const uniqueItem1s = new Map<string, BoxItem>();
    allCombinations.forEach(combo => {
      if (combo.item1 && !uniqueItem1s.has(combo.item1.model)) {
        uniqueItem1s.set(combo.item1.model, {
          brand: combo.item1.brand,
          model: combo.item1.model,
          productName: combo.item1.product_name,
          userPrice: combo.item1.user_price,
          retailPrice: combo.item1.retail_price,
          image: combo.item1.image_url
        });
      }
    });
    setAvailableItems(Array.from(uniqueItem1s.values()));
    setCurrentStep("item1");
  };

  const handleSelectItem1 = (item: BoxItem) => {
    if (item.colors && item.colors.length > 0) {
      setItem1(item);
      setCurrentStep("color1");
    } else {
      setItem1(item);
      setItem1Color(null);
      setCurrentStep(null);
    }
  };

  const handleSelectItem1Color = (color: string) => {
    setItem1Color(color);
    setCurrentStep(null);
  };

  const handleChooseItem2 = () => {
    if (!item1) return;
    // Get valid item2 options based on selected item1
    const validItem2s = new Map<string, BoxItem>();
    allCombinations
      .filter(combo => combo.item1?.model === item1.model)
      .forEach(combo => {
        if (combo.item2 && !validItem2s.has(combo.item2.model)) {
          validItem2s.set(combo.item2.model, {
            brand: combo.item2.brand,
            model: combo.item2.model,
            productName: combo.item2.product_name,
            userPrice: combo.item2.user_price,
            retailPrice: combo.item2.retail_price,
            image: combo.item2.image_url
          });
        }
      });
    setAvailableItems(Array.from(validItem2s.values()));
    setCurrentStep("item2");
  };

  const handleSelectItem2 = (item: BoxItem) => {
    if (item.colors && item.colors.length > 0) {
      setItem2(item);
      setCurrentStep("color2");
    } else {
      setItem2(item);
      setItem2Color(null);
      setCurrentStep(null);
    }
  };

  const handleSelectItem2Color = (color: string) => {
    setItem2Color(color);
    setCurrentStep(null);
  };

  const handleChooseItem3 = () => {
    if (!item1 || !item2) return;
    // Get valid item3 options based on selected item1 and item2
    const validItem3s = new Map<string, BoxItem>();
    allCombinations
      .filter(combo => combo.item1?.model === item1.model && combo.item2?.model === item2.model)
      .forEach(combo => {
        if (combo.item3 && !validItem3s.has(combo.item3.model)) {
          validItem3s.set(combo.item3.model, {
            brand: combo.item3.brand,
            model: combo.item3.model,
            productName: combo.item3.product_name,
            userPrice: combo.item3.user_price,
            retailPrice: combo.item3.retail_price,
            image: combo.item3.image_url
          });
        }
      });
    setAvailableItems(Array.from(validItem3s.values()));
    setCurrentStep("item3");
  };

  const handleSelectItem3 = (item: BoxItem) => {
    if (item.colors && item.colors.length > 0) {
      setItem3(item);
      setCurrentStep("color3");
    } else {
      setItem3(item);
      setItem3Color(null);
      setCurrentStep(null);
    }
  };

  const handleSelectItem3Color = (color: string) => {
    setItem3Color(color);
    setCurrentStep(null);
  };

  const handleAddToCart = () => {
    if (!item1 || !item2 || !item3) return;
    
    const tierPrice = selectedTier === "Basic" ? 100 : selectedTier === "Standard" ? 200 : 300;
    
    addItem({
      id: `byob-${selectedTier.toLowerCase()}`,
      slug: "build-your-own-box",
      name: `Custom ${selectedTier} Box`,
      image: "/placeholder.svg",
      tier: selectedTier,
      unitPrice: tierPrice,
    });

    navigate("/cart");
  };

  const totalRetailPrice = (item1?.retailPrice || 0) + (item2?.retailPrice || 0) + (item3?.retailPrice || 0);
  const tierPrice = selectedTier === "Basic" ? 100 : selectedTier === "Standard" ? 200 : 300;
  const isComplete = item1 && item2 && item3 && 
    (!item1.colors || item1Color) && 
    (!item2.colors || item2Color) && 
    (!item3.colors || item3Color);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl font-bold mb-4">Build Your Own Box</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create a custom gift box tailored to your preferences. Choose your tier and select three premium items.
            </p>
          </div>

          {/* Tier Selection */}
          <div className="max-w-4xl mx-auto mb-12">
            <Tabs value={selectedTier} onValueChange={handleTierChange}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="Basic">Basic - $100</TabsTrigger>
                <TabsTrigger value="Standard">Standard - $200</TabsTrigger>
                <TabsTrigger value="Elite">Elite - $300</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTier}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      {selectedTier} Tier Box
                    </CardTitle>
                    <CardDescription>
                      {selectedTier === "Basic" && "Perfect starter box with quality essentials"}
                      {selectedTier === "Standard" && "Premium selection of curated items"}
                      {selectedTier === "Elite" && "Luxury collection of top-tier products"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Item 1 Selection */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">1. Choose Your First Item</h3>
                        {item1 && <Check className="h-5 w-5 text-accent" />}
                      </div>
                      {!item1 ? (
                        <Button onClick={handleChooseItem1} variant="outline" className="w-full">
                          Choose 1st Item
                        </Button>
                      ) : (
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{item1.productName}</p>
                              <p className="text-sm text-muted-foreground">{item1.brand}</p>
                              {item1Color && <Badge variant="secondary" className="mt-1">{item1Color}</Badge>}
                            </div>
                             <div className="text-right">
                              <p className="text-sm text-muted-foreground line-through">${item1.retailPrice}</p>
                              <Button variant="ghost" size="sm" onClick={handleChooseItem1} className="mt-1">
                                Change
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Item 2 Selection */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">2. Choose Your Second Item</h3>
                        {item2 && <Check className="h-5 w-5 text-accent" />}
                      </div>
                      {!item2 ? (
                        <Button 
                          onClick={handleChooseItem2} 
                          variant="outline" 
                          className="w-full"
                          disabled={!item1 || (item1.colors !== undefined && !item1Color)}
                        >
                          Choose 2nd Item
                        </Button>
                      ) : (
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{item2.productName}</p>
                              <p className="text-sm text-muted-foreground">{item2.brand}</p>
                              {item2Color && <Badge variant="secondary" className="mt-1">{item2Color}</Badge>}
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground line-through">${item2.retailPrice}</p>
                              <Button variant="ghost" size="sm" onClick={handleChooseItem2} className="mt-1">
                                Change
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Item 3 Selection */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">3. Choose Your Third Item</h3>
                        {item3 && <Check className="h-5 w-5 text-accent" />}
                      </div>
                      {!item3 ? (
                        <Button 
                          onClick={handleChooseItem3} 
                          variant="outline" 
                          className="w-full"
                          disabled={!item2 || (item2.colors !== undefined && !item2Color)}
                        >
                          Choose 3rd Item
                        </Button>
                      ) : (
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{item3.productName}</p>
                              <p className="text-sm text-muted-foreground">{item3.brand}</p>
                              {item3Color && <Badge variant="secondary" className="mt-1">{item3Color}</Badge>}
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground line-through">${item3.retailPrice}</p>
                              <Button variant="ghost" size="sm" onClick={handleChooseItem3} className="mt-1">
                                Change
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Total & Add to Cart */}
                    {totalRetailPrice > 0 && (
                      <div className="pt-6 border-t border-border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Retail Value</span>
                          <span className="text-sm text-muted-foreground line-through">${totalRetailPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold">Box Price</span>
                          <span className="text-2xl font-bold text-accent">${tierPrice}</span>
                        </div>
                        <Button 
                          size="lg" 
                          className="w-full" 
                          onClick={handleAddToCart}
                          disabled={!isComplete}
                        >
                          Add Custom Box to Cart
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Item Selection Dialog */}
      <Dialog open={currentStep === "item1" || currentStep === "item2" || currentStep === "item3"} onOpenChange={() => setCurrentStep(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentStep === "item1" && "Choose Your First Item"}
              {currentStep === "item2" && "Choose Your Second Item"}
              {currentStep === "item3" && "Choose Your Third Item"}
            </DialogTitle>
            <DialogDescription>
              Select from the available items for your {selectedTier} box
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {availableItems.map((item, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:border-accent transition-colors"
                onClick={() => {
                  if (currentStep === "item1") handleSelectItem1(item);
                  if (currentStep === "item2") handleSelectItem2(item);
                  if (currentStep === "item3") handleSelectItem3(item);
                }}
              >
                <CardContent className="p-4 flex flex-col h-full">
                  {item.image ? (
                    <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                      <img 
                        src={item.image} 
                        alt={item.productName}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <Package className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <h4 className="font-semibold mb-1 line-clamp-2 min-h-[3rem]">{item.productName}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{item.brand}</p>
                  <div className="text-right mt-auto">
                    <span className="text-sm font-medium text-brand-gold">${item.retailPrice} Retail Value</span>
                  </div>
                  {item.colors && item.colors.length > 0 && (
                    <Badge variant="outline" className="mt-2">
                      {item.colors.length} colors available
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Color Selection Dialog */}
      <Dialog open={currentStep === "color1" || currentStep === "color2" || currentStep === "color3"} onOpenChange={() => setCurrentStep(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose Color</DialogTitle>
            <DialogDescription>
              Select your preferred color for{" "}
              {currentStep === "color1" && item1?.productName}
              {currentStep === "color2" && item2?.productName}
              {currentStep === "color3" && item3?.productName}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {currentStep === "color1" && item1?.colors?.map((color) => (
              <Button
                key={color}
                variant="outline"
                className="h-auto py-4"
                onClick={() => handleSelectItem1Color(color)}
              >
                {color}
              </Button>
            ))}
            {currentStep === "color2" && item2?.colors?.map((color) => (
              <Button
                key={color}
                variant="outline"
                className="h-auto py-4"
                onClick={() => handleSelectItem2Color(color)}
              >
                {color}
              </Button>
            ))}
            {currentStep === "color3" && item3?.colors?.map((color) => (
              <Button
                key={color}
                variant="outline"
                className="h-auto py-4"
                onClick={() => handleSelectItem3Color(color)}
              >
                {color}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default BuildYourBox;
