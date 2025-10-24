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
      <div className="bg-white overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-muted relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-white text-foreground border shadow-sm">
              {product.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl font-semibold mb-2 text-brand-navy group-hover:text-brand-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.subtitle}</p>

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <span className="text-2xl font-semibold text-brand-navy">${formattedPrice}</span>
              <span className="text-sm text-muted-foreground ml-1">starting</span>
            </div>
            <Button variant="ghost" size="sm" className="text-brand-gold hover:bg-brand-gold/10">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
