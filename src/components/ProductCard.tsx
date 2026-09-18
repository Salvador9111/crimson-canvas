import { Link } from "react-router-dom";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ProductCardItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image_url: string | null;
  category: string;
  rating?: number;
  reviews_count?: number;
  badge?: string;
};

export default function ProductCard({ p }: { p: ProductCardItem }) {
  const { add } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(p.id);
  const badgeText = p.badge ?? (p.price > 80 ? "BESTSELLER" : "NEW ARRIVAL");

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-white transition-all duration-300 hover:border-primary/40 hover:shadow-card">
      {/* Image container — 4:5 aspect */}
      <Link to={`/products/${p.slug}`} className="relative aspect-[4/5] overflow-hidden bg-secondary">
        {p.image_url ? (
          <img
            src={p.image_url}
            alt={p.name}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-secondary/80 animate-pulse" />
        )}

        {/* Soft Sage Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="rounded-pill bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary shadow-soft backdrop-blur-sm">
            {badgeText}
          </span>
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(p);
          }}
          className={`absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 shadow-soft backdrop-blur-sm ${
            isFavorited
              ? "bg-primary text-white scale-105"
              : "bg-white/90 text-foreground/70 hover:text-primary hover:bg-white hover:scale-110"
          }`}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? "fill-white" : ""}`} strokeWidth={2} />
        </button>

        {/* Slide-up Quick Add Action on hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              add(p.id);
            }}
            size="sm"
            className="w-full rounded-pill bg-primary/95 text-white shadow-soft backdrop-blur-md hover:bg-primary py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition-all"
          >
            <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
            Quick Add
          </Button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold uppercase tracking-[0.16em] text-primary/80">{p.category}</span>
        </div>

        <Link
          to={`/products/${p.slug}`}
          className="mt-2 text-base font-semibold text-charcoal leading-snug transition-colors hover:text-primary"
        >
          {p.name}
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-base font-bold text-charcoal-dark">{formatPrice(p.price)}</p>
          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">In Stock</span>
        </div>
      </div>
    </div>
  );
}
