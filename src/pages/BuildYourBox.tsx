import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Check, Package, Plus, Minus } from "lucide-react";
import { type BoxItem } from "@/data/boxCombinations";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import buildBoxHero from "@/assets/build-box-hero.jpg";

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
  const [quantity, setQuantity] = useState(1);

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

  const handleTierChange = (tier: "Basic" | "Standard" | "Elite") => {
    setSelectedTier(tier);
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
    
    const customBoxItems = [
      {
        brand: item1.brand,
        productName: item1.productName,
        image: item1.image,
        color: item1Color || undefined,
      },
      {
        brand: item2.brand,
        productName: item2.productName,
        image: item2.image,
        color: item2Color || undefined,
      },
      {
        brand: item3.brand,
        productName: item3.productName,
        image: item3.image,
        color: item3Color || undefined,
      },
    ];
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `byob-${selectedTier.toLowerCase()}-${Date.now()}-${i}`,
        slug: "build-your-own-box",
        name: `Custom ${selectedTier} Box`,
        image: buildBoxHero,
        tier: selectedTier,
        unitPrice: tierPrice,
        customBoxItems,
      });
    }

    toast.success(`Added ${quantity} custom box${quantity > 1 ? 'es' : ''} to cart`);
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
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Build Your Own Box</span>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Image */}
            <div>
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                <img 
                  src={buildBoxHero} 
                  alt="Build Your Own Box"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">Custom Box</Badge>
                <h1 className="font-serif text-4xl font-bold mb-2">Build Your Own Box</h1>
                <p className="text-muted-foreground">Create a custom gift box with your choice of premium items</p>
              </div>

              <div className="text-3xl font-bold text-brand-gold">${tierPrice}.00</div>

              {/* Tier Selection */}
              <div className="space-y-3">
                <div className="font-semibold">Select Quality Tier</div>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={selectedTier === "Basic" ? "default" : "outline"}
                    onClick={() => handleTierChange("Basic")}
                    className="h-auto py-3"
                  >
                    Basic
                  </Button>
                  <Button
                    variant={selectedTier === "Standard" ? "default" : "outline"}
                    onClick={() => handleTierChange("Standard")}
                    className="h-auto py-3"
                  >
                    Standard
                  </Button>
                  <Button
                    variant={selectedTier === "Elite" ? "default" : "outline"}
                    onClick={() => handleTierChange("Elite")}
                    className="h-auto py-3"
                  >
                    Elite
                  </Button>
                </div>
              </div>

              {/* Tier Info Card */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{selectedTier} Tier</span>
                    <span className="text-brand-gold font-bold">${tierPrice}.00</span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      <span>Choose 3 premium items</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      <span>Retail value: ${totalRetailPrice > 0 ? totalRetailPrice.toFixed(2) : '---'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      <span>Custom gift packaging included</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Item Selections */}
              <div className="space-y-4">
                <div className="font-semibold">Build Your Box:</div>
                
                {/* Item 1 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>1. First Item</span>
                    {item1 && <Check className="h-4 w-4 text-accent" />}
                  </div>
                  {!item1 ? (
                    <Button onClick={handleChooseItem1} variant="outline" className="w-full" disabled={loading}>
                      {loading ? 'Loading...' : 'Choose First Item'}
                    </Button>
                  ) : (
                    <Card className="cursor-pointer hover:border-accent" onClick={handleChooseItem1}>
                      <CardContent className="p-3 flex gap-3 items-center">
                        {item1.image ? (
                          <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                            <img src={item1.image} alt={item1.productName} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center flex-shrink-0">
                            <Package className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item1.productName}</p>
                          <p className="text-xs text-muted-foreground">{item1.brand}</p>
                          {item1Color && <Badge variant="secondary" className="mt-1 text-xs">{item1Color}</Badge>}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Item 2 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>2. Second Item</span>
                    {item2 && <Check className="h-4 w-4 text-accent" />}
                  </div>
                  {!item2 ? (
                    <Button 
                      onClick={handleChooseItem2} 
                      variant="outline" 
                      className="w-full"
                      disabled={!item1 || (item1.colors !== undefined && !item1Color) || loading}
                    >
                      Choose Second Item
                    </Button>
                  ) : (
                    <Card className="cursor-pointer hover:border-accent" onClick={handleChooseItem2}>
                      <CardContent className="p-3 flex gap-3 items-center">
                        {item2.image ? (
                          <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                            <img src={item2.image} alt={item2.productName} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center flex-shrink-0">
                            <Package className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item2.productName}</p>
                          <p className="text-xs text-muted-foreground">{item2.brand}</p>
                          {item2Color && <Badge variant="secondary" className="mt-1 text-xs">{item2Color}</Badge>}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Item 3 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>3. Third Item</span>
                    {item3 && <Check className="h-4 w-4 text-accent" />}
                  </div>
                  {!item3 ? (
                    <Button 
                      onClick={handleChooseItem3} 
                      variant="outline" 
                      className="w-full"
                      disabled={!item2 || (item2.colors !== undefined && !item2Color) || loading}
                    >
                      Choose Third Item
                    </Button>
                  ) : (
                    <Card className="cursor-pointer hover:border-accent" onClick={handleChooseItem3}>
                      <CardContent className="p-3 flex gap-3 items-center">
                        {item3.image ? (
                          <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                            <img src={item3.image} alt={item3.productName} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center flex-shrink-0">
                            <Package className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item3.productName}</p>
                          <p className="text-xs text-muted-foreground">{item3.brand}</p>
                          {item3Color && <Badge variant="secondary" className="mt-1 text-xs">{item3Color}</Badge>}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <div className="font-semibold text-sm">Quantity</div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button 
                size="lg" 
                className="w-full" 
                onClick={handleAddToCart}
                disabled={!isComplete}
              >
                Add to Cart
              </Button>

              {/* Description */}
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  Create your perfect gift box by selecting three premium items from our curated collection. 
                  Each box is carefully packaged and ready to delight.
                </p>
                <p className="font-medium">
                  Your custom box includes premium packaging, gift card option, and free shipping on orders over $100.
                </p>
              </div>
            </div>
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
