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
        <div className="container-tight grid items-center py-10 md:grid-cols-12 md:py-14 gap-10">
          <div className="md:col-span-6 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-pill bg-secondary px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary w-fit">
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

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild size="lg" className="rounded-pill bg-primary px-8 py-5 text-sm font-semibold tracking-wide text-white shadow-soft hover:bg-forest-hover">
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-pill border-border bg-white px-7 py-5 text-sm font-semibold tracking-wide text-foreground hover:bg-secondary">
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
                <Button asChild size="sm" className="rounded-pill bg-primary hover:bg-forest-hover text-white text-xs font-semibold tracking-wider px-4 py-2 shadow-soft transition-all">
                  <Link to="/products" aria-label="Shop the featured French Linen and Pleated Trouser look">
                    Shop Look <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          <div className="mb-10 max-w-xl">
            <p className="text-xs font-semibold tracking-wide text-primary">Wardrobe Foundations</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl text-charcoal-dark">
              Shop by Category
            </h2>
            <Link
              to="/products"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-primary hover:text-forest-hover transition-colors"
            >
              <span>Browse all categories</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3 animate-stagger">
            {CATEGORIES.map(c => (
              <Link
                key={c.slug}
                to={`/products?category=${c.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-white transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(82,102,83,0.18)] hover:-translate-y-1"
              >
                {/* Apparel Image — completely unobstructed */}
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  <img
                    src={`/products/p-${c.slug === "t-shirts" ? "tshirt" : c.slug === "shirts" ? "shirt" : "trouser"}-1.jpg`}
                    alt={c.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Placed Below Respective Apparel */}
                <div className="flex items-center justify-between p-5 bg-white transition-colors duration-300 border-t border-border/60">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold tracking-wide text-primary">Collection</p>
                    <p className="text-xl sm:text-2xl font-bold text-foreground mt-0.5 truncate">{c.label}</p>
                  </div>

                  {/* Explore Button: Forest Green by default, switches to White with proper luminous glow when cursor is placed on it */}
                  <div className="flex items-center gap-1.5 rounded-pill bg-primary text-white border border-primary px-4 py-2 text-xs font-semibold tracking-wide shadow-soft shrink-0 transition-all duration-300 cursor-pointer hover:bg-white hover:text-primary hover:border-primary hover:scale-105 hover:shadow-[0_0_25px_rgba(82,102,83,0.65)] hover:ring-4 hover:ring-primary/20">
                    <span>Explore</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
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
          {/* Centered section header and filter pills for optimal visual proximity */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold tracking-wide text-primary">Curated Selection</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl text-charcoal-dark">
              Featured & New Arrivals
            </h2>

            {/* Category Filter Pills in close proximity */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {[{ slug: "all", label: "All Items" }, ...CATEGORIES].map(t => (
                <button
                  key={t.slug}
                  onClick={() => setActiveTab(t.slug)}
                  aria-pressed={activeTab === t.slug}
                  className={`rounded-pill px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
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
            <Button asChild size="lg" variant="outline" className="rounded-pill border-border px-9 py-5 text-xs font-semibold tracking-wide hover:bg-secondary">
              <Link to="/products">
                Explore All Garments <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
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
