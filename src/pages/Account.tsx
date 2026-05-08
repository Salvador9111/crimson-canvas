import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPrice } from "@/lib/format";
import { Star } from "lucide-react";
import { toast } from "sonner";

type Profile = { full_name: string | null; avatar_url: string | null };
type Order = { id: string; total: number; status: string; created_at: string; order_items: any[] };
type Review = { id: string; rating: number; comment: string | null; created_at: string; product: { name: string; slug: string } };

export default function Account() {
  const { user, signOut } = useAuth();
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") ?? "profile";
  const [profile, setProfile] = useState<Profile>({ full_name: "", avatar_url: "" });
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name, avatar_url").eq("id", user.id).maybeSingle()
      .then(({ data }) => data && setProfile(data));
    supabase.from("orders").select("id,total,status,created_at, order_items(*)").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setOrders((data ?? []) as any));
    supabase.from("reviews").select("id,rating,comment,created_at, product:products(name,slug)").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setReviews((data ?? []) as any));
  }, [user]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update(profile).eq("id", user.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Profile updated");
  };

  return (
    <div className="container-tight py-16 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Account</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{profile.full_name || user?.email}</h1>
        </div>
        <Button variant="outline" className="rounded-pill" onClick={signOut}>Sign out</Button>
      </div>

      <Tabs value={tab} onValueChange={v => setParams({ tab: v }, { replace: true })} className="mt-12">
        <TabsList className="rounded-pill bg-[#F5F5F5]">
          <TabsTrigger value="profile" className="rounded-pill">Profile</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-pill">Orders</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-pill">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-10 max-w-xl space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.avatar_url ?? undefined} />
              <AvatarFallback className="bg-secondary text-foreground">{(profile.full_name || user?.email || "?").charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <div><Label>Full name</Label><Input className="rounded-lg mt-1.5" value={profile.full_name ?? ""} onChange={e => setProfile({...profile, full_name: e.target.value})} /></div>
          <div><Label>Avatar URL</Label><Input className="rounded-lg mt-1.5" placeholder="https://…" value={profile.avatar_url ?? ""} onChange={e => setProfile({...profile, avatar_url: e.target.value})} /></div>
          <Button onClick={save} disabled={saving} className="rounded-pill">{saving ? "Saving…" : "Save"}</Button>
        </TabsContent>

        <TabsContent value="orders" className="mt-10 space-y-6">
          {orders.length === 0 && <p className="text-muted-foreground">No orders yet.</p>}
          {orders.map(o => (
            <div key={o.id} className="rounded-xl border border-border p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Order #{o.id.slice(0,8)}</p>
                  <p className="text-sm mt-1">{new Date(o.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground">{o.status}</p>
                  <p className="text-base font-medium">{formatPrice(o.total)}</p>
                </div>
              </div>
              <div className="mt-6 border-t border-border divide-y divide-border">
                {o.order_items?.map((it: any) => (
                  <div key={it.id} className="flex items-center gap-4 py-4 text-sm">
                    {it.product_image && <img src={it.product_image} alt={it.product_name} className="h-14 w-12 rounded-lg object-cover" />}
                    <span className="flex-1">{it.product_name} × {it.quantity}</span>
                    <span>{formatPrice(it.price * it.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="reviews" className="mt-10 space-y-6">
          {reviews.length === 0 && <p className="text-muted-foreground">You haven't written any reviews.</p>}
          {reviews.map(r => (
            <div key={r.id} className="border-b border-border pb-6">
              <div className="flex items-center justify-between">
                <Link to={`/products/${r.product.slug}`} className="text-base font-medium transition-opacity duration-300 hover:opacity-60">{r.product.name}</Link>
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className={`h-3.5 w-3.5 ${i <= r.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-border"}`} strokeWidth={1.5} />)}
                </div>
              </div>
              {r.comment && <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
