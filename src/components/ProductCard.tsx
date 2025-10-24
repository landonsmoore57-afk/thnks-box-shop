import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const startingPrice = Math.min(...product.variants.map(v => v.priceStandard));
  const formattedPrice = (startingPrice / 100).toFixed(0);

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border-2 border-border hover:border-brand-teal hover:shadow-2xl transition-all duration-300 hover:scale-105">
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/50 relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 backdrop-blur text-foreground border-0 shadow-lg">
              {product.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl font-bold mb-2 group-hover:text-brand-teal transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.subtitle}</p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-brand-teal to-brand-blue bg-clip-text text-transparent">
                ${formattedPrice}
              </span>
              <span className="text-sm text-muted-foreground ml-2">starting</span>
            </div>
            <Button variant="ghost" size="sm" className="group-hover:bg-brand-teal group-hover:text-white transition-all rounded-full">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
