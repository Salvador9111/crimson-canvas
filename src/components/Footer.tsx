import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="mt-28 border-t border-forest-dark/40 bg-forest text-white">
      {/* Upper Footer: Brand, Links, Newsletter */}
      <div className="container-tight py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 lg:gap-16">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-5">
            <Link to="/" className="text-2xl font-bold tracking-tight text-white inline-block">
              Uclothes
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Contemporary wardrobe essentials cut from certified organic cotton, raw linen, and unblended wool. Timeless elegance crafted to outlast seasons.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-secondary hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-secondary hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-secondary hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Collections</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
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
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Customer Care</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Our Atelier Story
                </Link>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Size Guide & Measurements
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Worldwide Shipping Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  30-Day Returns & Exchanges
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Sustainability Standards
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Club */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Private Archive Club</h4>
            <p className="text-sm text-white/70 leading-relaxed">
              Quiet releases, seasonal capsule updates, and member-only pre-orders. No spam, ever.
            </p>
            {subscribed ? (
              <div className="rounded-xl bg-white/10 p-4 text-xs font-medium text-secondary flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-secondary" />
                <span>Thank you for joining our private circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2 pt-1">
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-pill border border-white/20 bg-white/5 py-2.5 pl-10 pr-24 text-xs text-white placeholder:text-white/40 outline-none focus:border-secondary transition-colors"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-1 rounded-pill bg-secondary text-primary hover:bg-white text-[10px] font-bold uppercase tracking-wider px-3.5"
                  >
                    Join
                  </Button>
                </div>
                <p className="text-[11px] text-white/40">
                  By joining, you agree to our Privacy Policy and Terms.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/15 bg-forest-dark">
        <div className="container-tight flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} Uclothes Clothing Brand. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Notice</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
