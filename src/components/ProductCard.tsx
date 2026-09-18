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
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <Link to={`/products/${p.slug}`} className="block h-full w-full" tabIndex={-1} aria-hidden="true">
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
        </Link>

        {/* Soft Sage Badge */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="rounded-pill bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary shadow-soft backdrop-blur-sm">
            {badgeText}
          </span>
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={e => {
            e.preventDefault();
            toggleWishlist(p);
          }}
          className={`absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 shadow-soft backdrop-blur-sm ${
            isFavorited
              ? "bg-primary text-white scale-105"
              : "bg-white/90 text-foreground/70 hover:text-primary hover:bg-white hover:scale-110"
          }`}
          aria-label={isFavorited ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? "fill-white" : ""}`} strokeWidth={2} />
        </button>
      </div>

      {/* Product Information & Action Area */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold capitalize tracking-wide text-primary/80">{p.category}</span>
          <span className="text-xs font-medium text-muted-foreground tracking-wide">In Stock</span>
        </div>

        <Link
          to={`/products/${p.slug}`}
          className="mt-2 text-base font-semibold text-charcoal leading-snug transition-colors hover:text-primary focus-visible:underline"
        >
          {p.name}
        </Link>

        {/* Bottom Bar: Price and Quick Add */}
        <div className="mt-4 flex items-center justify-between gap-3 pt-2">
          <p className="text-base font-bold text-charcoal-dark">{formatPrice(p.price)}</p>
          <Button
            onClick={() => add(p.id)}
            size="sm"
            className="rounded-pill bg-secondary text-primary hover:bg-primary hover:text-white px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors shadow-none"
            aria-label={`Quick add ${p.name} to bag`}
          >
            <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
            Quick Add
          </Button>
        </div>
      </div>
    </div>
  );
}
