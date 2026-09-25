import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ProductCard, { ProductCardItem } from "@/components/ProductCard";
import { CATEGORIES } from "@/lib/format";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { INITIAL_PRODUCTS } from "@/lib/products";

const getFilteredInitial = (category: string, queryStr: string, sortOrder: string): ProductCardItem[] => {
  let res = [...INITIAL_PRODUCTS];
  if (category !== "all") res = res.filter(i => i.category === category);
  if (queryStr) res = res.filter(i => i.name.toLowerCase().includes(queryStr.toLowerCase()));
  if (sortOrder === "price-asc") res.sort((a, b) => a.price - b.price);
  else if (sortOrder === "price-desc") res.sort((a, b) => b.price - a.price);
  return res as any;
};

export default function Products() {
  const [params, setParams] = useSearchParams();
  const cat = params.get("category") ?? "all";
  const q = params.get("q") ?? "";
  const sort = params.get("sort") ?? "price-asc";

  // Instant render without skeleton screen delay
  const [items, setItems] = useState<ProductCardItem[]>(() => getFilteredInitial(cat, q, sort));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Instant synchronous update on filter change
    setItems(getFilteredInitial(cat, q, sort));

    let query = supabase.from("products").select("id,slug,name,price,image_url,category");
    if (cat !== "all") query = query.eq("category", cat);
    if (q) query = query.ilike("name", `%${q}%`);
    if (sort === "price-asc") query = query.order("price", { ascending: true });
    else if (sort === "price-desc") query = query.order("price", { ascending: false });
    else if (sort === "name") query = query.order("name", { ascending: true });
    else query = query.order("created_at", { ascending: false });

    query.then(({ data }) => {
      if (data && data.length > 0) {
        setItems(data as any);
      }
    });
  }, [cat, q, sort]);

  const setParam = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (!v || v === "all" || (k === "sort" && v === "price-asc")) next.delete(k); else next.set(k, v);
    setParams(next, { replace: true });
  };

  const title = useMemo(() => {
    if (cat === "all") return "The Complete Wardrobe";
    return CATEGORIES.find(c => c.slug === cat)?.label ?? "Products";
  }, [cat]);

  return (
    <div className="container-tight py-14 animate-fade-up">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Timeless Essentials</p>
        <div className="mt-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl text-charcoal-dark">{title}</h1>
          {!loading && (
            <p className="text-sm font-medium text-muted-foreground pb-1">
              Showing {items.length} crafted {items.length === 1 ? "garment" : "garments"}
            </p>
          )}
        </div>
      </div>

      {/* Filter and Sorting Toolbar */}
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-white p-4 shadow-soft">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Category:</span>
          </div>
          {[{ slug: "all", label: "All Items" }, ...CATEGORIES].map(c => (
            <button
              key={c.slug}
              onClick={() => setParam("category", c.slug)}
              className={`rounded-pill px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-200 ${
                cat === c.slug
                  ? "bg-primary text-white shadow-soft"
                  : "bg-secondary/60 text-foreground/80 hover:bg-secondary hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              defaultValue={q}
              onChange={e => setParam("q", e.target.value)}
              placeholder="Filter by name..."
              className="rounded-pill pl-9 text-xs border-border bg-background"
            />
          </div>

          {/* Sort */}
          <Select value={sort} onValueChange={v => setParam("sort", v)}>
            <SelectTrigger className="w-48 rounded-pill border-border bg-background text-xs font-medium">
              <ArrowUpDown className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="price-asc" className="text-xs">Price: Low to High</SelectItem>
              <SelectItem value="price-desc" className="text-xs">Price: High to Low</SelectItem>
              <SelectItem value="newest" className="text-xs">Newest Arrivals</SelectItem>
              <SelectItem value="name" className="text-xs">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[4/5] rounded-2xl bg-secondary animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 w-16 rounded bg-secondary animate-pulse" />
                <div className="h-4 w-32 rounded bg-secondary animate-pulse" />
                <div className="h-3 w-20 rounded bg-secondary animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white py-24 text-center">
          <p className="text-lg font-semibold text-charcoal-dark">No garments found</p>
          <p className="mt-2 text-sm text-muted-foreground">Try clearing your search term or adjusting filters.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-stagger">
          {items.map(p => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
