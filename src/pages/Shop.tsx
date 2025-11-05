import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { FiltersBar } from "@/components/FiltersBar";
import { EmptyState } from "@/components/EmptyState";
import { PackageX, Package, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import buildBoxHero from "@/assets/build-box-hero.jpg";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");

  // Initialize from URL params
  useEffect(() => {
    const category = searchParams.get("category") || "all";
    const tier = searchParams.get("tier") || "all";
    const sort = searchParams.get("sort") || "relevance";
    setSelectedCategory(category);
    setSelectedTier(tier);
    setSortBy(sort);
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category)));

  // Update URL when filters change
  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params, { replace: true });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    updateFilters("category", value);
  };

  const handleTierChange = (value: string) => {
    setSelectedTier(value);
    updateFilters("tier", value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    updateFilters("sort", value);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSelectedTier("all");
    setSearchParams({}, { replace: true });
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== "all" && product.category !== selectedCategory) return false;
    if (selectedTier !== "all" && !product.variants.some(v => v.tier === selectedTier)) return false;
    return product.isActive;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aPrice = Math.min(...a.variants.map(v => v.priceStandard));
    const bPrice = Math.min(...b.variants.map(v => v.priceStandard));
    
    switch (sortBy) {
      case "price_asc":
        return aPrice - bPrice;
      case "price_desc":
        return bPrice - aPrice;
      case "name_asc":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Refined Gifts, Thoughtfully Tiered
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl">
              Browse our curated gift boxes. Each available in Basic, Standard, and Elite tiers.
            </p>
          </div>
        </section>

        {/* Filters & Sort */}
        <section className="border-b border-border bg-card sticky top-20 z-40">
          <div className="container mx-auto px-4 py-6">
            <FiltersBar
              selectedCategory={selectedCategory}
              selectedTier={selectedTier}
              sortBy={sortBy}
              onCategoryChange={handleCategoryChange}
              onTierChange={handleTierChange}
              onSortChange={handleSortChange}
              onClearFilters={handleClearFilters}
              categories={categories}
              productCount={sortedProducts.length}
            />
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {sortedProducts.length > 0 || selectedCategory === "all" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Build Your Box Card - Only show when no filters or "all" */}
                {selectedCategory === "all" && selectedTier === "all" && (
                  <Link to="/build-your-box" className="group">
                    <Card className="overflow-hidden border-2 border-[hsl(var(--brand-gold)/0.2)] hover:border-[hsl(var(--brand-gold)/0.5)] hover:shadow-2xl hover:shadow-[hsl(var(--brand-gold)/0.1)] transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-background to-[hsl(var(--brand-gold)/0.02)]">
                      <div className="aspect-square overflow-hidden bg-muted relative">
                        <img 
                          src={buildBoxHero} 
                          alt="Build Your Box - Custom Gift Collection"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--brand-navy)/0.6)] to-transparent" />
                        <div className="absolute top-4 right-4">
                          <div className="px-3 py-1.5 rounded bg-white/95 backdrop-blur-sm text-foreground border border-border/50 shadow-lg text-xs font-medium">
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
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div>
                            <span className="text-2xl font-bold text-[hsl(var(--brand-gold))]">$100</span>
                            <span className="text-sm text-muted-foreground ml-2">starting</span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-[hsl(var(--brand-gold))] group-hover:translate-x-2 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
                
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={PackageX}
                title="No matches yet"
                description="Try adjusting your filters to see more products"
                action={{
                  label: "Clear Filters",
                  onClick: handleClearFilters,
                }}
              />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
