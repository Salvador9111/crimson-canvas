import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { formatPrice, CATEGORIES } from "@/lib/format";
import { toast } from "sonner";
import { Pencil, Plus, Trash } from "lucide-react";

type Product = { id: string; name: string; slug: string; description: string; price: number; category: string; image_url: string | null; stock: number };
type Order = { id: string; user_id: string; total: number; status: string; created_at: string; shipping_name: string | null };
type ProfileRow = { id: string; full_name: string | null; created_at: string };

export default function Admin() {
  return (
    <div className="container-tight py-16 animate-fade-up">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Admin</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Dashboard</h1>
      <Tabs defaultValue="products" className="mt-12">
        <TabsList className="rounded-pill bg-[#F5F5F5]">
          <TabsTrigger value="products" className="rounded-pill">Products</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-pill">Orders</TabsTrigger>
          <TabsTrigger value="users" className="rounded-pill">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="products"><ProductsTab /></TabsContent>
        <TabsContent value="orders"><OrdersTab /></TabsContent>
        <TabsContent value="users"><UsersTab /></TabsContent>
      </Tabs>
    </div>
  );
}

function emptyProduct(): Partial<Product> {
  return { name: "", slug: "", description: "", price: 0, category: "shirts", image_url: "", stock: 0 };
}

function ProductsTab() {
  const [items, setItems] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [open, setOpen] = useState(false);

  const load = () => supabase.from("products").select("*").order("created_at", { ascending: false }).then(({ data }) => setItems((data ?? []) as any));
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const payload: any = { ...editing, price: Number(editing.price), stock: Number(editing.stock) };
    if (!payload.slug) payload.slug = payload.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const { error } = editing.id
      ? await supabase.from("products").update(payload).eq("id", editing.id)
      : await supabase.from("products").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setOpen(false); setEditing(null); load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div className="mt-10">
      <div className="mb-6 flex justify-end">
        <Button className="rounded-pill" onClick={() => { setEditing(emptyProduct()); setOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" strokeWidth={1.5} /> New product
        </Button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-[#FAFAFA] text-left">
            <tr>
              <th className="p-4 font-medium">Name</th><th className="p-4 font-medium">Category</th><th className="p-4 font-medium">Price</th><th className="p-4 font-medium">Stock</th><th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p.id} className="border-t border-border transition-colors duration-200 hover:bg-[#FAFAFA]">
                <td className="p-4 flex items-center gap-3">
                  {p.image_url && <img src={p.image_url} alt="" className="h-10 w-8 rounded-lg object-cover" />}
                  {p.name}
                </td>
                <td className="p-4 capitalize">{p.category}</td>
                <td className="p-4">{formatPrice(p.price)}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm" className="rounded-lg" onClick={() => { setEditing(p); setOpen(true); }}><Pencil className="h-4 w-4" strokeWidth={1.5} /></Button>
                  <Button variant="ghost" size="sm" className="rounded-lg" onClick={() => remove(p.id)}><Trash className="h-4 w-4" strokeWidth={1.5} /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-xl">
          <DialogHeader><DialogTitle>{editing?.id ? "Edit product" : "New product"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div><Label>Name</Label><Input className="rounded-lg mt-1.5" value={editing.name ?? ""} onChange={e => setEditing({...editing, name: e.target.value})} /></div>
              <div><Label>Slug</Label><Input className="rounded-lg mt-1.5" placeholder="auto" value={editing.slug ?? ""} onChange={e => setEditing({...editing, slug: e.target.value})} /></div>
              <div><Label>Description</Label><Textarea className="rounded-lg mt-1.5" value={editing.description ?? ""} onChange={e => setEditing({...editing, description: e.target.value})} /></div>
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Price</Label><Input className="rounded-lg mt-1.5" type="number" value={editing.price ?? 0} onChange={e => setEditing({...editing, price: Number(e.target.value)})} /></div>
                <div><Label>Stock</Label><Input className="rounded-lg mt-1.5" type="number" value={editing.stock ?? 0} onChange={e => setEditing({...editing, stock: Number(e.target.value)})} /></div>
                <div>
                  <Label>Category</Label>
                  <Select value={editing.category} onValueChange={v => setEditing({...editing, category: v})}>
                    <SelectTrigger className="rounded-lg mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>{CATEGORIES.map(c => <SelectItem key={c.slug} value={c.slug}>{c.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Image URL</Label><Input className="rounded-lg mt-1.5" value={editing.image_url ?? ""} onChange={e => setEditing({...editing, image_url: e.target.value})} /></div>
            </div>
          )}
          <DialogFooter><Button onClick={save} className="rounded-pill">Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const load = () => supabase.from("orders").select("id,user_id,total,status,created_at,shipping_name").order("created_at", { ascending: false }).then(({ data }) => setOrders((data ?? []) as any));
  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div className="mt-10 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-[#FAFAFA] text-left">
          <tr><th className="p-4 font-medium">Order</th><th className="p-4 font-medium">Customer</th><th className="p-4 font-medium">Date</th><th className="p-4 font-medium">Total</th><th className="p-4 font-medium">Status</th></tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-t border-border transition-colors duration-200 hover:bg-[#FAFAFA]">
              <td className="p-4 font-mono text-xs">{o.id.slice(0, 8)}</td>
              <td className="p-4">{o.shipping_name ?? "—"}</td>
              <td className="p-4">{new Date(o.created_at).toLocaleDateString()}</td>
              <td className="p-4">{formatPrice(o.total)}</td>
              <td className="p-4">
                <Select value={o.status} onValueChange={v => setStatus(o.id, v)}>
                  <SelectTrigger className="w-36 rounded-pill"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UsersTab() {
  const [users, setUsers] = useState<ProfileRow[]>([]);
  const [admins, setAdmins] = useState<Set<string>>(new Set());

  const load = async () => {
    const { data } = await supabase.from("profiles").select("id, full_name, created_at").order("created_at", { ascending: false });
    setUsers((data ?? []) as any);
    const { data: roles } = await supabase.from("user_roles").select("user_id").eq("role", "admin");
    setAdmins(new Set((roles ?? []).map(r => r.user_id)));
  };
  useEffect(() => { load(); }, []);

  const toggleAdmin = async (id: string) => {
    if (admins.has(id)) {
      await supabase.from("user_roles").delete().eq("user_id", id).eq("role", "admin");
    } else {
      await supabase.from("user_roles").insert({ user_id: id, role: "admin" });
    }
    load();
  };

  return (
    <div className="mt-10 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-[#FAFAFA] text-left">
          <tr><th className="p-4 font-medium">Name</th><th className="p-4 font-medium">Joined</th><th className="p-4 font-medium">Role</th><th className="p-4"></th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-t border-border transition-colors duration-200 hover:bg-[#FAFAFA]">
              <td className="p-4">{u.full_name || <span className="text-muted-foreground">Unnamed</span>}</td>
              <td className="p-4">{new Date(u.created_at).toLocaleDateString()}</td>
              <td className="p-4">{admins.has(u.id) ? <span className="text-xs font-medium uppercase tracking-[0.18em]">Admin</span> : "Customer"}</td>
              <td className="p-4 text-right">
                <Button variant="outline" size="sm" className="rounded-pill" onClick={() => toggleAdmin(u.id)}>
                  {admins.has(u.id) ? "Remove admin" : "Make admin"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
