import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-gifts.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--brand-navy))] via-[hsl(var(--brand-slate))] to-[hsl(var(--brand-charcoal))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--brand-gold)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--brand-gold)/0.1),transparent_50%)]" />
      </div>

      {/* Background Image with Blend */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Premium corporate gifts" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[hsl(var(--brand-gold)/0.1)] rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[hsl(var(--brand-gold)/0.08)] rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Sparkles className="w-4 h-4 text-[hsl(var(--brand-gold))]" />
              <span className="text-sm font-medium text-[hsl(var(--brand-gold))]">Premium Corporate Gifting</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Gifts That Make
                <span className="block mt-2 bg-gradient-to-r from-[hsl(var(--brand-gold))] to-[hsl(var(--brand-gold)/0.7)] bg-clip-text text-transparent">
                  Lasting Impressions
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-xl leading-relaxed font-light">
                Thoughtfully curated collections for discerning professionals. 
                <span className="block mt-2 text-white/70">Three quality tiers. Unlimited impact.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/build-your-box" className="group">
                <Button 
                  size="lg" 
                  className="text-base font-semibold px-8 h-14 bg-[hsl(var(--brand-gold))] text-[hsl(var(--brand-navy))] hover:bg-[hsl(var(--brand-gold)/0.9)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Package className="mr-2 h-5 w-5" />
                  Build Your Box
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/shop" className="group">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-base font-semibold px-8 h-14 bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                >
                  Explore Collections
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-[hsl(var(--brand-gold)/0.1)] rounded-lg blur group-hover:bg-[hsl(var(--brand-gold)/0.2)] transition-colors" />
                <div className="relative p-4 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5">
                  <div className="text-3xl md:text-4xl font-bold text-[hsl(var(--brand-gold))] mb-1">3</div>
                  <div className="text-xs md:text-sm text-white/70 font-medium">Quality Tiers</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-[hsl(var(--brand-gold)/0.1)] rounded-lg blur group-hover:bg-[hsl(var(--brand-gold)/0.2)] transition-colors" />
                <div className="relative p-4 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5">
                  <div className="text-3xl md:text-4xl font-bold text-[hsl(var(--brand-gold))] mb-1">24h</div>
                  <div className="text-xs md:text-sm text-white/70 font-medium">Processing</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-[hsl(var(--brand-gold)/0.1)] rounded-lg blur group-hover:bg-[hsl(var(--brand-gold)/0.2)] transition-colors" />
                <div className="relative p-4 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5">
                  <div className="text-3xl md:text-4xl font-bold text-[hsl(var(--brand-gold))] mb-1">50+</div>
                  <div className="text-xs md:text-sm text-white/70 font-medium">States</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="hidden lg:flex flex-col gap-4">
            <div className="group relative p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--brand-gold)/0.1)] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--brand-gold)/0.2)] flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-[hsl(var(--brand-gold))]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Custom Curation</h3>
                <p className="text-white/70">Build your perfect box with three handpicked premium items</p>
              </div>
            </div>
            
            <div className="group relative p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--brand-gold)/0.1)] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--brand-gold)/0.2)] flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-[hsl(var(--brand-gold))]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Premium Quality</h3>
                <p className="text-white/70">Every item carefully selected from top brands and artisans</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
