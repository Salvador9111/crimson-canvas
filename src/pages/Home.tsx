import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard, { ProductCardItem } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";
import { CATEGORIES } from "@/lib/format";
import { Truck, RotateCcw, ShieldCheck, Star, Leaf, Factory, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { INITIAL_PRODUCTS } from "@/lib/products";

export default function Home() {
  const [featured, setFeatured] = useState<ProductCardItem[]>(INITIAL_PRODUCTS as any);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    supabase.from("products").select("id,slug,name,price,image_url,category").limit(8)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setFeatured(data as any);
        }
      });
  }, []);

  const filteredProducts = activeTab === "all"
    ? featured
    : featured.filter(p => p.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="animate-fade-up">
      {/* Hero Section — Editorial clothing layout per ChatGPT guidelines */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="container-tight grid items-center py-12 md:grid-cols-12 md:py-20 gap-10">
          <div className="md:col-span-6 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-pill bg-secondary px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary w-fit">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Autumn / Winter Collection 2026</span>
            </div>

            {/* Headline recommended by ChatGPT */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-charcoal-dark leading-[1.08]">
              Elevate Your Everyday Style.
            </h1>

            <p className="max-w-xl text-base text-muted-foreground leading-relaxed md:text-lg">
              A thoughtful wardrobe of shirts, tees, and trousers cut from honest organic fabrics in a quiet, harmonious palette of sage, off-white, and charcoal.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button asChild size="lg" className="rounded-pill bg-primary px-9 py-6 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-soft hover:bg-forest-hover">
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-pill border-border bg-white px-8 py-6 text-sm font-semibold uppercase tracking-[0.12em] text-foreground hover:bg-secondary">
                <Link to="/products?category=shirts">Explore Shirts</Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>GOTS Organic Cotton</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Plastic-Free Packaging</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary shadow-card">
              <img
                src={hero}
                alt="Model wearing quiet luxury clothing by Uclothes"
                width={1536}
                height={1024}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/95 p-4 shadow-soft backdrop-blur-md border border-white/40 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Featured Look</p>
                  <p className="text-sm font-bold text-foreground">The French Linen & Pleated Trouser</p>
                </div>
                <Button asChild size="sm" variant="ghost" className="text-primary hover:bg-secondary rounded-pill">
                  <Link to="/products">View</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Wardrobe Foundations</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl text-charcoal-dark">
                Shop by Category
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center text-xs font-bold uppercase tracking-[0.16em] text-primary hover:opacity-75 transition-opacity"
            >
              Browse all categories <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3 animate-stagger">
            {CATEGORIES.map(c => (
              <Link
                key={c.slug}
                to={`/products?category=${c.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-secondary border border-border/80 shadow-soft"
              >
                <img
                  src={`/products/p-${c.slug === "t-shirts" ? "tshirt" : c.slug === "shirts" ? "shirt" : "trouser"}-1.jpg`}
                  alt={c.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                  <div className="rounded-xl bg-white/95 px-5 py-4 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:translate-y-[-4px]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Explore</p>
                    <p className="text-xl font-bold text-foreground">{c.label}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured & New Arrivals with Tab Filters */}
      <section className="py-20 bg-white border-y border-border">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Curated Selection</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl text-charcoal-dark">
                Featured & New Arrivals
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[{ slug: "all", label: "All Items" }, ...CATEGORIES].map(t => (
                <button
                  key={t.slug}
                  onClick={() => setActiveTab(t.slug)}
                  className={`rounded-pill px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-200 ${
                    activeTab === t.slug
                      ? "bg-primary text-white shadow-soft"
                      : "bg-secondary/70 text-foreground/80 hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-stagger">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="rounded-pill border-border px-10 hover:bg-secondary">
              <Link to="/products">View All Products ({featured.length})</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Pillars & Craftsmanship */}
      <section className="py-24 bg-background">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Why Uclothes</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl text-charcoal-dark">
              Crafted with intention and conscience.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              We design minimalist garments using uncompromised materials that grow softer with every wash and wear.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Leaf,
                title: "Honest Organic Fibers",
                desc: "Long-staple organic cotton, Normandy flax linen, and regenerative wool. Zero toxic dyes, no synthetic blends."
              },
              {
                icon: Factory,
                title: "Slow, Ethical Production",
                desc: "Crafted in limited runs by generational ateliers across Portugal and Japan. Fair wages and uncompromising attention to finish."
              },
              {
                icon: Sparkles,
                title: "Quiet, Timeless Design",
                desc: "Minimalist geometry, subtle seam details, and quiet colors. Made to effortlessly outlive transient trends."
              }
            ].map(col => (
              <div key={col.title} className="rounded-2xl border border-border bg-white p-8 transition-all hover:border-primary/40 hover:shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                  <col.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-6 text-lg font-bold text-foreground">{col.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{col.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
