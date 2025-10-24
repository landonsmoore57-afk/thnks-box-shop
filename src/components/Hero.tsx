import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-gifts.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center bg-primary text-primary-foreground overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Premium corporate gifts" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Corporate gifting,
            <span className="block text-accent">ready to ship.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            Thoughtfully curated gift boxes in three quality tiers. Order in minutes, delight in days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="secondary" className="text-lg font-semibold group">
              Shop Gift Boxes
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg border-accent text-primary-foreground hover:bg-accent/10">
              For Resellers
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-primary-foreground/20">
            <div>
              <div className="text-3xl font-bold text-accent mb-1">3</div>
              <div className="text-sm text-primary-foreground/70">Quality Tiers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">24hr</div>
              <div className="text-sm text-primary-foreground/70">Fast Processing</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">50+</div>
              <div className="text-sm text-primary-foreground/70">States Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
