import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

const CheckoutSuccess = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
            </div>
            <h1 className="font-serif text-4xl font-bold mb-4">Order Placed!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your order. We've received your request and will be in touch shortly.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              A confirmation email has been sent to your email address with order details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
