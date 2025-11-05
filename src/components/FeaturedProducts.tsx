import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import buildBoxHero from "@/assets/build-box-hero.jpg";

const FeaturedProducts = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(var(--brand-gold)/0.03)] rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground">
            Featured Collections
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Curated selections designed to impress. Available in three quality tiers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
          {/* Build Your Box Card */}
          <Link to="/build-your-box" className="group animate-fade-in">
            <Card className="overflow-hidden border-2 border-[hsl(var(--brand-gold)/0.2)] hover:border-[hsl(var(--brand-gold)/0.5)] hover:shadow-2xl hover:shadow-[hsl(var(--brand-gold)/0.1)] transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-background to-[hsl(var(--brand-gold)/0.02)]">
              <div className="aspect-square overflow-hidden bg-muted relative">
                <img 
                  src={buildBoxHero} 
                  alt="Build Your Box - Custom Gift Collection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--brand-navy)/0.6)] to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1.5 rounded bg-[hsl(var(--brand-gold))] text-[hsl(var(--brand-navy))] shadow-lg text-xs font-semibold">
                    Custom
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-[hsl(var(--brand-gold))] transition-colors mb-2">
                  Build Your Box
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Create your perfect custom gift box with three handpicked items
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[hsl(var(--brand-gold))]">From $100</span>
                  <ArrowRight className="w-5 h-5 text-[hsl(var(--brand-gold))] group-hover:translate-x-2 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {featuredProducts.map((product, idx) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${(idx + 1) * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link to="/shop">
            <Button 
              size="lg" 
              variant="outline" 
              className="group px-10 h-14 text-base font-semibold border-2 border-foreground/20 hover:border-[hsl(var(--brand-gold))] hover:bg-[hsl(var(--brand-gold))] hover:text-[hsl(var(--brand-navy))] transition-all duration-300"
            >
              View All Collections
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
