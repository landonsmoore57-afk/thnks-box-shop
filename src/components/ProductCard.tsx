import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const startingPrice = Math.min(...product.variants.map(v => v.priceStandard));
  const formattedPrice = (startingPrice / 100).toFixed(0);

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="bg-white overflow-hidden border-2 border-border/50 hover:border-[hsl(var(--brand-gold)/0.5)] hover:shadow-2xl hover:shadow-[hsl(var(--brand-gold)/0.1)] transition-all duration-300 hover:scale-[1.02]">
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-muted relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/95 backdrop-blur-sm text-foreground border border-border/50 shadow-lg">
              {product.category}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--brand-navy)/0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-2xl font-bold mb-2 text-foreground group-hover:text-[hsl(var(--brand-gold))] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.subtitle}</p>

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div>
              <span className="text-2xl font-bold text-[hsl(var(--brand-gold))]">${formattedPrice}</span>
              <span className="text-sm text-muted-foreground ml-2">starting</span>
            </div>
            <Button variant="ghost" size="sm" className="text-[hsl(var(--brand-gold))] hover:bg-[hsl(var(--brand-gold)/0.1)] font-semibold">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
