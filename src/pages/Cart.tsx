import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { Minus, Plus, X } from "lucide-react";

export default function Cart() {
  const { items, subtotal, update, remove } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container-tight py-16 animate-fade-up">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Your bag</h1>

      {items.length === 0 ? (
        <div className="mt-20 text-center">
          <p className="text-muted-foreground">Your bag is empty.</p>
          <Button asChild className="mt-8 rounded-pill px-8"><Link to="/products">Continue shopping</Link></Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 md:grid-cols-[1fr_360px]">
          <div className="border-t border-border divide-y divide-border">
            {items.map(i => (
              <div key={i.id} className="flex gap-6 py-8">
                <Link to={`/products/${i.product.slug}`} className="block h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-secondary">
                  {i.product.image_url && <img src={i.product.image_url} alt={i.product.name} className="h-full w-full object-cover" />}
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <Link to={`/products/${i.product.slug}`} className="text-base font-medium">{i.product.name}</Link>
                    <button onClick={() => remove(i.id)} aria-label="Remove"><X className="h-4 w-4 text-muted-foreground transition-colors duration-200 hover:text-foreground" strokeWidth={1.5} /></button>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatPrice(i.product.price)}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-pill border border-border">
                      <button className="px-3 py-2 transition-colors duration-200 hover:bg-[#F2F2F2] rounded-l-pill" onClick={() => update(i.id, i.quantity - 1)}><Minus className="h-3 w-3" strokeWidth={1.5} /></button>
                      <span className="px-4 text-sm font-medium">{i.quantity}</span>
                      <button className="px-3 py-2 transition-colors duration-200 hover:bg-[#F2F2F2] rounded-r-pill" onClick={() => update(i.id, i.quantity + 1)}><Plus className="h-3 w-3" strokeWidth={1.5} /></button>
                    </div>
                    <p className="text-sm font-medium">{formatPrice(i.product.price * i.quantity)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-xl border border-border p-8">
            <h2 className="text-xl font-semibold">Summary</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="text-muted-foreground">Calculated at checkout</span></div>
            </div>
            <div className="mt-6 border-t border-border flex justify-between pt-5 text-base font-medium">
              <span>Total</span><span>{formatPrice(subtotal)}</span>
            </div>
            <Button onClick={() => navigate("/checkout")} className="mt-6 w-full rounded-pill">Checkout</Button>
          </aside>
        </div>
      )}
    </div>
  );
}
