import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

export type CartItem = {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
    slug: string;
    stock: number;
    category?: string;
  };
};

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  loading: boolean;
  add: (productId: string, quantity?: number) => Promise<void>;
  update: (id: string, quantity: number) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
  refresh: () => Promise<void>;
};

const Ctx = createContext<CartCtx>({} as CartCtx);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) { setItems([]); return; }
    setLoading(true);
    const { data, error } = await supabase
      .from("cart_items")
      .select("id, product_id, quantity, product:products(id, name, price, image_url, slug, stock, category)")
      .eq("user_id", user.id);
    if (!error && data) setItems(data as any);
    setLoading(false);
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  const add = async (productId: string, quantity = 1) => {
    if (!user) { toast.error("Please sign in to add items"); return; }
    const existing = items.find(i => i.product_id === productId);
    if (existing) {
      await update(existing.id, existing.quantity + quantity);
    } else {
      const { error } = await supabase.from("cart_items").insert({ user_id: user.id, product_id: productId, quantity });
      if (error) { toast.error(error.message); return; }
      toast.success("Added to cart");
      await refresh();
    }
  };

  const update = async (id: string, quantity: number) => {
    if (quantity <= 0) return remove(id);
    const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    await refresh();
  };

  const remove = async (id: string) => {
    await supabase.from("cart_items").delete().eq("id", id);
    await refresh();
  };

  const clear = async () => {
    if (!user) return;
    await supabase.from("cart_items").delete().eq("user_id", user.id);
    setItems([]);
  };

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.quantity * Number(i.product?.price ?? 0), 0);

  return <Ctx.Provider value={{ items, count, subtotal, loading, add, update, remove, clear, refresh }}>{children}</Ctx.Provider>;
}

export const useCart = () => useContext(Ctx);
