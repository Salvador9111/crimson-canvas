import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ProductCard, { ProductCardItem } from "@/components/ProductCard";
import { CATEGORIES } from "@/lib/format";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Products() {
  const [params, setParams] = useSearchParams();
  const cat = params.get("category") ?? "all";
  const q = params.get("q") ?? "";
  const sort = params.get("sort") ?? "newest";

  const [items, setItems] = useState<ProductCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let query = supabase.from("products").select("id,slug,name,price,image_url,category");
    if (cat !== "all") query = query.eq("category", cat);
    if (q) query = query.ilike("name", `%${q}%`);
    if (sort === "price-asc") query = query.order("price", { ascending: true });
    else if (sort === "price-desc") query = query.order("price", { ascending: false });
    else if (sort === "name") query = query.order("name", { ascending: true });
    else query = query.order("created_at", { ascending: false });

    query.then(({ data }) => { setItems((data ?? []) as any); setLoading(false); });
  }, [cat, q, sort]);

  const setParam = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (!v || v === "all") next.delete(k); else next.set(k, v);
    setParams(next, { replace: true });
  };

  const title = useMemo(() => {
    if (cat === "all") return "All Products";
    return CATEGORIES.find(c => c.slug === cat)?.label ?? "Products";
  }, [cat]);

  return (
    <div className="container-tight py-16 animate-fade-up">
      <div className="mb-12">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Collection</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
      </div>

      {/* Filters — pill buttons, spacious, minimal per DESIGN.md */}
      <div className="mb-12 flex flex-wrap items-center gap-4 border-y border-border py-5">
        <div className="flex flex-wrap gap-2">
          {[{ slug: "all", label: "All" }, ...CATEGORIES].map(c => (
            <button
              key={c.slug}
              onClick={() => setParam("category", c.slug)}
              className={`rounded-pill px-5 py-2.5 text-xs font-medium uppercase tracking-[0.12em] transition-all duration-300 ${
                cat === c.slug
                  ? "bg-foreground text-background"
                  : "border border-border hover:bg-[#F2F2F2]"
              }`}
            >{c.label}</button>
          ))}
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <Input
              defaultValue={q}
              onChange={e => setParam("q", e.target.value)}
              placeholder="Search products"
              className="w-56 rounded-pill pl-9"
            />
          </div>
          <Select value={sort} onValueChange={v => setParam("sort", v)}>
            <SelectTrigger className="w-44 rounded-pill"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <p className="py-24 text-center text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <p className="py-24 text-center text-muted-foreground">No products found.</p>
      ) : (
        /* 4-column desktop, 2-column tablet/mobile, 24px gap per DESIGN.md */
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
