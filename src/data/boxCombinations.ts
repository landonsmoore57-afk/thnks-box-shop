// Box combination data parsed from Excel files
// Structure: Main item -> valid secondary items -> valid tertiary items

export interface BoxItem {
  brand: string;
  model: string;
  productName: string;
  userPrice: number;
  retailPrice: number;
  colors?: string[]; // For items with color variations
  image?: string;
}

export interface BoxCombination {
  item1: BoxItem;
  item2: BoxItem;
  item3: BoxItem;
  totalUserPrice: number;
  totalRetailPrice: number;
  tier: "Basic" | "Standard" | "Elite";
}

// For $100 boxes (Basic tier) - placeholder data
export const basic100Combinations: BoxCombination[] = [];

// For $200 boxes (Standard tier)
export const standard200Combinations: BoxCombination[] = [
  {
    tier: "Standard",
    item1: { brand: "Cangshan", model: "501899", productName: "8-Inch Maya Series Chef's Knife w/Sheath", userPrice: 104, retailPrice: 139.95 },
    item2: { brand: "KitchenSupply", model: "SQ157B", productName: "Escali - Nutro Digital Scale, Black", userPrice: 30.5, retailPrice: 69.95 },
    item3: { brand: "KitchenSupply", model: "KCHZ09007", productName: "Joyce Chen - Original Unlimited Kitchen Scissors, 2 Pack", userPrice: 31.25, retailPrice: 69.95, colors: ["Yellow", "Blue", "White", "Red"] },
    totalUserPrice: 165.75,
    totalRetailPrice: 279.85
  },
  {
    tier: "Standard",
    item1: { brand: "Cangshan", model: "501899", productName: "8-Inch Maya Series Chef's Knife w/Sheath", userPrice: 104, retailPrice: 139.95 },
    item2: { brand: "KitchenSupply", model: "DH8", productName: "Escali - Infrared Surface & Probe Digital Thermometer", userPrice: 28.75, retailPrice: 69.95 },
    item3: { brand: "KitchenSupply", model: "KCHZ09007", productName: "Joyce Chen - Original Unlimited Kitchen Scissors, 2 Pack", userPrice: 31.25, retailPrice: 69.95, colors: ["Yellow", "Blue", "White", "Red"] },
    totalUserPrice: 164,
    totalRetailPrice: 279.85
  },
  {
    tier: "Standard",
    item1: { brand: "Cangshan", model: "501899", productName: "8-Inch Maya Series Chef's Knife w/Sheath", userPrice: 104, retailPrice: 139.95 },
    item2: { brand: "KitchenSupply", model: "SQ157B", productName: "Escali - Nutro Digital Scale, Black", userPrice: 30.5, retailPrice: 69.95 },
    item3: { brand: "KitchenSupply", model: "DHRW2", productName: "Escali - Wireless Thermometer & Timer", userPrice: 31.25, retailPrice: 64.95 },
    totalUserPrice: 165.75,
    totalRetailPrice: 274.85
  },
  {
    tier: "Standard",
    item1: { brand: "Cangshan", model: "501899", productName: "8-Inch Maya Series Chef's Knife w/Sheath", userPrice: 104, retailPrice: 139.95 },
    item2: { brand: "KitchenSupply", model: "T115S", productName: "Escali - Tabla Stainless Steel Scale", userPrice: 37.5, retailPrice: 79.95 },
    item3: { brand: "KitchenSupply", model: "DHR2-B", productName: "Escali - Touch Screen Thermometer & Timer, Black", userPrice: 18.75, retailPrice: 49.95 },
    totalUserPrice: 160.25,
    totalRetailPrice: 269.85
  },
  {
    tier: "Standard",
    item1: { brand: "Cangshan", model: "501899", productName: "8-Inch Maya Series Chef's Knife w/Sheath", userPrice: 104, retailPrice: 139.95 },
    item2: { brand: "KitchenSupply", model: "KCHZ09007", productName: "Joyce Chen - Original Unlimited Kitchen Scissors, 2 Pack", userPrice: 31.25, retailPrice: 69.95, colors: ["Yellow", "Blue", "White", "Red"] },
    item3: { brand: "KitchenSupply", model: "157BO-2", productName: "Escali - Arti Glass Digital Scale", userPrice: 25.75, retailPrice: 54.95, colors: ["Black Obsidian", "Desert Rose", "Frost White"] },
    totalUserPrice: 161,
    totalRetailPrice: 264.85
  },
  // Model 1027327 combinations
  {
    tier: "Standard",
    item1: { brand: "Cangshan", model: "1027327", productName: "3-Piece OLIV Cheese Knife Set w/Acacia Cheese Board", userPrice: 89, retailPrice: 119.95 },
    item2: { brand: "KitchenSupply", model: "DH10", productName: "Escali - Stelo Waterproof Folding Thermometer", userPrice: 43.75, retailPrice: 89.95 },
    item3: { brand: "KitchenSupply", model: "KCHZ09007", productName: "Joyce Chen - Original Unlimited Kitchen Scissors, 2 Pack", userPrice: 31.25, retailPrice: 69.95, colors: ["Yellow", "Blue", "White", "Red"] },
    totalUserPrice: 164,
    totalRetailPrice: 279.85
  },
  {
    tier: "Standard",
    item1: { brand: "Cangshan", model: "1027327", productName: "3-Piece OLIV Cheese Knife Set w/Acacia Cheese Board", userPrice: 89, retailPrice: 119.95 },
    item2: { brand: "KitchenSupply", model: "CF63B", productName: "Escali - Versi Coffee Scale, 6.6 lb", userPrice: 43.75, retailPrice: 89.95 },
    item3: { brand: "KitchenSupply", model: "KCHZ09007", productName: "Joyce Chen - Original Unlimited Kitchen Scissors, 2 Pack", userPrice: 31.25, retailPrice: 69.95, colors: ["Yellow", "Blue", "White", "Red"] },
    totalUserPrice: 164,
    totalRetailPrice: 279.85
  },
  {
    tier: "Standard",
    item1: { brand: "Cangshan", model: "1027327", productName: "3-Piece OLIV Cheese Knife Set w/Acacia Cheese Board", userPrice: 89, retailPrice: 119.95 },
    item2: { brand: "KitchenSupply", model: "T115S", productName: "Escali - Tabla Stainless Steel Scale", userPrice: 37.5, retailPrice: 79.95 },
    item3: { brand: "KitchenSupply", model: "KCHZ09007", productName: "Joyce Chen - Original Unlimited Kitchen Scissors, 2 Pack", userPrice: 31.25, retailPrice: 69.95, colors: ["Yellow", "Blue", "White", "Red"] },
    totalUserPrice: 157.75,
    totalRetailPrice: 269.85
  }
];

