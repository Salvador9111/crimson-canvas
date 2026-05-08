import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/format";
import { Star, Truck, RotateCcw, ShieldCheck, Heart } from "lucide-react";
import { toast } from "sonner";

type Product = {
  id: string; slug: string; name: string; description: string; price: number;
  image_url: string | null; category: string; stock: number;
};

type Review = {
  id: string; rating: number; comment: string | null; created_at: string; user_id: string;
  profile?: { full_name: string | null; avatar_url: string | null } | null;
};

export default function ProductDetail() {
  const { slug } = useParams();
  const { add } = useCart();
  const { user } = useAuth();
  const [p, setP] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadReviews = async (productId: string) => {
    const { data } = await supabase
      .from("reviews")
      .select("id, rating, comment, created_at, user_id")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });
    if (!data) return;
    const userIds = [...new Set(data.map(r => r.user_id))];
    const { data: profs } = await supabase.from("profiles").select("id, full_name, avatar_url").in("id", userIds);
    const profMap = new Map((profs ?? []).map(p => [p.id, p]));
    setReviews(data.map(r => ({ ...r, profile: profMap.get(r.user_id) ?? null })));
  };

  useEffect(() => {
    if (!slug) return;
    supabase.from("products").select("*").eq("slug", slug).maybeSingle().then(({ data }) => {
      setP(data as Product);
      if (data) loadReviews(data.id);
    });
  }, [slug]);

  const submitReview = async () => {
    if (!user || !p) { toast.error("Please sign in"); return; }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").upsert({
      product_id: p.id, user_id: user.id, rating, comment,
    }, { onConflict: "product_id,user_id" });
    setSubmitting(false);
    if (error) return toast.error(error.message);
    toast.success("Review posted");
    setComment("");
    loadReviews(p.id);
  };

  if (!p) return (
    <div className="container-tight py-24">
      <div className="grid gap-16 md:grid-cols-2">
        <div className="aspect-[4/5] rounded-lg shimmer" />
        <div className="space-y-6">
          <div className="h-4 w-20 rounded shimmer" />
          <div className="h-10 w-64 rounded shimmer" />
          <div className="h-8 w-28 rounded shimmer" />
          <div className="h-20 w-full rounded shimmer mt-8" />
        </div>
      </div>
    </div>
  );

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="container-tight py-16 animate-fade-up">
      <nav className="mb-10 text-sm text-muted-foreground">
        <Link to="/products" className="transition-colors duration-200 hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <span className="capitalize">{p.category}</span>
      </nav>

      {/* Product layout — left image, right info, 64px gap per DESIGN.md */}
      <div className="grid gap-16 md:grid-cols-2">
        {/* Image — 16px radius per DESIGN.md */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary group">
          {p.image_url && <img src={p.image_url} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />}
          {/* Wishlist icon */}
          <button className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-soft transition-transform duration-200 hover:scale-110" aria-label="Add to wishlist">
            <Heart className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Product info panel — luxurious spacing per DESIGN.md */}
        <div className="flex flex-col">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{p.category}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{p.name}</h1>
          <p className="mt-4 text-2xl font-medium">{formatPrice(p.price)}</p>

          {reviews.length > 0 && (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`h-4 w-4 ${i <= Math.round(avg) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-border"}`} strokeWidth={1.5} />
                ))}
              </div>
              <span>{avg.toFixed(1)} · {reviews.length} review{reviews.length === 1 ? "" : "s"}</span>
            </div>
          )}

          <p className="mt-10 text-sm text-muted-foreground leading-relaxed">{p.description}</p>

          {/* Add to bag — pill button per DESIGN.md */}
          <div className="mt-12 flex items-center gap-4">
            <Button size="lg" disabled={p.stock <= 0} onClick={() => add(p.id)} className="rounded-pill px-12">
              {p.stock > 0 ? "Add to bag" : "Sold out"}
            </Button>
            <span className="text-sm text-muted-foreground">{p.stock > 0 ? `${p.stock} in stock` : ""}</span>
          </div>

          {/* Trust indicators — Khazanay-inspired */}
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {[
              { icon: Truck, label: "Free Shipping", desc: "Over $150" },
              { icon: RotateCcw, label: "30-Day Returns", desc: "Easy process" },
              { icon: ShieldCheck, label: "Authentic", desc: "Guaranteed" },
            ].map(item => (
              <div key={item.label} className="text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-khazanay-yellow/20">
                  <item.icon className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <p className="mt-2 text-xs font-medium">{item.label}</p>
                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <section className="mt-24">
        <h2 className="text-section">Reviews</h2>

        {user && (
          <div className="mt-8 max-w-2xl rounded-xl border border-border p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Your review</p>
            <div className="mt-4 flex gap-1">
              {[1,2,3,4,5].map(i => (
                <button key={i} onClick={() => setRating(i)} aria-label={`Rate ${i}`}>
                  <Star className={`h-6 w-6 ${i <= rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-muted-foreground"}`} strokeWidth={1.5} />
                </button>
              ))}
            </div>
            <Textarea className="mt-4 rounded-lg" rows={3} placeholder="What did you think?" value={comment} onChange={e => setComment(e.target.value)} />
            <Button onClick={submitReview} disabled={submitting} className="mt-4 rounded-pill">Post review</Button>
          </div>
        )}

        <div className="mt-10 space-y-8">
          {reviews.length === 0 && <p className="text-muted-foreground">No reviews yet.</p>}
          {reviews.map(r => (
            <div key={r.id} className="border-b border-border pb-6">
              <div className="flex items-center gap-3">
                <p className="font-medium">{r.profile?.full_name || "Anonymous"}</p>
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i <= r.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-border"}`} strokeWidth={1.5} />
                  ))}
                </div>
                <p className="ml-auto text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</p>
              </div>
              {r.comment && <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
