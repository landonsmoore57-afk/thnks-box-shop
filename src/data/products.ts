import cookingBoxImg from "@/assets/products/cooking-box.png";
import modernTableBoxImg from "@/assets/products/modern-table-box.png";
import bougieBoxImg from "@/assets/products/bougie-box.png";
import knifeSetImg from "@/assets/products/knife-set.jpg";
import deskProductivityImg from "@/assets/products/desk-productivity.jpg";
import wellnessBreakImg from "@/assets/products/wellness-break.jpg";
import coffeeRitualImg from "@/assets/products/coffee-ritual.jpg";
import newHireWelcomeImg from "@/assets/products/new-hire-welcome.jpg";
import snackCrateImg from "@/assets/products/snack-crate.jpg";

export interface ProductVariant {
  tier: "Basic" | "Standard" | "Elite";
  sku: string;
  priceStandard: number;
  priceReseller: number;
  inventory: number;
  specs: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  variants: ProductVariant[];
  isActive: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "lets-get-cooking-collection",
    name: "Let's Get Cooking Collection",
    subtitle: "Cutlery & Kitchen Tools - Stainless Precision",
    description: "Everything needed for culinary excellence. From essential utensils to professional-grade tools, this collection elevates any kitchen experience with precision-crafted items.",
    category: "Kitchen",
    image: cookingBoxImg,
    isActive: true,
    variants: [
      {
        tier: "Basic",
        sku: "KNF-BAS-001",
        priceStandard: 3900,
        priceReseller: 2925,
        inventory: 45,
        specs: [
          "3-piece stainless steel set",
          "Essential chef, paring, and utility knives",
          "Ergonomic handles",
          "Gift box packaging"
        ]
      },
      {
        tier: "Standard",
        sku: "KNF-STD-001",
        priceStandard: 6900,
        priceReseller: 5175,
        inventory: 32,
        specs: [
          "5-piece forged steel set",
          "Chef, bread, carving, paring, utility",
          "Full tang construction",
          "Wooden storage block included"
        ]
      },
      {
        tier: "Elite",
        sku: "KNF-ELT-001",
        priceStandard: 12900,
        priceReseller: 9675,
        inventory: 18,
        specs: [
          "7-piece German steel collection",
          "Complete professional suite",
          "Lifetime sharpness guarantee",
          "Premium magnetic block & gift wrap"
        ]
      }
    ]
  },
  {
    id: "2",
    slug: "modern-table-collection",
    name: "The Modern Table",
    subtitle: "Everyday Function. Elevated.",
    description: "Sophisticated dining essentials that transform ordinary meals into refined experiences. Precision-engineered pieces that balance form and function perfectly.",
    category: "Dining",
    image: modernTableBoxImg,
    isActive: true,
    variants: [
      {
        tier: "Basic",
        sku: "DSK-BAS-002",
        priceStandard: 4900,
        priceReseller: 3675,
        inventory: 60,
        specs: [
          "Leather desk pad",
          "Quality pen & notebook",
          "Cable organizer",
          "Branded gift box"
        ]
      },
      {
        tier: "Standard",
        sku: "DSK-STD-002",
        priceStandard: 7900,
        priceReseller: 5925,
        inventory: 40,
        specs: [
          "Premium leather organizer",
          "Gold-plated pen set",
          "Hardcover notebook",
          "Desk plant & accessories"
        ]
      },
      {
        tier: "Elite",
        sku: "DSK-ELT-002",
        priceStandard: 14900,
        priceReseller: 11175,
        inventory: 22,
        specs: [
          "Executive leather desk set",
          "Luxury fountain pen",
          "Premium stationery collection",
          "Personalization available"
        ]
      }
    ]
  },
  {
    id: "3",
    slug: "so-bougie-collection",
    name: "So Bougie Collection",
    subtitle: "Elevated Style - Crossbodies & Wallets",
    description: "Luxury accessories that make a statement. Impeccably crafted pieces that combine sophisticated design with everyday practicality.",
    category: "Accessories",
    image: bougieBoxImg,
    isActive: true,
    variants: [
      {
        tier: "Basic",
        sku: "ACX-BAS-003",
        priceStandard: 5900,
        priceReseller: 4425,
        inventory: 40,
        specs: [
          "Premium crossbody bag",
          "Genuine leather wallet",
          "Card holder set",
          "Designer gift box"
        ]
      },
      {
        tier: "Standard",
        sku: "ACX-STD-003",
        priceStandard: 9900,
        priceReseller: 7425,
        inventory: 28,
        specs: [
          "Luxury crossbody collection",
          "Italian leather wallet set",
          "Premium card accessories",
          "Monogramming available"
        ]
      },
      {
        tier: "Elite",
        sku: "ACX-ELT-003",
        priceStandard: 16900,
        priceReseller: 12675,
        inventory: 15,
        specs: [
          "Designer crossbody bags",
          "Exotic leather wallets",
          "Complete accessory suite",
          "Personalized luxury packaging"
        ]
      }
    ]
  },
  {
    id: "4",
    slug: "coffee-ritual-collection",
    name: "Coffee Ritual Collection",
    subtitle: "For the true coffee enthusiast",
    description: "Craft the perfect morning routine with artisan coffee and premium brewing equipment. Each tier elevates the coffee experience from good to extraordinary.",
    category: "Food & Beverage",
    image: coffeeRitualImg,
    isActive: true,
    variants: [
      {
        tier: "Basic",
        sku: "COF-BAS-004",
        priceStandard: 3900,
        priceReseller: 2925,
        inventory: 70,
        specs: [
          "2 bags artisan beans",
          "French press",
          "Ceramic mug",
          "Tasting notes guide"
        ]
      },
      {
        tier: "Standard",
        sku: "COF-STD-004",
        priceStandard: 6900,
        priceReseller: 5175,
        inventory: 45,
        specs: [
          "4 premium coffee origins",
          "Pour-over set",
          "Double-wall mugs (2)",
          "Grinder & accessories"
        ]
      },
      {
        tier: "Elite",
        sku: "COF-ELT-004",
        priceStandard: 12900,
        priceReseller: 9675,
        inventory: 25,
        specs: [
          "6 rare single-origin beans",
          "Professional espresso maker",
          "Barista tools collection",
          "Luxury serving set"
        ]
      }
    ]
  },
  {
    id: "5",
    slug: "new-hire-welcome-kit",
    name: "New Hire Welcome Kit",
    subtitle: "Make great first impressions",
    description: "Welcome new team members with thoughtfully assembled essentials. Show them they're valued from day one with practical gifts that get them started right.",
    category: "Corporate",
    image: newHireWelcomeImg,
    isActive: true,
    variants: [
      {
        tier: "Basic",
        sku: "HIR-BAS-005",
        priceStandard: 4200,
        priceReseller: 3150,
        inventory: 80,
        specs: [
          "Branded notebook & pen",
          "Coffee mug",
          "Welcome card",
          "Company swag items"
        ]
      },
      {
        tier: "Standard",
        sku: "HIR-STD-005",
        priceStandard: 7200,
        priceReseller: 5400,
        inventory: 50,
        specs: [
          "Premium stationery set",
          "Branded tech accessories",
          "Quality backpack",
          "Welcome video message option"
        ]
      },
      {
        tier: "Elite",
        sku: "HIR-ELT-005",
        priceStandard: 13500,
        priceReseller: 10125,
        inventory: 28,
        specs: [
          "Executive welcome package",
          "Premium tech bundle",
          "Luxury desk accessories",
          "Personalized onboarding"
        ]
      }
    ]
  },
  {
    id: "6",
    slug: "premium-snack-crate",
    name: "Premium Snack Crate",
    subtitle: "Gourmet treats for any occasion",
    description: "Delight taste buds with artisan snacks and gourmet goodies. Perfect for client appreciation, team celebrations, or anytime you want to share something special.",
    category: "Food & Beverage",
    image: snackCrateImg,
    isActive: true,
    variants: [
      {
        tier: "Basic",
        sku: "SNK-BAS-006",
        priceStandard: 3500,
        priceReseller: 2625,
        inventory: 90,
        specs: [
          "Assorted nuts & chocolates",
          "Artisan crackers",
          "Gourmet popcorn",
          "Gift crate packaging"
        ]
      },
      {
        tier: "Standard",
        sku: "SNK-STD-006",
        priceStandard: 6500,
        priceReseller: 4875,
        inventory: 55,
        specs: [
          "Premium chocolate selection",
          "International cheese & crackers",
          "Specialty nuts & dried fruits",
          "Wooden crate presentation"
        ]
      },
      {
        tier: "Elite",
        sku: "SNK-ELT-006",
        priceStandard: 11900,
        priceReseller: 8925,
        inventory: 30,
        specs: [
          "Luxury gourmet collection",
          "Imported delicacies",
          "Vintage wine pairing",
          "Custom engraved crate"
        ]
      }
    ]
  }
];
