import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, MapPin, Clock, Leaf, Truck, RotateCcw, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-16 sm:mt-20 border-t border-neutral-800 bg-[#141212] text-white isolate overflow-hidden">
      {/* Signature Vertical Crimson Stripe on Far Left Edge */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 md:w-2 bg-[#8B1E3F] z-20" aria-hidden="true" />

      {/* Subtle Crimson Ambient Glow */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#8B1E3F]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -left-20 top-0 w-72 h-72 bg-[#8B1E3F]/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Upper Craft & Assurance Strip — Compact Height */}
      <div className="border-b border-white/10 py-5 sm:py-6">
        <div className="container-tight grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pl-4 sm:pl-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/5 border border-white/10 text-[#E5B6BD]">
              <Leaf className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">Honest Textiles</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">100% GOTS organic cotton & flax</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/5 border border-white/10 text-[#E5B6BD]">
              <Truck className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">Global Delivery</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Carbon-neutral on orders over $150</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/5 border border-white/10 text-[#E5B6BD]">
              <RotateCcw className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">Effortless Returns</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">30-day exchange & archive return</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/5 border border-white/10 text-[#E5B6BD]">
              <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">Archive Assurance</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Lifetime care and mend guidance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation: 4 Balanced Compact Editorial Columns */}
      <div className="container-tight py-10 md:py-12 pl-4 sm:pl-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand & Editorial Column */}
          <div className="space-y-3.5">
            {/* Logo matching Header and Landing Page */}
            <Link to="/" className="inline-flex flex-col group select-none">
              <span className="font-serif text-xl sm:text-[1.35rem] font-extrabold tracking-[0.18em] text-white leading-none uppercase">
                CRIMSON
              </span>
              <span className="font-serif text-[10px] font-bold tracking-[0.32em] text-[#E5B6BD] leading-tight mt-1 uppercase">
                CANVAS
              </span>
            </Link>

            <p className="text-xs text-neutral-400 leading-relaxed font-light max-w-xs">
              Quiet forms, tactile cloth and a streak of crimson. Made for the life that happens beyond the frame.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="#"
                className="flex h-7 w-7 items-center justify-center rounded bg-white/5 border border-white/10 text-neutral-400 transition-all duration-300 hover:bg-[#8B1E3F] hover:text-white hover:border-[#8B1E3F] hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                className="flex h-7 w-7 items-center justify-center rounded bg-white/5 border border-white/10 text-neutral-400 transition-all duration-300 hover:bg-[#8B1E3F] hover:text-white hover:border-[#8B1E3F] hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                className="flex h-7 w-7 items-center justify-center rounded bg-white/5 border border-white/10 text-neutral-400 transition-all duration-300 hover:bg-[#8B1E3F] hover:text-white hover:border-[#8B1E3F] hover:scale-105"
                aria-label="Twitter"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Collections Column */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E5B6BD]">Collections</h4>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li>
                <Link to="/products?category=shirts" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Oxford & Raw Shirts
                </Link>
              </li>
              <li>
                <Link to="/products?category=t-shirts" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Heavyweight T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/products?category=trousers" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Pleated Trousers
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  The Full Archive
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E5B6BD]">Customer Care</h4>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li>
                <Link to="/about" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Our Atelier Story
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Size & Fit Guide
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Sustainability Ethos
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier & Inquiries Column */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E5B6BD]">Atelier & Inquiries</h4>
            <div className="space-y-2 text-xs text-neutral-400">
              <p className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#E5B6BD] mt-0.5" />
                <span>14 Savile Row, Mayfair, London W1S 3JN</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#E5B6BD]" />
                <a href="mailto:concierge@crimsoncanvas.com" className="hover:text-white transition-colors">
                  concierge@crimsoncanvas.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 shrink-0 text-[#E5B6BD]" />
                <span>Mon – Sat: 10:00 — 19:00 GMT</span>
              </p>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] text-neutral-300 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8B1E3F] animate-pulse" />
                  Atelier Open for Private Fittings
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar — Compact */}
      <div className="border-t border-white/10 bg-[#0E0D0D]">
        <div className="container-tight flex flex-col items-center justify-between gap-3 py-4 text-[11px] text-neutral-400 md:flex-row pl-4 sm:pl-6">
          <p>© {new Date().getFullYear()} Crimson Canvas. All rights reserved.</p>
          <p className="text-neutral-500 hidden md:block">Slow fashion • Pure natural fibers • Beyond the frame</p>
          <div className="flex items-center gap-5">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Notice</Link>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/about" className="hover:text-white transition-colors">Cookie Preferences</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
