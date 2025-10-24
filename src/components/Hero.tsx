import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-gifts.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-brand-navy via-brand-slate to-brand-charcoal">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Premium corporate gifts" 
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-slate/90 to-brand-charcoal/95" />
      </div>

      {/* Subtle Gold Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-gold/5 to-transparent" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-4xl">
          <div className="space-y-8 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-sm font-medium text-brand-gold">Premium Corporate Gifting</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight">
              Elevate Your
              <span className="block text-brand-gold mt-2">Corporate Gifting</span>
            </h1>

            <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
              Thoughtfully curated collections designed for discerning professionals. Choose from three quality tiers to match your needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/shop">
                <Button size="lg" className="text-base font-medium px-8 h-14 bg-brand-gold text-brand-navy hover:bg-brand-gold/90">
                  Explore Gifts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/resellers">
                <Button size="lg" variant="outline" className="text-base px-8 h-14 border-white/30 text-white hover:bg-white/10 hover:text-white">
                  For Resellers
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl pt-12 border-t border-white/20">
              <div>
                <div className="text-3xl font-semibold text-brand-gold mb-1">3</div>
                <div className="text-sm text-white/70">Quality Tiers</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-brand-gold mb-1">24h</div>
                <div className="text-sm text-white/70">Processing</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-brand-gold mb-1">50+</div>
                <div className="text-sm text-white/70">States</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
