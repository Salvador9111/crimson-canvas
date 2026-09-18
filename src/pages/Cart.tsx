import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";
import { Minus, Plus, X, ArrowLeft, ShieldCheck, Truck, Sparkles, Tag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const FREE_SHIPPING_THRESHOLD = 100;

export default function Cart() {
  const { items, subtotal, update, remove } = useCart();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "ELEVATE15") {
      setDiscountPercent(0.15);
      toast.success("Promo code ELEVATE15 applied: 15% discount!");
    } else if (promoCode.trim()) {
      toast.error("Invalid discount code. Try ELEVATE15");
    }
  };

  const discountAmount = subtotal * discountPercent;
  const finalTotal = subtotal - discountAmount;
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="container-tight py-14 animate-fade-up">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Your Selection</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl text-charcoal-dark">
            Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
          </h1>
        </div>
        <Link
          to="/products"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-20 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white py-24 text-center">
          <p className="text-lg font-semibold text-charcoal-dark">Your bag is currently empty</p>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm leading-relaxed">
            Explore our crafted shirts, tees, and trousers to elevate your wardrobe.
          </p>
          <Button asChild className="mt-8 rounded-pill bg-primary px-8 text-xs font-bold uppercase tracking-wider text-white hover:bg-forest-hover">
            <Link to="/products">Browse Collection</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* Items Column */}
          <div className="space-y-6">
            {/* Free Shipping Progress Indicator (ChatGPT recommendation) */}
            <div className="rounded-2xl border border-border bg-secondary/50 p-4">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-primary">
                <Truck className="h-4 w-4" />
                {amountNeeded > 0 ? (
                  <span>Add <strong className="text-charcoal-dark">{formatPrice(amountNeeded)}</strong> more to unlock Free Global Shipping</span>
                ) : (
                  <span className="text-forest-light font-bold">🎉 You've unlocked Free Global Shipping!</span>
                )}
              </div>
              <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white">
                <div
                  className="h-full bg-primary transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* List of items */}
            <div className="divide-y divide-border rounded-2xl border border-border bg-white p-6 shadow-soft">
              {items.map(i => (
                <div key={i.id} className="flex gap-5 py-6 first:pt-0 last:pb-0">
                  <Link
                    to={`/products/${i.product.slug}`}
                    className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-secondary border border-border"
                  >
                    {i.product.image_url ? (
                      <img src={i.product.image_url} alt={i.product.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-secondary" />
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                          {i.product.category}
                        </p>
                        <Link
                          to={`/products/${i.product.slug}`}
                          className="text-base font-bold text-charcoal leading-tight hover:text-primary transition-colors"
                        >
                          {i.product.name}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">Standard Size · GOTS Cotton</p>
                      </div>
                      <button
                        onClick={() => remove(i.id)}
                        className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center rounded-pill border border-border bg-background">
                        <button
                          className="px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => update(i.id, i.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{i.quantity}</span>
                        <button
                          className="px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => update(i.id, i.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <p className="text-sm font-extrabold text-charcoal-dark">
                        {formatPrice(i.product.price * i.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Column */}
          <aside className="h-fit rounded-2xl border border-border bg-white p-6 shadow-soft space-y-6">
            <h2 className="text-xl font-bold text-charcoal-dark">Order Summary</h2>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-primary" /> Promo code
              </label>
              <div className="flex gap-2">
                <Input
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  placeholder="e.g. ELEVATE15"
                  className="rounded-pill text-xs border-border uppercase"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="outline"
                  className="rounded-pill text-xs font-semibold uppercase tracking-wider hover:bg-secondary"
                >
                  Apply
                </Button>
              </div>
            </form>

            <div className="space-y-3 border-t border-border pt-4 text-xs font-medium text-muted-foreground">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-foreground">{formatPrice(subtotal)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-primary font-semibold">
                  <span>Discount (15%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-foreground">
                  {amountNeeded === 0 ? "FREE" : "Calculated at checkout"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Duties</span>
                <span className="text-foreground">Included</span>
              </div>
            </div>

            <div className="border-t border-border pt-4 flex items-baseline justify-between">
              <div>
                <p className="text-base font-extrabold text-charcoal-dark">Total</p>
                <p className="text-[11px] text-muted-foreground">Including VAT</p>
              </div>
              <span className="text-2xl font-extrabold text-primary">{formatPrice(finalTotal)}</span>
            </div>

            <Button
              onClick={() => navigate("/checkout")}
              className="w-full rounded-pill bg-primary py-6 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-soft hover:bg-forest-hover transition-all"
            >
              Proceed to Checkout
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Encrypted Checkout · 30-Day Guarantee</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
