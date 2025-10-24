import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.slug === slug);

  const [selectedTier, setSelectedTier] = useState<"Basic" | "Standard" | "Elite">("Standard");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">Sorry, we couldn't find the product you're looking for.</p>
            <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const selectedVariant = product.variants.find(v => v.tier === selectedTier)!;
  const price = (selectedVariant.priceStandard / 100).toFixed(2);

  const handleAddToCart = () => {
    toast.success("Added to cart!", {
      description: `${quantity}x ${product.name} (${selectedTier})`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-muted-foreground">
            <a href="/shop" className="hover:text-accent">Shop</a>
            <span className="mx-2">/</span>
            <a href={`/shop?category=${product.category}`} className="hover:text-accent">{product.category}</a>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted border-2 border-transparent hover:border-accent cursor-pointer transition-all">
                    <img 
                      src={product.image} 
                      alt={`${product.name} view ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <Badge variant="outline" className="mb-4">{product.category}</Badge>
              <h1 className="font-serif text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-xl text-muted-foreground mb-6">{product.subtitle}</p>
              
              <div className="mb-8">
                <div className="text-4xl font-bold text-accent mb-2">${price}</div>
                <p className="text-sm text-muted-foreground">
                  {selectedVariant.inventory > 0 ? `${selectedVariant.inventory} in stock` : "Out of stock"}
                </p>
              </div>

              {/* Tier Selector */}
              <div className="mb-8">
                <label className="text-sm font-semibold mb-3 block">Select Quality Tier</label>
                <Tabs value={selectedTier} onValueChange={(value) => setSelectedTier(value as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="Basic">Basic</TabsTrigger>
                    <TabsTrigger value="Standard">Standard</TabsTrigger>
                    <TabsTrigger value="Elite">Elite</TabsTrigger>
                  </TabsList>
                  
                  {product.variants.map(variant => (
                    <TabsContent key={variant.tier} value={variant.tier} className="mt-6">
                      <Card className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg mb-1">{variant.tier} Tier</h3>
                            <p className="text-sm text-muted-foreground">SKU: {variant.sku}</p>
                          </div>
                          <div className="text-2xl font-bold text-accent">
                            ${(variant.priceStandard / 100).toFixed(2)}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="font-semibold text-sm">What's Included:</p>
                          <ul className="space-y-2">
                            {variant.specs.map((spec, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-semibold">Quantity</label>
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-6 font-semibold">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= selectedVariant.inventory}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={selectedVariant.inventory === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              {/* Description */}
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
