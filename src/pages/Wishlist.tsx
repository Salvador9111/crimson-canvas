import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { add } = useCart();

  const handleMoveToCart = (item: any) => {
    add(item.id);
    removeFromWishlist(item.id);
    toast.success(`Moved ${item.name} to your bag`);
  };

  return (
    <div className="container-tight py-16 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Curated by you</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Your Wishlist</h1>
        </div>
        <Link to="/products" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Continue shopping
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="mt-20 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white/50 py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
            <Heart className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <h2 className="mt-6 text-xl font-semibold">Your wishlist is empty</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">
            Save pieces you love as you browse and they'll be kept here for easy access.
          </p>
          <Button asChild className="mt-8 rounded-pill bg-primary px-8 hover:bg-forest-hover">
            <Link to="/products">Explore collection</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-stagger">
          {wishlist.map(item => (
            <div key={item.id} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-soft">
              <Link to={`/products/${item.slug}`} className="relative aspect-[4/5] overflow-hidden bg-secondary">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-secondary" />
                )}
                <button
                  onClick={e => {
                    e.preventDefault();
                    removeFromWishlist(item.id);
                  }}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-muted-foreground shadow-soft transition-colors hover:text-destructive"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{item.category}</p>
                <Link to={`/products/${item.slug}`} className="mt-1 text-base font-semibold leading-snug transition-colors hover:text-primary">
                  {item.name}
                </Link>
                <p className="mt-2 text-sm font-medium text-foreground">{formatPrice(item.price)}</p>
                <div className="mt-auto pt-5">
                  <Button
                    onClick={() => handleMoveToCart(item)}
                    size="sm"
                    className="w-full rounded-pill bg-primary text-xs font-medium uppercase tracking-[0.1em] hover:bg-forest-hover"
                  >
                    <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
                    Move to Bag
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
