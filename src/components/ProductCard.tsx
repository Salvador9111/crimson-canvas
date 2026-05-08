import { Link } from "react-router-dom";
import { formatPrice } from "@/lib/format";

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
      <div className="aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
        {p.image_url ? (
          <img
            src={p.image_url}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : <div className="h-full w-full bg-muted" />}
      </div>
      <div className="mt-4 space-y-1">
        {/* Brand — small uppercase, muted color per DESIGN.md */}
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{p.category}</p>
        {/* Product name — medium weight, tight spacing per DESIGN.md */}
        <p className="text-base font-medium leading-tight">{p.name}</p>
        {/* Price — slightly emphasized, no bright colors per DESIGN.md */}
        <p className="text-sm text-[#666666]">{formatPrice(p.price)}</p>
      </div>
    </Link>
  );
}
