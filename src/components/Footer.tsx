import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, MapPin, Clock, Leaf, Truck, RotateCcw, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-forest-dark/40 bg-forest text-white">
      {/* Upper Craft & Assurance Strip */}
      <div className="border-b border-white/10 py-8">
        <div className="container-tight grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-secondary">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-secondary">Certified Organic</p>
              <p className="text-xs text-white/75">100% GOTS cotton & raw linen</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-secondary">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-secondary">Complimentary Delivery</p>
              <p className="text-xs text-white/75">Carbon-neutral on orders over $150</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-secondary">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-secondary">Effortless Returns</p>
              <p className="text-xs text-white/75">30-day exchange & return window</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-secondary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-secondary">Lifetime Care</p>
              <p className="text-xs text-white/75">Complimentary repair guidance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation: 4 Balanced Columns */}
      <div className="container-tight py-16 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand & Heritage Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Link to="/" className="text-2xl font-bold tracking-tight text-white inline-block">
                Uclothes
              </Link>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary/90 bg-white/10 px-2 py-0.5 rounded-pill">
                Atelier
              </span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Contemporary wardrobe essentials cut from certified organic cotton, raw linen, and unblended wool. Timeless elegance crafted to outlast seasons.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/90 transition-all hover:bg-secondary hover:text-primary hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/90 transition-all hover:bg-secondary hover:text-primary hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/90 transition-all hover:bg-secondary hover:text-primary hover:scale-105"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">Collections</h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link to="/products?category=shirts" className="hover:text-white transition-colors">
                  Oxford Shirts
                </Link>
              </li>
              <li>
                <Link to="/products?category=t-shirts" className="hover:text-white transition-colors">
                  Organic T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/products?category=trousers" className="hover:text-white transition-colors">
                  Tailored Trousers
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  All Garments
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">Customer Care</h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Our Atelier Story
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Size & Fit Guide
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Sustainability Ethos
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier & Inquiries */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">Atelier & Studio</h4>
            <div className="space-y-2.5 text-sm text-white/80">
              <p className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-secondary mt-0.5" />
                <span>14 Savile Row, Mayfair, London W1S 3JN</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-secondary" />
                <a href="mailto:concierge@uclothes.com" className="hover:text-white transition-colors">
                  concierge@uclothes.com
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-secondary" />
                <span>Mon – Sat: 10:00 — 19:00 GMT</span>
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-secondary font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                  Atelier Open for Private Fittings
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/15 bg-forest-dark">
        <div className="container-tight flex flex-col items-center justify-between gap-4 py-8 pb-10 text-xs text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} Uclothes Clothing Brand. All rights reserved.</p>
          <p className="text-white/40 hidden md:block">Slow fashion • Pure natural fibers • Conscious tailoring</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Notice</Link>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/about" className="hover:text-white transition-colors">Cookie Preferences</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
