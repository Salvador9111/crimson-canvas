import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/format";
import { Star } from "lucide-react";
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

  if (!p) return <div className="container-tight py-24 text-muted-foreground">Loading…</div>;

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="container-tight py-12">
      <nav className="uppercase-tracked mb-8 text-muted-foreground">
        <Link to="/products" className="hover:text-primary">Shop</Link> / <span>{p.category}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="aspect-[4/5] overflow-hidden bg-secondary">
          {p.image_url && <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />}
        </div>
        <div>
          <p className="uppercase-tracked text-primary">{p.category}</p>
          <h1 className="font-display mt-2 text-4xl md:text-5xl">{p.name}</h1>
          <p className="mt-3 text-2xl">{formatPrice(p.price)}</p>

          {reviews.length > 0 && (
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`h-4 w-4 ${i <= Math.round(avg) ? "fill-accent text-accent" : "text-muted"}`} />
                ))}
              </div>
              <span>{avg.toFixed(1)} · {reviews.length} review{reviews.length === 1 ? "" : "s"}</span>
            </div>
          )}

          <p className="mt-8 text-muted-foreground">{p.description}</p>

          <div className="mt-10 flex items-center gap-4">
            <Button size="lg" disabled={p.stock <= 0} onClick={() => add(p.id)} className="rounded-none px-10">
              {p.stock > 0 ? "Add to bag" : "Sold out"}
            </Button>
            <span className="text-sm text-muted-foreground">{p.stock > 0 ? `${p.stock} in stock` : ""}</span>
          </div>

          <div className="mt-10 hairline pt-6 text-sm text-muted-foreground">
            Free shipping over $150 · 30-day returns · Made in Portugal.
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-24">
        <h2 className="font-display text-3xl">Reviews</h2>

        {user && (
          <div className="mt-6 max-w-2xl border border-border p-6">
            <p className="uppercase-tracked text-muted-foreground">Your review</p>
            <div className="mt-3 flex gap-1">
              {[1,2,3,4,5].map(i => (
                <button key={i} onClick={() => setRating(i)} aria-label={`Rate ${i}`}>
                  <Star className={`h-6 w-6 ${i <= rating ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                </button>
              ))}
            </div>
            <Textarea className="mt-3 rounded-none" rows={3} placeholder="What did you think?" value={comment} onChange={e => setComment(e.target.value)} />
            <Button onClick={submitReview} disabled={submitting} className="mt-3 rounded-none">Post review</Button>
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
                    <Star key={i} className={`h-3.5 w-3.5 ${i <= r.rating ? "fill-accent text-accent" : "text-muted"}`} />
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
