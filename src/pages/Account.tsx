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
    <div className="container-tight py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="uppercase-tracked text-primary">Account</p>
          <h1 className="font-display mt-2 text-4xl md:text-5xl">{profile.full_name || user?.email}</h1>
        </div>
        <Button variant="outline" className="rounded-none" onClick={signOut}>Sign out</Button>
      </div>

      <Tabs value={tab} onValueChange={v => setParams({ tab: v }, { replace: true })} className="mt-10">
        <TabsList className="rounded-none">
          <TabsTrigger value="profile" className="rounded-none">Profile</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-none">Orders</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-none">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-8 max-w-xl space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.avatar_url ?? undefined} />
              <AvatarFallback>{(profile.full_name || user?.email || "?").charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <div><Label>Full name</Label><Input className="rounded-none" value={profile.full_name ?? ""} onChange={e => setProfile({...profile, full_name: e.target.value})} /></div>
          <div><Label>Avatar URL</Label><Input className="rounded-none" placeholder="https://…" value={profile.avatar_url ?? ""} onChange={e => setProfile({...profile, avatar_url: e.target.value})} /></div>
          <Button onClick={save} disabled={saving} className="rounded-none">{saving ? "Saving…" : "Save"}</Button>
        </TabsContent>

        <TabsContent value="orders" className="mt-8 space-y-6">
          {orders.length === 0 && <p className="text-muted-foreground">No orders yet.</p>}
          {orders.map(o => (
            <div key={o.id} className="border border-border p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="uppercase-tracked text-muted-foreground">Order #{o.id.slice(0,8)}</p>
                  <p className="text-sm">{new Date(o.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="uppercase-tracked text-primary">{o.status}</p>
                  <p className="text-base">{formatPrice(o.total)}</p>
                </div>
              </div>
              <div className="hairline mt-4 divide-y divide-border">
                {o.order_items?.map((it: any) => (
                  <div key={it.id} className="flex items-center gap-4 py-3 text-sm">
                    {it.product_image && <img src={it.product_image} alt={it.product_name} className="h-14 w-12 object-cover" />}
                    <span className="flex-1">{it.product_name} × {it.quantity}</span>
                    <span>{formatPrice(it.price * it.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="reviews" className="mt-8 space-y-6">
          {reviews.length === 0 && <p className="text-muted-foreground">You haven't written any reviews.</p>}
          {reviews.map(r => (
            <div key={r.id} className="border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <Link to={`/products/${r.product.slug}`} className="font-display text-lg hover:text-primary">{r.product.name}</Link>
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className={`h-3.5 w-3.5 ${i <= r.rating ? "fill-accent text-accent" : "text-muted"}`} />)}
                </div>
              </div>
              {r.comment && <p className="mt-1 text-sm text-muted-foreground">{r.comment}</p>}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
