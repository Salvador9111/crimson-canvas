import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Factory, Sparkles, HeartHandshake, ShieldCheck, ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";

export default function About() {
  return (
    <div className="animate-fade-up">
      {/* Editorial Banner */}
      <section className="relative overflow-hidden bg-secondary py-20 md:py-28">
        <div className="container-tight relative z-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">The Uclothes Philosophy</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl text-charcoal-dark">
            Elevating Everyday Essentials.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed md:text-lg">
            We build clothing without noise. Honest fabrics, considerate silhouettes, and sustainable craftsmanship meant to be worn, lived in, and loved for decades.
          </p>
        </div>
      </section>

      {/* Story split */}
      <section className="container-tight py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary shadow-card">
            <img src={hero} alt="Craftsmanship and tailored silhouettes" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Origin</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Slow fashion, fastidious details.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Founded on the belief that clothing should quietly complement the wearer rather than shout, Uclothes started as a compact atelier project. We stripped away oversized logos, disposable synthetic fibers, and seasonal rush.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every shirt, t-shirt, and trouser is engineered with precision seam allowances, pre-shrunk organic weaves, and natural corozo buttons. Our palette draws inspiration from nature — sage greenery, quiet stones, ivory sands, and deep charcoal earth.
            </p>
            <div className="pt-4">
              <Button asChild className="rounded-pill bg-primary px-8 hover:bg-forest-hover">
                <Link to="/products">
                  Shop the Collection <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="border-y border-border bg-white py-20">
        <div className="container-tight">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Core Commitments</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">How we make our clothes</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Leaf,
                title: "100% Organic & Raw Fibers",
                desc: "We exclusively source GOTS-certified organic cotton, European flax linen, and responsibly sheared wool that softens gracefully with every wash."
              },
              {
                icon: Factory,
                title: "Family-Run Workshops",
                desc: "We partner with generational artisans who earn fair living wages and work under safe, dignified conditions with zero shortcuts."
              },
              {
                icon: ShieldCheck,
                title: "Designed for Longevity",
                desc: "Every cut undergoes rigorous stress and shrink testing to guarantee that your favorite staple remains true to fit season after season."
              }
            ].map(col => (
              <div key={col.title} className="rounded-2xl border border-border bg-background p-8 transition-all hover:border-primary/30 hover:shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                  <col.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-lg font-semibold">{col.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{col.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
