import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface FiltersBarProps {
  selectedCategory: string;
  selectedTier: string;
  sortBy: string;
  onCategoryChange: (value: string) => void;
  onTierChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
  categories: string[];
  productCount: number;
}

export function FiltersBar({
  selectedCategory,
  selectedTier,
  sortBy,
  onCategoryChange,
  onTierChange,
  onSortChange,
  onClearFilters,
  categories,
  productCount,
}: FiltersBarProps) {
  const hasActiveFilters = selectedCategory !== "all" || selectedTier !== "all";

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-3">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTier} onValueChange={onTierChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="Basic">Basic</SelectItem>
              <SelectItem value="Standard">Standard</SelectItem>
              <SelectItem value="Elite">Elite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="name_asc">Name: A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {hasActiveFilters && (
            <>
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCategory}
                  <button
                    onClick={() => onCategoryChange("all")}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedTier !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedTier} Tier
                  <button
                    onClick={() => onTierChange("all")}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-7 text-xs"
              >
                Clear all
              </Button>
            </>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {productCount} {productCount === 1 ? "product" : "products"}
        </p>
      </div>
    </div>
  );
}
