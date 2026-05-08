import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/format";
import { toast } from "sonner";

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", city: "", zip: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || items.length === 0) return;
    setLoading(true);
    const { data: order, error } = await supabase.from("orders").insert({
      user_id: user.id,
      total: subtotal,
      status: "paid",
      shipping_name: form.name,
      shipping_address: form.address,
      shipping_city: form.city,
      shipping_zip: form.zip,
    }).select().single();

    if (error || !order) { setLoading(false); return toast.error(error?.message ?? "Order failed"); }

    const { error: itemsErr } = await supabase.from("order_items").insert(
      items.map(i => ({
        order_id: order.id,
        product_id: i.product_id,
        product_name: i.product.name,
        product_image: i.product.image_url,
        quantity: i.quantity,
        price: i.product.price,
      }))
    );
    if (itemsErr) { setLoading(false); return toast.error(itemsErr.message); }

    await clear();
    navigate(`/order-confirmed/${order.id}`);
  };

  if (items.length === 0) {
    return <div className="container-tight py-24 text-center text-muted-foreground">Your bag is empty.</div>;
  }

  return (
    <div className="container-tight py-16 animate-fade-up">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Checkout</h1>
      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="space-y-8">
          <h2 className="text-xl font-semibold">Shipping</h2>
          {/* Inputs — large padding, rounded corners, soft borders per DESIGN.md */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2"><Label>Full name</Label><Input className="rounded-lg mt-1.5" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
            <div className="md:col-span-2"><Label>Address</Label><Input className="rounded-lg mt-1.5" required value={form.address} onChange={e => setForm({...form, address: e.target.value})} /></div>
            <div><Label>City</Label><Input className="rounded-lg mt-1.5" required value={form.city} onChange={e => setForm({...form, city: e.target.value})} /></div>
            <div><Label>Postal code</Label><Input className="rounded-lg mt-1.5" required value={form.zip} onChange={e => setForm({...form, zip: e.target.value})} /></div>
          </div>

          <h2 className="text-xl font-semibold pt-4">Payment</h2>
          <div className="rounded-xl border border-dashed border-border bg-[#FAFAFA] p-8 text-sm text-muted-foreground">
            Mock payment — no card needed. Click "Place order" to complete the demo purchase.
          </div>

          <Button type="submit" disabled={loading} size="lg" className="w-full rounded-pill">
            {loading ? "Placing…" : "Place order"}
          </Button>
        </form>

        <aside className="h-fit rounded-xl border border-border p-8">
          <h2 className="text-xl font-semibold">Order</h2>
          <div className="mt-6 divide-y divide-border">
            {items.map(i => (
              <div key={i.id} className="flex justify-between py-4 text-sm">
                <span>{i.product.name} × {i.quantity}</span>
                <span>{formatPrice(i.product.price * i.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-border flex justify-between pt-5 font-medium">
            <span>Total</span><span>{formatPrice(subtotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
