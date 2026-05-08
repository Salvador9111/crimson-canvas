import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard, { ProductCardItem } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";
import { CATEGORIES } from "@/lib/format";

const Home = () => {
  const [featured, setFeatured] = useState<ProductCardItem[]>([]);

  useEffect(() => {
    supabase.from("products").select("id,slug,name,price,image_url,category").limit(8)
      .then(({ data }) => setFeatured((data ?? []) as any));
  }, []);

  return (
    <div className="animate-fade-up">
      {/* Hero — full viewport height, editorial fashion banner per DESIGN.md */}
      <section className="relative min-h-screen">
        <div className="grid items-stretch md:grid-cols-2 min-h-screen">
          <div className="flex flex-col justify-center px-6 py-16 md:px-16 md:py-24">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Autumn / Winter — 2026</p>
            {/* Hero title — 56px, weight 700, tight letter spacing per DESIGN.md */}
            <h1 className="mt-8 text-hero leading-[1.05]">
              Pieces made<br /> to be lived in.
            </h1>
            <p className="mt-8 max-w-md text-sm text-muted-foreground leading-relaxed">
              A small, considered wardrobe of shirts, tees, and trousers — cut from honest fabrics in a quiet palette of wine, ivory, and stone.
            </p>
            {/* Buttons — pill shaped, black bg, white text per DESIGN.md */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-pill px-8 py-3.5">
                <Link to="/products">Shop the collection</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-pill px-8 py-3.5 border-foreground/20 hover:bg-[#F2F2F2]">
                <Link to="/products?category=shirts">Explore shirts</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] md:aspect-auto">
            <img src={hero} alt="Model wearing a white oxford shirt and wine trousers" width={1536} height={1024} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Categories — alternating soft gray section per DESIGN.md */}
      <section className="bg-[#FAFAFA] py-24">
        <div className="container-tight">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="text-section">Browse by category</h2>
            <Link to="/products" className="text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-opacity duration-300 hover:opacity-60">View all →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {CATEGORIES.map(c => (
              <Link key={c.slug} to={`/products?category=${c.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-xl bg-secondary">
                <div className="absolute inset-0 flex items-end p-6 z-10">
                  <div className="rounded-lg bg-white/90 px-5 py-4 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-[-4px]">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Shop</p>
                    <p className="text-xl font-semibold">{c.label}</p>
                  </div>
                </div>
                <img
                  src={`/products/p-${c.slug === "t-shirts" ? "tshirt" : c.slug === "shirts" ? "shirt" : "trouser"}-1.jpg`}
                  alt={c.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured — 4-column grid per DESIGN.md */}
      <section className="container-tight py-24">
        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Featured</p>
          <h2 className="mt-3 text-section">New arrivals</h2>
        </div>
        {/* 4-column desktop, 2-column tablet/mobile per DESIGN.md */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Pillars — white section with generous spacing per DESIGN.md */}
      <section className="bg-[#FAFAFA]">
        <div className="container-tight grid gap-12 py-20 md:grid-cols-3">
          {[
            { t: "Honest materials", d: "Long-staple cotton, soft linen and merino wool — chosen to wear in beautifully." },
            { t: "Slow production", d: "Small runs from family-owned workshops. Quality over quantity, always." },
            { t: "Quiet design", d: "Considered cuts, refined details, no logos. Made to outlast trends." },
          ].map(x => (
            <div key={x.t}>
              <h3 className="text-lg font-semibold">{x.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
