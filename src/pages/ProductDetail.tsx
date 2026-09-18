import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/format";
import ProductCard, { ProductCardItem } from "@/components/ProductCard";
import {
  Star, Truck, RotateCcw, ShieldCheck, Heart, Minus, Plus,
  Ruler, Check, Share2, Sparkles, ChevronRight
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { getInitialProductBySlug, INITIAL_PRODUCTS } from "@/lib/products";

type Product = {
  id: string; slug: string; name: string; description: string; price: number;
  image_url: string | null; category: string; stock: number;
};

type Review = {
  id: string; rating: number; comment: string | null; created_at: string; user_id: string;
  profile?: { full_name: string | null; avatar_url: string | null } | null;
};

const SIZES = ["S", "M", "L", "XL", "XXL"];
const COLORS = [
  { name: "Forest Green", hex: "#526653" },
  { name: "Soft Sage", hex: "#C4D4C4" },
  { name: "Bone White", hex: "#F3F3ED" },
  { name: "Charcoal Earth", hex: "#2E312F" },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const { add } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Instantly initialize from cache so there is zero skeleton lag
  const [p, setP] = useState<Product | null>(() => (slug ? (getInitialProductBySlug(slug) as any) ?? null : null));
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ChatGPT features
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<ProductCardItem[]>(() => {
    if (!slug) return [];
    const init = getInitialProductBySlug(slug);
    if (!init) return [];
    return INITIAL_PRODUCTS.filter(item => item.category === init.category && item.slug !== init.slug) as any;
  });

  const loadReviews = async (productId: string) => {
    const { data } = await supabase
      .from("reviews")
      .select("id, rating, comment, created_at, user_id")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });
    if (!data) return;
    const userIds = [...new Set(data.map(r => r.user_id))];
    const { data: profs } = await supabase.from("profiles").select("id, full_name, avatar_url").in("id", userIds);
    const profMap = new Map((profs ?? []).map(pr => [pr.id, pr]));
    setReviews(data.map(r => ({ ...r, profile: profMap.get(r.user_id) ?? null })));
  };

  useEffect(() => {
    if (!slug) return;
    // Immediate synchronous sync
    const initial = getInitialProductBySlug(slug);
    if (initial) {
      setP(initial as any);
      const related = INITIAL_PRODUCTS.filter(item => item.category === initial.category && item.slug !== initial.slug);
      setRelatedProducts(related as any);
    }

    supabase.from("products").select("*").eq("slug", slug).maybeSingle().then(({ data }) => {
      if (data) {
        setP(data as Product);
        loadReviews(data.id);
        supabase.from("products")
          .select("id,slug,name,price,image_url,category")
          .eq("category", data.category)
          .neq("id", data.id)
          .limit(4)
          .then(({ data: rel }) => {
            if (rel && rel.length > 0) setRelatedProducts(rel as any);
          });
      }
    });
  }, [slug]);

  const submitReview = async () => {
    if (!user || !p) { toast.error("Please sign in to write a review"); return; }
    if (!comment.trim()) { toast.error("Please write a comment"); return; }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").upsert({
      product_id: p.id, user_id: user.id, rating, comment,
    }, { onConflict: "product_id,user_id" });
    setSubmitting(false);
    if (error) return toast.error(error.message);
    toast.success("Review posted successfully!");
    setComment("");
    loadReviews(p.id);
  };

  const handleAddToCart = () => {
    if (!p) return;
    for (let i = 0; i < quantity; i++) {
      add(p.id);
    }
    toast.success(`Added ${quantity}x ${p.name} (${selectedSize} / ${selectedColor.name}) to your bag`);
  };

  const handleBuyNow = () => {
    if (!p) return;
    for (let i = 0; i < quantity; i++) {
      add(p.id);
    }
    navigate("/checkout");
  };

  if (!p) return (
    <div className="container-tight py-24">
      <div className="grid gap-16 md:grid-cols-2">
        <div className="aspect-[4/5] rounded-2xl bg-secondary animate-pulse" />
        <div className="space-y-6">
          <div className="h-4 w-24 rounded bg-secondary animate-pulse" />
          <div className="h-10 w-72 rounded bg-secondary animate-pulse" />
          <div className="h-8 w-32 rounded bg-secondary animate-pulse" />
          <div className="h-28 w-full rounded bg-secondary animate-pulse mt-8" />
        </div>
      </div>
    </div>
  );

  const isFavorited = isInWishlist(p.id);
  const hasReviews = reviews.length > 0;
  const avg = hasReviews ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const reviewCount = reviews.length;

  // Multiple angles/views gallery
  const gallery = [
    p.image_url ?? "/products/p-shirt-1.jpg",
    p.image_url ? p.image_url.replace("-1.jpg", "-2.jpg") : "/products/p-shirt-2.jpg",
    "/products/p-trouser-1.jpg",
  ];

  return (
    <div className="container-tight py-12 animate-fade-up">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/products" className="hover:text-primary transition-colors">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={`/products?category=${p.category}`} className="capitalize hover:text-primary transition-colors">
          {p.category}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground truncate max-w-xs">{p.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnail list */}
          <div className="flex md:flex-col gap-3 overflow-x-auto pb-2 md:pb-0">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                  activeImageIndex === idx
                    ? "border-primary shadow-soft scale-102"
                    : "border-border/70 hover:border-primary/50 opacity-75 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`${p.name} angle ${idx + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Hero Image */}
          <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-2xl bg-secondary border border-border shadow-soft group">
            <img
              src={gallery[activeImageIndex] || gallery[0]}
              alt={p.name}
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Wishlist button */}
            <button
              onClick={() => toggleWishlist(p as any)}
              className={`absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full shadow-soft backdrop-blur-md transition-transform duration-200 hover:scale-110 ${
                isFavorited ? "bg-primary text-white" : "bg-white/90 text-foreground/70 hover:text-primary"
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart className={`h-5 w-5 ${isFavorited ? "fill-white" : ""}`} strokeWidth={1.75} />
            </button>
            <div className="absolute top-4 left-4">
              <span className="rounded-pill bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary shadow-soft backdrop-blur-sm">
                Sustainable Craft
              </span>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="border-b border-border pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {p.category}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl text-charcoal-dark">
              {p.name}
            </h1>

            {/* Price & Rating */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-charcoal-dark">{formatPrice(p.price)}</span>
                <span className="text-sm text-muted-foreground line-through">{formatPrice(p.price * 1.2)}</span>
                <span className="rounded-pill bg-secondary px-2.5 py-0.5 text-xs font-bold text-primary">
                  SAVE 20%
                </span>
              </div>
              {hasReviews && (
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i <= Math.round(avg) ? "fill-[#E5A93C] text-[#E5A93C]" : "text-border"}`}
                      />
                    ))}
                  </div>
                  <span className="text-foreground font-semibold">{avg.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">({reviewCount})</span>
                </div>
              )}
            </div>
          </div>

          {/* Color Selector */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
              <span>Color: <span className="text-primary font-bold">{selectedColor.name}</span></span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              {COLORS.map(col => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(col)}
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-transform ${
                    selectedColor.name === col.name ? "ring-2 ring-primary ring-offset-2 scale-110" : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                >
                  {selectedColor.name === col.name && (
                    <Check className={`h-4 w-4 ${col.hex === "#F3F3ED" ? "text-black" : "text-white"}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector with Size Guide Modal */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Select Size: <span className="text-primary font-bold">{selectedSize}</span>
              </span>

              {/* Size Guide Modal (ChatGPT requirement) */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-forest-hover transition-colors">
                    <Ruler className="h-3.5 w-3.5" />
                    <span>Size Guide</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-md rounded-2xl p-6">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Garment Measurement Guide</DialogTitle>
                  </DialogHeader>
                  <p className="text-xs text-muted-foreground mt-1">
                    All measurements in inches. Fits true to standard modern tailoring.
                  </p>
                  <div className="mt-4 overflow-hidden rounded-xl border border-border">
                    <table className="w-full text-xs text-center">
                      <thead className="bg-secondary text-primary font-semibold">
                        <tr>
                          <th className="py-2.5 px-3">Size</th>
                          <th className="py-2.5 px-3">Chest</th>
                          <th className="py-2.5 px-3">Waist</th>
                          <th className="py-2.5 px-3">Length</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {[
                          { s: "S", c: '36" - 38"', w: '30" - 32"', l: '28.5"' },
                          { s: "M", c: '39" - 41"', w: '32" - 34"', l: '29.5"' },
                          { s: "L", c: '42" - 44"', w: '35" - 37"', l: '30.5"' },
                          { s: "XL", c: '45" - 47"', w: '38" - 40"', l: '31.5"' },
                          { s: "XXL", c: '48" - 50"', w: '41" - 43"', l: '32.0"' },
                        ].map(row => (
                          <tr key={row.s} className={selectedSize === row.s ? "bg-secondary/40 font-bold text-primary" : ""}>
                            <td className="py-2.5 px-3 font-semibold">{row.s}</td>
                            <td className="py-2.5 px-3">{row.c}</td>
                            <td className="py-2.5 px-3">{row.w}</td>
                            <td className="py-2.5 px-3">{row.l}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Size Buttons */}
            <div className="mt-3 grid grid-cols-5 gap-2.5">
              {SIZES.map(sz => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`rounded-xl py-3 text-xs font-bold uppercase transition-all duration-200 border ${
                    selectedSize === sz
                      ? "bg-primary text-white border-primary shadow-soft"
                      : "bg-white text-foreground border-border hover:border-primary/50 hover:bg-secondary/40"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-4">
              {/* Quantity Counter */}
              <div className="flex items-center rounded-pill border border-border bg-white px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <Button
                size="lg"
                disabled={p.stock <= 0}
                onClick={handleAddToCart}
                className="flex-1 rounded-pill bg-primary py-6 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-soft hover:bg-forest-hover transition-all"
              >
                {p.stock > 0 ? "Add to Bag" : "Sold Out"}
              </Button>
            </div>

            {/* Buy Now Button */}
            {p.stock > 0 && (
              <Button
                size="lg"
                variant="outline"
                onClick={handleBuyNow}
                className="w-full rounded-pill border-border bg-white py-6 text-xs font-bold uppercase tracking-[0.14em] text-foreground hover:bg-secondary transition-all"
              >
                Buy Now
              </Button>
            )}
          </div>

          {/* Description & Details Accordions */}
          <div className="mt-8 space-y-4 text-sm text-muted-foreground border-t border-border pt-6 leading-relaxed">
            <p>{p.description}</p>

            <div className="rounded-xl bg-secondary/50 p-4 text-xs space-y-2 border border-border/60">
              <div className="flex items-center gap-2 font-semibold text-charcoal-dark">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Fabric & Garment Care</span>
              </div>
              <p>• 100% GOTS-Certified Pre-washed Organic Cotton</p>
              <p>• Machine wash cold on gentle cycle with similar shades</p>
              <p>• Line dry in shade; warm iron if required</p>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6 text-center">
            {[
              { icon: Truck, t: "Free Delivery", d: "Over $100" },
              { icon: RotateCcw, t: "Easy Returns", d: "30 days" },
              { icon: ShieldCheck, t: "Ethical Craft", d: "Zero sweatshops" },
            ].map(col => (
              <div key={col.t} className="rounded-xl bg-white p-3 border border-border/80">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary">
                  <col.icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <p className="mt-2 text-xs font-bold text-foreground">{col.t}</p>
                <p className="text-[11px] text-muted-foreground">{col.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="mt-24 border-t border-border pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Customer Satisfaction</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-charcoal-dark">Verified Reviews</h2>
          </div>

          {hasReviews && (
            <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-border shadow-soft">
              <div className="text-3xl font-extrabold text-charcoal-dark">{avg.toFixed(1)}</div>
              <div>
                <div className="flex text-[#E5A93C]">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Based on {reviewCount} customer {reviewCount === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Review Form */}
        <div className="rounded-2xl border border-border bg-white p-6 md:p-8 mb-12 shadow-soft">
          <h3 className="text-lg font-bold text-foreground">Write a Review</h3>
          <p className="text-xs text-muted-foreground mt-1">Share your experience regarding sizing, fabric hand-feel, and longevity.</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs font-semibold">Your Rating:</span>
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 text-[#E5A93C] hover:scale-125 transition-transform"
              >
                <Star className={`h-5 w-5 ${star <= rating ? "fill-current" : "text-border"}`} />
              </button>
            ))}
          </div>
          <Textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Describe the fit, drape, and everyday comfort..."
            className="mt-4 rounded-xl border-border resize-none"
            rows={3}
          />
          <div className="mt-4 flex justify-end">
            <Button
              onClick={submitReview}
              disabled={submitting}
              className="rounded-pill bg-primary text-xs font-bold uppercase tracking-wider text-white hover:bg-forest-hover px-6"
            >
              {submitting ? "Publishing..." : "Submit Review"}
            </Button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Be the first to review this garment!
            </div>
          ) : (
            reviews.map(r => (
              <div key={r.id} className="rounded-2xl border border-border bg-white p-6 shadow-soft space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary font-bold text-xs">
                      {r.profile?.full_name ? r.profile.full_name.charAt(0) : "C"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {r.profile?.full_name ?? "Verified Buyer"}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="flex text-[#E5A93C]">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i <= r.rating ? "fill-current" : "text-border"}`} />
                    ))}
                  </div>
                </div>
                {r.comment && <p className="text-sm text-muted-foreground pt-1">{r.comment}</p>}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Related Products Showcase */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 border-t border-border pt-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Complete The Look</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-charcoal-dark">You May Also Like</h2>
            </div>
            <Link to="/products" className="text-xs font-bold uppercase tracking-wider text-primary hover:opacity-75 transition-opacity">
              View all →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} p={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
