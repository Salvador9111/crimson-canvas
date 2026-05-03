import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { Minus, Plus, X } from "lucide-react";

export default function Cart() {
  const { items, subtotal, update, remove } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container-tight py-12">
      <h1 className="font-display text-4xl md:text-5xl">Your bag</h1>

      {items.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">Your bag is empty.</p>
          <Button asChild className="mt-6 rounded-none"><Link to="/products">Continue shopping</Link></Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 md:grid-cols-[1fr_360px]">
          <div className="hairline divide-y divide-border">
            {items.map(i => (
              <div key={i.id} className="flex gap-6 py-6">
                <Link to={`/products/${i.product.slug}`} className="block h-32 w-24 shrink-0 overflow-hidden bg-secondary">
                  {i.product.image_url && <img src={i.product.image_url} alt={i.product.name} className="h-full w-full object-cover" />}
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <Link to={`/products/${i.product.slug}`} className="font-display text-xl">{i.product.name}</Link>
                    <button onClick={() => remove(i.id)} aria-label="Remove"><X className="h-4 w-4 text-muted-foreground hover:text-foreground" /></button>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatPrice(i.product.price)}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border border-border">
                      <button className="px-3 py-1.5" onClick={() => update(i.id, i.quantity - 1)}><Minus className="h-3 w-3" /></button>
                      <span className="px-4 text-sm">{i.quantity}</span>
                      <button className="px-3 py-1.5" onClick={() => update(i.id, i.quantity + 1)}><Plus className="h-3 w-3" /></button>
                    </div>
                    <p className="text-sm">{formatPrice(i.product.price * i.quantity)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit border border-border p-6">
            <h2 className="font-display text-2xl">Summary</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="text-muted-foreground">Calculated at checkout</span></div>
            </div>
            <div className="hairline mt-6 flex justify-between pt-4 text-base">
              <span>Total</span><span>{formatPrice(subtotal)}</span>
            </div>
            <Button onClick={() => navigate("/checkout")} className="mt-6 w-full rounded-none">Checkout</Button>
          </aside>
        </div>
      )}
    </div>
  );
}
