import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const Resellers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl font-bold mb-4">Partner with Thnks & Co.</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our network of resellers and offer your clients premium curated gift solutions with exclusive pricing and dedicated support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8">
              <h3 className="font-serif text-2xl font-bold mb-4">Wholesale Pricing</h3>
              <p className="text-muted-foreground mb-4">
                Access exclusive reseller rates with volume discounts and special pricing tiers designed for your business growth.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">25% margin on all products</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Volume discounts available</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Flexible payment terms</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8">
              <h3 className="font-serif text-2xl font-bold mb-4">White Label Options</h3>
              <p className="text-muted-foreground mb-4">
                Personalize products with your branding and create a seamless experience for your clients.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Custom packaging available</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Your branding on materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Dropshipping capabilities</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8">
              <h3 className="font-serif text-2xl font-bold mb-4">Dedicated Support</h3>
              <p className="text-muted-foreground mb-4">
                Work with our experienced team to create custom solutions and streamline your operations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Priority customer service</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Marketing support materials</span>
                </li>
              </ul>
            </Card>
          </div>

          <Card className="p-12 text-center bg-muted/50">
            <h2 className="font-serif text-3xl font-bold mb-4">Ready to Partner?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how Thnks & Co. can help grow your business with premium gift solutions.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resellers;