// For $300 boxes (Elite tier)
export const elite300Combinations: BoxCombination[] = [
  {
    tier: "Elite",
    item1: { brand: "Cangshan", model: "501509", productName: "4-Piece KITA Series Steak Knife Set w/Ash Box", userPrice: 222, retailPrice: 299.95 },
    item2: { brand: "KitchenSupply", model: "PR2000S", productName: "Escali - Vera Compact Precision Digital Scale", userPrice: 25, retailPrice: 54.95 },
    item3: { brand: "KitchenSupply", model: "DHR2-B", productName: "Escali - Touch Screen Thermometer & Timer, Black", userPrice: 18.75, retailPrice: 49.95 },
    totalUserPrice: 265.75,
    totalRetailPrice: 404.85
  },
  {
    tier: "Elite",
    item1: { brand: "Cangshan", model: "501509", productName: "4-Piece KITA Series Steak Knife Set w/Ash Box", userPrice: 222, retailPrice: 299.95 },
    item2: { brand: "KitchenSupply", model: "PR500S", productName: "Escali - Pico High Precision Pocket Scale", userPrice: 25, retailPrice: 54.95 },
    item3: { brand: "KitchenSupply", model: "DHR2-B", productName: "Escali - Touch Screen Thermometer & Timer, Black", userPrice: 18.75, retailPrice: 49.95 },
    totalUserPrice: 265.75,
    totalRetailPrice: 404.85
  },
  {
    tier: "Elite",
    item1: { brand: "Cangshan", model: "501509", productName: "4-Piece KITA Series Steak Knife Set w/Ash Box", userPrice: 222, retailPrice: 299.95 },
    item2: { brand: "KitchenSupply", model: "P115CH", productName: "Escali - Primo Digital Scale", userPrice: 21.75, retailPrice: 49.95, colors: ["Black", "Purple", "Royal Blue", "Tarragon Green", "White"] },
    item3: { brand: "KitchenSupply", model: "DHR2-B", productName: "Escali - Touch Screen Thermometer & Timer, Black", userPrice: 18.75, retailPrice: 49.95 },
    totalUserPrice: 262.5,
    totalRetailPrice: 399.85
  },
  {
    tier: "Elite",
    item1: { brand: "Cangshan", model: "501523", productName: "2-Piece KITA Series Starter Set w/Ash Box", userPrice: 126, retailPrice: 169.95 },
    item2: { brand: "Legacy", model: "0250100", productName: "Chef's Choice® - Hybrid® Diamond Hone® Knife Sharpener, Model 250", userPrice: 68.5, retailPrice: 74.99 },
    item3: { brand: "KitchenSupply", model: "136DK", productName: "Escali - Alimento Digital Scale", userPrice: 57.25, retailPrice: 99.95 },
    totalUserPrice: 251.75,
    totalRetailPrice: 344.89
  },
  {
    tier: "Elite",
    item1: { brand: "Cangshan", model: "501523", productName: "2-Piece KITA Series Starter Set w/Ash Box", userPrice: 126, retailPrice: 169.95 },
    item2: { brand: "Made In", model: "BAKE-3-OVAL-BLU-RIM", productName: "10 x 6.6 Oval Gratin Baking Dish, Porcelain", userPrice: 72, retailPrice: 79, colors: ["Blue", "Red"] },
    item3: { brand: "Lodge", model: "CK1-10001", productName: "FINEX - Cast Iron Care Kit", userPrice: 47.5, retailPrice: 60 },
    totalUserPrice: 245.5,
    totalRetailPrice: 308.95
  }
];

