import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { EmptyState } from "@/components/EmptyState";

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  const shipping = subtotal > 0 ? 12.00 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="font-serif text-4xl font-bold mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <EmptyState
              icon={ShoppingBag}
              title="Your cart is empty"
              description="Add some products to get started"
              action={{
                label: "Continue Shopping",
                onClick: () => navigate("/shop"),
              }}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={`${item.id}-${item.tier}`} className="p-6">
                    <div className="flex gap-6">
                      <div className="w-24 h-24 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.tier} Tier</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeItem(item.id, item.tier)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {/* Custom Box Items */}
                        {item.customBoxItems && item.customBoxItems.length > 0 && (
                          <div className="my-4 p-3 bg-muted/50 rounded-lg border-l-2 border-accent/30">
                            <p className="text-xs font-medium text-muted-foreground mb-3">Includes:</p>
                            <div className="space-y-2.5">
                              {item.customBoxItems.map((boxItem, idx) => (
                                <div key={idx} className="flex gap-2 items-start">
                                  {boxItem.image && (
                                    <div className="w-12 h-12 rounded bg-background flex-shrink-0 overflow-hidden">
                                      <img src={boxItem.image} alt={boxItem.productName} className="w-full h-full object-contain" />
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium leading-tight">{boxItem.productName}</p>
                                    <p className="text-xs text-muted-foreground">{boxItem.brand}</p>
                                    {boxItem.color && (
                                      <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-background rounded border">{boxItem.color}</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-border rounded-lg">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.tier, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.tier, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="font-bold">${(item.unitPrice * item.quantity).toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div>
                <Card className="p-6 sticky top-24">
                  <h2 className="font-serif text-2xl font-bold mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-xl text-accent">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button size="lg" className="w-full" onClick={() => navigate("/checkout")}>
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" className="w-full mt-3" onClick={() => navigate("/shop")}>
                    Continue Shopping
                  </Button>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
