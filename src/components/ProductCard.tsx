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
      <div className="aspect-[4/5] overflow-hidden bg-secondary">
        {p.image_url ? (
          <img
            src={p.image_url}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : <div className="h-full w-full bg-muted" />}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-2">
        <div>
          <p className="font-display text-lg leading-tight">{p.name}</p>
          <p className="uppercase-tracked text-muted-foreground">{p.category}</p>
        </div>
        <p className="text-sm">{formatPrice(p.price)}</p>
      </div>
    </Link>
  );
}