// Helper function to get unique items for a tier
export function getUniqueItem1Options(tier: "Basic" | "Standard" | "Elite"): BoxItem[] {
  const combinations = tier === "Basic" ? basic100Combinations : 
                       tier === "Standard" ? standard200Combinations : 
                       elite300Combinations;
  
  const uniqueItems = new Map<string, BoxItem>();
  combinations.forEach(combo => {
    const key = `${combo.item1.brand}-${combo.item1.model}`;
    if (!uniqueItems.has(key)) {
      uniqueItems.set(key, combo.item1);
    }
  });
  
  return Array.from(uniqueItems.values());
}

// Get valid item2 options based on selected item1
export function getValidItem2Options(tier: "Basic" | "Standard" | "Elite", item1Model: string): BoxItem[] {
  const combinations = tier === "Basic" ? basic100Combinations : 
                       tier === "Standard" ? standard200Combinations : 
                       elite300Combinations;
  
  const validCombos = combinations.filter(combo => combo.item1.model === item1Model);
  const uniqueItems = new Map<string, BoxItem>();
  
  validCombos.forEach(combo => {
    const key = `${combo.item2.brand}-${combo.item2.model}`;
    if (!uniqueItems.has(key)) {
      uniqueItems.set(key, combo.item2);
    }
  });
  
  return Array.from(uniqueItems.values());
}

// Get valid item3 options based on selected item1 and item2
export function getValidItem3Options(tier: "Basic" | "Standard" | "Elite", item1Model: string, item2Model: string): BoxItem[] {
  const combinations = tier === "Basic" ? basic100Combinations : 
                       tier === "Standard" ? standard200Combinations : 
                       elite300Combinations;
  
  const validCombos = combinations.filter(combo => 
    combo.item1.model === item1Model && combo.item2.model === item2Model
  );
  const uniqueItems = new Map<string, BoxItem>();
  
  validCombos.forEach(combo => {
    const key = `${combo.item3.brand}-${combo.item3.model}`;
    if (!uniqueItems.has(key)) {
      uniqueItems.set(key, combo.item3);
    }
  });
  
  return Array.from(uniqueItems.values());
}
