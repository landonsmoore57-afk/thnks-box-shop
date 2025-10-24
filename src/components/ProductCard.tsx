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
    <a href={`/product/${product.slug}`} className="group block">
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-muted">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-3">
            <Badge variant="outline" className="mb-2 text-xs">
              {product.category}
            </Badge>
            <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{product.subtitle}</p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-2xl font-bold text-accent">${formattedPrice}</span>
              <span className="text-sm text-muted-foreground ml-1">starting at</span>
            </div>
            <Button variant="outline" size="sm" className="group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all">
              View Options
            </Button>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
