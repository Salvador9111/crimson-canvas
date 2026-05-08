import { Link } from "react-router-dom";
import { formatPrice } from "@/lib/format";
import { Heart, ShoppingBag } from "lucide-react";

export type ProductCardItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image_url: string | null;
  category: string;
};

export default function ProductCard({ p }: { p: ProductCardItem }) {
  return (
    <Link to={`/products/${p.slug}`} className="group block">
      {/* Image — 4:5 aspect, 16px radius, slight zoom on hover per DESIGN.md */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
        {p.image_url ? (
          <img
            src={p.image_url}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : <div className="h-full w-full bg-muted shimmer" />}

        {/* Hover overlay — wishlist + quick add per DESIGN.md */}
        <div className="absolute inset-0 flex flex-col items-end justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {/* Wishlist heart icon */}
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-soft transition-transform duration-200 hover:scale-110"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4" strokeWidth={1.5} />
          </button>

          {/* Quick add button */}
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); }}
            className="w-full rounded-pill bg-foreground/90 backdrop-blur-sm py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-background transition-all duration-200 hover:bg-foreground"
          >
            <span className="flex items-center justify-center gap-1.5">
              <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
              Quick add
            </span>
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        {/* Brand — small uppercase, muted color per DESIGN.md */}
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{p.category}</p>
        {/* Product name — medium weight, tight spacing per DESIGN.md */}
        <p className="text-base font-medium leading-tight">{p.name}</p>
        {/* Price — slightly emphasized, no bright colors per DESIGN.md */}
        <p className="text-sm font-medium text-[#666666]">{formatPrice(p.price)}</p>
      </div>
    </Link>
  );
}
