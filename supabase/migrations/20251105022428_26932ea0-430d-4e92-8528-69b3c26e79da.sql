-- Create products table to store all individual items
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL UNIQUE,
  product_name TEXT NOT NULL,
  user_price DECIMAL(10,2) NOT NULL,
  retail_price DECIMAL(10,2) NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_brand_model UNIQUE (brand, model)
);

-- Create product_variants table for color variations
CREATE TABLE public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  color TEXT NOT NULL,
  model_variant TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_product_color UNIQUE (product_id, color)
);

-- Create box_tiers table
CREATE TABLE public.box_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_name TEXT NOT NULL UNIQUE,
  price_point INTEGER NOT NULL,
  display_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert tier data
INSERT INTO public.box_tiers (tier_name, price_point, display_name) VALUES
  ('basic', 100, 'Basic'),
  ('standard', 200, 'Standard'),
  ('elite', 300, 'Elite');

-- Create box_combinations table to store valid 3-item combinations
CREATE TABLE public.box_combinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_id UUID NOT NULL REFERENCES public.box_tiers(id) ON DELETE CASCADE,
  item1_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  item2_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  item3_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  total_user_price DECIMAL(10,2) NOT NULL,
  total_retail_price DECIMAL(10,2) NOT NULL,
  box_ship_cost DECIMAL(10,2),
  packed_height DECIMAL(10,2),
  secondary_types TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_combination UNIQUE (tier_id, item1_id, item2_id, item3_id)
);

-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.box_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.box_combinations ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow public read access (no authentication needed)
CREATE POLICY "Public can view products"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Public can view product variants"
  ON public.product_variants FOR SELECT
  USING (true);

CREATE POLICY "Public can view box tiers"
  ON public.box_tiers FOR SELECT
  USING (true);

CREATE POLICY "Public can view box combinations"
  ON public.box_combinations FOR SELECT
  USING (true);

-- Create indexes for better query performance
CREATE INDEX idx_products_brand ON public.products(brand);
CREATE INDEX idx_products_model ON public.products(model);
CREATE INDEX idx_product_variants_product_id ON public.product_variants(product_id);
CREATE INDEX idx_box_combinations_tier_id ON public.box_combinations(tier_id);
CREATE INDEX idx_box_combinations_item1 ON public.box_combinations(item1_id);
CREATE INDEX idx_box_combinations_item1_item2 ON public.box_combinations(item1_id, item2_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();