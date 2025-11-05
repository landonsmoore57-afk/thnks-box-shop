import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

export interface CustomBoxItem {
  brand: string;
  productName: string;
  image?: string;
  color?: string;
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  tier: "Basic" | "Standard" | "Elite";
  unitPrice: number;
  quantity: number;
  customBoxItems?: CustomBoxItem[];
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string, tier: string) => void;
  updateQuantity: (id: string, tier: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "thnksco:cart:v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setItems((current) => {
      const existing = current.find(
        (item) => item.id === newItem.id && item.tier === newItem.tier
      );

      if (existing) {
        toast({
          title: "Cart updated",
          description: `Increased quantity of ${newItem.name} (${newItem.tier})`,
        });
        return current.map((item) =>
          item.id === newItem.id && item.tier === newItem.tier
            ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
            : item
        );
      }

      toast({
        title: "Added to cart",
        description: `${newItem.name} (${newItem.tier})`,
      });

      return [...current, { ...newItem, quantity: newItem.quantity || 1 }];
    });
  };

  const removeItem = (id: string, tier: string) => {
    setItems((current) => current.filter((item) => !(item.id === id && item.tier === tier)));
    toast({
      title: "Removed from cart",
      description: "Item removed successfully",
    });
  };

  const updateQuantity = (id: string, tier: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id, tier);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.id === id && item.tier === tier ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
