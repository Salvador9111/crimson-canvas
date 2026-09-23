import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard, { ProductCardItem } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";
import { CATEGORIES } from "@/lib/format";
import { Truck, RotateCcw, ShieldCheck, Star, Leaf, Factory, Sparkles, ArrowRight } from "lucide-react";
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
      {/* Hero Section — Full Landscape Editorial with Girl's Picture in Background */}
      <section className="relative w-full overflow-hidden min-h-[580px] sm:min-h-[640px] md:min-h-[680px] lg:min-h-[740px] flex items-center bg-[#1c1917] border-b border-border isolate">
        {/* Vertical Crimson Accent Stripe on far left edge matching reference */}
        <div className="absolute left-0 top-0 bottom-0 w-2 md:w-2.5 bg-[#8B1E3F] z-20" aria-hidden="true" />

        {/* Background Image: Girl in landscape format spanning the whole hero */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={hero}
            alt="Crimson Canvas Collection — Model in landscape background"
            className="w-full h-full object-cover object-top origin-top scale-110 sm:scale-115 md:scale-120 translate-x-[8%] sm:translate-x-[12%] md:translate-x-[15%] lg:translate-x-[18%] transition-transform duration-700 ease-out"
          />

          {/* Scrim & Gradients: Deep left vignette for crystal-clear text readability without washing out the model */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 via-40% to-transparent to-75% md:from-black/85 md:via-black/45 md:via-45% md:to-transparent md:to-75%"
            aria-hidden="true"
          />
          {/* Subtle top & bottom shadow for cinematic depth */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none"
            aria-hidden="true"
          />
          {/* Ambient crimson glow */}
          <div
            className="absolute -left-20 bottom-0 w-80 h-80 bg-[#8B1E3F]/20 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Hero Editorial Content */}
        <div className="container-tight relative z-10 py-16 sm:py-20 md:py-24 lg:py-28 pl-4 sm:pl-6 md:pl-8">
          <div className="max-w-2xl text-left">
            {/* Editorial Title Block with Left Vertical Line Indicator matching reference */}
            <div className="border-l border-white/40 pl-5 sm:pl-6 py-1">
              <p className="text-xs sm:text-sm font-semibold tracking-[0.24em] uppercase text-[#E5B6BD] mb-3 md:mb-4">
                EDITION 01 — THE WEARABLE ARCHIVE
              </p>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] font-normal text-white leading-[1.04] tracking-tight drop-shadow-sm">
                Dress like a work<br />in progress.
              </h1>
            </div>

            {/* Subtitle & Buttons aligned flush with the inner text */}
            <div className="pl-5 sm:pl-6">
              <p className="mt-7 md:mt-8 max-w-xl text-base sm:text-lg text-white/90 leading-relaxed font-light drop-shadow-sm">
                Quiet forms, tactile cloth and a streak of crimson. Made for the life that happens beyond the frame.
              </p>

              <div className="mt-8 md:mt-11 flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-none bg-[#8B1E3F] hover:bg-[#721531] text-white px-7 py-5 text-sm font-semibold tracking-wide shadow-md transition-all cursor-pointer"
                >
                  <Link to="/products">
                    Enter the collection
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-none border border-neutral-800 bg-white hover:bg-neutral-100 text-neutral-900 px-7 py-5 text-sm font-semibold tracking-wide transition-colors cursor-pointer"
                >
                  <Link to="/about">
                    Read the material notes
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
                  className={`rounded-pill px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${activeTab === t.slug
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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8B1E3F]">Why Crimson Canvas</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl text-charcoal-dark">
              Crafted with intention and conscience.
            </h2>
            <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
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
