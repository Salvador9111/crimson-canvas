import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import heroImg from "@/assets/hero.jpg";
import { Sparkles } from "lucide-react";

const SASSY_FASHION_QUOTES = [
  {
    quote: "Dress like you’re about to bump into your ex and their stylist.",
    tag: "The Crimson Maxim",
  },
  {
    quote: "Life is far too brief for synthetic fabric and uninspired tailoring.",
    tag: "Rule No. 01",
  },
  {
    quote: "Quiet luxury, loud standards. Welcome to the inner circle.",
    tag: "Archive Codex",
  },
  {
    quote: "They say money can't buy taste. Good thing you already brought both.",
    tag: "Curator's Guild",
  },
  {
    quote: "Fast fashion is an apology. Bespoke texture is a declaration.",
    tag: "Style Note",
  },
  {
    quote: "No logos needed. Just weight, silhouette, and unapologetic confidence.",
    tag: "Fabric Philosophy",
  },
];

interface AuthShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  mode?: "signin" | "signup" | "forgot" | "verify" | "reset";
}

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
  mode = "signin",
}: AuthShellProps) {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const location = useLocation();

  const nextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % SASSY_FASHION_QUOTES.length);
  };

  const currentQuote = SASSY_FASHION_QUOTES[quoteIdx];
  const isAuthTab = mode === "signin" || mode === "signup";

  return (
    <div className="relative min-h-screen bg-[#FDFCFB] text-neutral-900 overflow-x-hidden">
      <div className="grid min-h-screen lg:grid-cols-12">
        {/* Left Column: Editorial Atmospheric Showcase (Visible on lg+) */}
        <div className="relative hidden lg:col-span-5 xl:col-span-6 lg:flex flex-col justify-between overflow-hidden bg-[#121111] p-10 xl:p-14 text-white isolate">
          {/* Signature Crimson Accent Stripe on far left edge */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#8B1E3F] z-20" aria-hidden="true" />

          {/* Background Hero Image with Deep Vignette */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImg}
              alt="Crimson Canvas"
              className="h-full w-full object-cover object-center scale-105 opacity-40 transition-transform duration-1000 ease-out"
            />
            {/* Multi-layer Editorial Scrim Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121111] via-[#121111]/75 to-[#121111]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#121111]/90 via-transparent to-[#121111]/60" />
            {/* Ambient Pulsing Crimson Glow */}
            <div className="absolute -left-20 bottom-10 w-96 h-96 bg-[#8B1E3F]/30 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Top Brand Header */}
          <div className="relative z-10 flex items-center justify-between">
            <Link to="/" className="flex flex-col group py-0.5 select-none">
              <span className="font-serif text-2xl font-extrabold tracking-[0.2em] text-white leading-none uppercase">
                CRIMSON
              </span>
              <span className="font-serif text-xs font-bold tracking-[0.34em] text-[#E5B6BD] leading-tight mt-1 uppercase">
                CANVAS
              </span>
            </Link>
          </div>

          {/* Center: Dynamic Sassy Quote Carousel */}
          <div className="relative z-10 my-auto py-12 max-w-xl">
            <div className="border-l-2 border-[#8B1E3F] pl-6 py-2 transition-all duration-300">
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#E5B6BD]">
                  {currentQuote.tag}
                </span>

                {/* Sassy Shuffle Button */}
                <button
                  type="button"
                  onClick={nextQuote}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1 text-[11px] font-medium text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Shuffle sartorial wisdom"
                >
                  <Sparkles className="h-3 w-3 text-[#E5B6BD]" />
                  <span>Shuffle Wit</span>
                </button>
              </div>

              <blockquote className="font-serif text-2xl xl:text-3xl text-white font-normal leading-snug tracking-tight">
                "{currentQuote.quote}"
              </blockquote>
            </div>

            {/* Quote Indicators */}
            <div className="flex items-center gap-2 pl-6 mt-6">
              {SASSY_FASHION_QUOTES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setQuoteIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === quoteIdx ? "w-8 bg-[#8B1E3F]" : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`View quote ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form Card Area */}
        <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center items-center p-4 sm:p-5 lg:p-6 relative min-h-screen">
          {/* Subtle Ambient Background Mesh */}
          <div className="absolute inset-0 bg-[#FDFCFB] pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #8B1E3F 1px, transparent 0)`,
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          {/* Mobile-only logo */}
          <div className="lg:hidden relative z-10 flex justify-center mb-2.5">
            <Link to="/" className="flex flex-col items-center group py-0.5 select-none">
              <span className="font-serif text-lg font-extrabold tracking-[0.16em] text-neutral-900 leading-none uppercase">
                CRIMSON
              </span>
              <span className="font-serif text-[9px] font-bold tracking-[0.28em] text-[#8B1E3F] leading-tight mt-0.5 uppercase">
                CANVAS
              </span>
            </Link>
          </div>

          {/* Central Card Container */}
          <div className="relative z-10 w-full max-w-[440px] mx-auto my-auto animate-fade-up">
            <div className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-7 shadow-[0_16px_50px_rgba(0,0,0,0.06)] border border-neutral-200/80 relative overflow-hidden backdrop-blur-xl">
              {/* Signature Top Crimson Line Accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8B1E3F] via-[#E5B6BD] to-[#8B1E3F]" />

              {/* Interactive Segmented Switcher for Sign In vs Create Account */}
              {isAuthTab && (
                <div className="flex rounded-full bg-neutral-100 p-1 mb-4 border border-neutral-200/70 select-none">
                  <Link
                    to="/login"
                    className={`flex-1 text-center py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                      location.pathname === "/login"
                        ? "bg-white text-neutral-900 shadow-sm font-bold"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className={`flex-1 text-center py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                      location.pathname === "/signup"
                        ? "bg-white text-neutral-900 shadow-sm font-bold"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    Create Account
                  </Link>
                </div>
              )}

              {/* Title & Subtitle */}
              <div className="mb-4">
                <h1 className="font-serif text-2xl sm:text-[1.65rem] font-bold tracking-tight text-neutral-900">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-1 text-xs text-neutral-500 leading-relaxed font-light">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Form Content */}
              <div>{children}</div>
            </div>

            {/* Outer Footer */}
            {footer && (
              <div className="mt-2.5 sm:mt-3 text-center text-xs text-neutral-500 font-medium">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
