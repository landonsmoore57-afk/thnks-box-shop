import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  address: z.string().min(5, "Street address is required"),
  address2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "ZIP code is required"),
  giftMessage: z.string().optional(),
  cardNumber: z.string().min(13, "Card number is required"),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, "Format: MM/YY"),
  cvv: z.string().min(3, "CVV is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const shipping = subtotal > 0 ? 12.00 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Order placed!",
      description: "Your order has been successfully placed.",
    });
    
    navigate("/checkout/success");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <h1 className="font-serif text-4xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <Card className="p-6">
                  <h2 className="font-serif text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" {...register("firstName")} />
                        {errors.firstName && (
                          <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" {...register("lastName")} />
                        {errors.lastName && (
                          <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" {...register("email")} />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" {...register("phone")} />
                    </div>
                  </div>
                </Card>

                {/* Shipping Address */}
                <Card className="p-6">
                  <h2 className="font-serif text-2xl font-bold mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" placeholder="Optional" {...register("company")} />
                    </div>
                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Input id="address" {...register("address")} />
                      {errors.address && (
                        <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="address2">Apt, Suite, etc.</Label>
                      <Input id="address2" placeholder="Optional" {...register("address2")} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" {...register("city")} />
                        {errors.city && (
                          <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input id="state" {...register("state")} />
                        {errors.state && (
                          <p className="text-sm text-destructive mt-1">{errors.state.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP Code *</Label>
                        <Input id="zip" {...register("zip")} />
                        {errors.zip && (
                          <p className="text-sm text-destructive mt-1">{errors.zip.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Gift Message */}
                <Card className="p-6">
                  <h2 className="font-serif text-2xl font-bold mb-6">Gift Message</h2>
                  <div>
                    <Label htmlFor="giftMessage">Add a personal message (optional)</Label>
                    <Textarea 
                      id="giftMessage" 
                      placeholder="Your message will be included with the gift..."
                      rows={4}
                      className="mt-2"
                      {...register("giftMessage")}
                    />
                  </div>
                </Card>

                {/* Payment */}
                <Card className="p-6">
                  <h2 className="font-serif text-2xl font-bold mb-6">Payment Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" {...register("cardNumber")} />
                      {errors.cardNumber && (
                        <p className="text-sm text-destructive mt-1">{errors.cardNumber.message}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date *</Label>
                        <Input id="expiry" placeholder="MM/YY" {...register("expiry")} />
                        {errors.expiry && (
                          <p className="text-sm text-destructive mt-1">{errors.expiry.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input id="cvv" placeholder="123" {...register("cvv")} />
                        {errors.cvv && (
                          <p className="text-sm text-destructive mt-1">{errors.cvv.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="p-6 sticky top-24">
                  <h2 className="font-serif text-2xl font-bold mb-6">Order Summary</h2>
                  
                  {items.length > 0 ? (
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={`${item.id}-${item.tier}`} className="space-y-3">
                          <div className="flex gap-3 py-2">
                            <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.tier} × {item.quantity}</p>
                            </div>
                            <div className="text-sm font-medium">
                              ${(item.unitPrice * item.quantity).toFixed(2)}
                            </div>
                          </div>
                          
                          {item.customBoxItems && item.customBoxItems.length > 0 && (
                            <div className="pl-4 border-l-2 border-accent/30 space-y-2">
                              <p className="text-xs font-medium text-muted-foreground mb-2">Includes:</p>
                              {item.customBoxItems.map((boxItem, idx) => (
                                <div key={idx} className="flex gap-2 items-start">
                                  {boxItem.image && (
                                    <div className="w-10 h-10 rounded bg-muted flex-shrink-0 overflow-hidden">
                                      <img src={boxItem.image} alt={boxItem.productName} className="w-full h-full object-contain" />
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium leading-tight">{boxItem.productName}</p>
                                    <p className="text-xs text-muted-foreground">{boxItem.brand}</p>
                                    {boxItem.color && (
                                      <span className="inline-block mt-0.5 text-xs px-1.5 py-0.5 bg-muted rounded">{boxItem.color}</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mb-6">Your cart is empty</p>
                  )}

                  <Separator className="my-6" />
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-xl text-accent">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isProcessing || items.length === 0}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By placing your order, you agree to our Terms and Privacy Policy
                  </p>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
