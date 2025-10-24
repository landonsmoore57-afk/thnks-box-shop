import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-gifts.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[700px] flex items-center bg-primary text-primary-foreground overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Premium corporate gifts" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/98 to-primary/90" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in">
            Corporate Gifting,
            <span className="block text-accent mt-2">Redefined.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-primary-foreground/80 max-w-2xl mx-auto">
            Curated gift boxes in three quality tiers. Order in minutes, delight in days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/shop">
              <Button size="lg" variant="secondary" className="text-lg font-semibold group px-8 py-6">
                Explore Collections
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/resellers">
              <Button size="lg" variant="outline" className="text-lg border-accent text-primary-foreground hover:bg-accent/10 px-8 py-6">
                Reseller Program
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
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
