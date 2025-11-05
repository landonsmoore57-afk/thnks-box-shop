import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package } from "lucide-react";
import heroImage from "@/assets/hero-gifts.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[hsl(var(--brand-navy))] to-[hsl(var(--brand-charcoal))]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--brand-gold)/0.15),transparent_50%)] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--brand-gold)/0.1),transparent_60%)] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      {/* Hero Image */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src={heroImage} 
          alt="Premium corporate gifts" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--brand-navy))] via-[hsl(var(--brand-navy)/0.8)] to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 py-32">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--brand-gold))] animate-pulse" />
            <span className="text-sm font-medium text-white/90">Premium Corporate Gifting</span>
          </div>

          {/* Headline */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
              <span className="block text-white">Gifts That</span>
              <span className="block mt-2 bg-gradient-to-r from-[hsl(var(--brand-gold))] via-[hsl(var(--brand-gold)/0.9)] to-[hsl(var(--brand-gold)/0.7)] bg-clip-text text-transparent">
                Leave an Impact
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Curated collections for professionals who appreciate quality. Choose your tier, make it yours.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link to="/build-your-box" className="group">
              <Button 
                size="lg" 
                className="text-lg font-semibold px-10 h-16 bg-[hsl(var(--brand-gold))] text-[hsl(var(--brand-navy))] hover:bg-[hsl(var(--brand-gold)/0.9)] shadow-2xl shadow-[hsl(var(--brand-gold)/0.3)] hover:shadow-[hsl(var(--brand-gold)/0.5)] transition-all duration-300 hover:scale-105"
              >
                <Package className="mr-2 h-6 w-6" />
                Build Your Box
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/shop" className="group">
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg font-semibold px-10 h-16 bg-white/5 text-white border-2 border-white/20 hover:bg-white/10 hover:border-white/30 backdrop-blur-xl transition-all duration-300"
              >
                Explore Collections
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Trust Indicators - Minimal */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-12 text-white/60 text-sm font-medium animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--brand-gold))]" />
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--brand-gold))]" />
              <span>Fast Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--brand-gold))]" />
              <span>Nationwide Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
