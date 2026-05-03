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
    supabase.from("products").select("id,slug,name,price,image_url,category").limit(6)
      .then(({ data }) => setFeatured((data ?? []) as any));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="grid items-stretch md:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-16 md:px-16 md:py-24">
            <p className="uppercase-tracked text-primary">Autumn / Winter — 2026</p>
            <h1 className="font-display mt-6 text-5xl leading-[1.05] md:text-7xl">
              Pieces made<br /> to be lived in.
            </h1>
            <p className="mt-6 max-w-md text-muted-foreground">
              A small, considered wardrobe of shirts, tees, and trousers — cut from honest fabrics in a quiet palette of wine, ivory, and stone.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-none px-8"><Link to="/products">Shop the collection</Link></Button>
              <Button asChild size="lg" variant="outline" className="rounded-none px-8"><Link to="/products?category=shirts">Explore shirts</Link></Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] md:aspect-auto">
            <img src={hero} alt="Model wearing a white oxford shirt and wine trousers" width={1536} height={1024} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-tight py-20">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-3xl md:text-4xl">Browse by category</h2>
          <Link to="/products" className="uppercase-tracked text-primary">View all →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {CATEGORIES.map(c => (
            <Link key={c.slug} to={`/products?category=${c.slug}`} className="group relative block aspect-[4/3] overflow-hidden bg-secondary">
              <div className="absolute inset-0 flex items-end p-6">
                <div className="rounded-sm bg-background/85 px-4 py-3 backdrop-blur transition-transform group-hover:translate-y-[-4px]">
                  <p className="uppercase-tracked text-muted-foreground">Shop</p>
                  <p className="font-display text-2xl">{c.label}</p>
                </div>
              </div>
              <img
                src={`/products/p-${c.slug === "t-shirts" ? "tshirt" : c.slug === "shirts" ? "shirt" : "trouser"}-1.jpg`}
                alt={c.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container-tight py-12">
        <div className="mb-10">
          <p className="uppercase-tracked text-primary">Featured</p>
          <h2 className="font-display mt-2 text-3xl md:text-4xl">New arrivals</h2>
        </div>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Pillars */}
      <section className="container-tight grid gap-8 border-t border-border py-16 md:grid-cols-3">
        {[
          { t: "Honest materials", d: "Long-staple cotton, soft linen and merino wool — chosen to wear in beautifully." },
          { t: "Slow production", d: "Small runs from family-owned workshops. Quality over quantity, always." },
          { t: "Quiet design", d: "Considered cuts, refined details, no logos. Made to outlast trends." },
        ].map(x => (
          <div key={x.t}>
            <h3 className="font-display text-xl">{x.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
