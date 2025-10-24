import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-gifts.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-teal/10 to-brand-blue/10 rounded-full border border-brand-teal/20">
              <Sparkles className="h-4 w-4 text-brand-teal" />
              <span className="text-sm font-medium text-foreground">Premium Corporate Gifts</span>
            </div>

            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              Gifting Made
              <span className="block bg-gradient-to-r from-brand-teal via-brand-blue to-brand-purple bg-clip-text text-transparent mt-2">
                Effortless
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Curated gift boxes in three tiers. Order in minutes, make lasting impressions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/shop">
                <Button size="lg" className="text-lg font-semibold group px-8 h-14 rounded-full bg-gradient-to-r from-brand-teal to-brand-blue hover:shadow-lg hover:scale-105 transition-all">
                  Explore Collections
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/resellers">
                <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-full border-2 hover:bg-muted hover:scale-105 transition-all">
                  Become a Reseller
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-16">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-brand-teal to-brand-blue bg-clip-text text-transparent mb-2">
                  3
                </div>
                <div className="text-sm text-muted-foreground">Quality Tiers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent mb-2">
                  24h
                </div>
                <div className="text-sm text-muted-foreground">Fast Shipping</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-brand-purple to-brand-coral bg-clip-text text-transparent mb-2">
                  1000+
                </div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;
