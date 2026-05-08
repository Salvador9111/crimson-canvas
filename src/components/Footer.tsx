import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-24">
      {/* Khazanay-inspired bright yellow footer section */}
      <div className="bg-khazanay-yellow">
        <div className="container-tight py-16">
          <div className="grid gap-12 md:grid-cols-4">
            {/* Brand */}
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">Uclothes</p>
              <p className="mt-4 text-sm text-foreground/70 leading-relaxed">
                Quietly considered clothing for everyday elegance. Honest fabrics, refined cuts, made to outlast trends.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a href="#" className="text-foreground/70 transition-colors duration-200 hover:text-foreground" aria-label="Instagram">
                  <Instagram className="h-5 w-5" strokeWidth={1.5} />
                </a>
                <a href="#" className="text-foreground/70 transition-colors duration-200 hover:text-foreground" aria-label="Facebook">
                  <Facebook className="h-5 w-5" strokeWidth={1.5} />
                </a>
                <a href="#" className="text-foreground/70 transition-colors duration-200 hover:text-foreground" aria-label="Twitter">
                  <Twitter className="h-5 w-5" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">Shop</h4>
              <ul className="mt-5 space-y-3.5">
                <li><Link to="/products?category=shirts" className="text-sm text-foreground/70 transition-colors duration-200 hover:text-foreground">Shirts</Link></li>
                <li><Link to="/products?category=t-shirts" className="text-sm text-foreground/70 transition-colors duration-200 hover:text-foreground">T-Shirts</Link></li>
                <li><Link to="/products?category=trousers" className="text-sm text-foreground/70 transition-colors duration-200 hover:text-foreground">Trousers</Link></li>
                <li><Link to="/products" className="text-sm text-foreground/70 transition-colors duration-200 hover:text-foreground">All Products</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">Support</h4>
              <ul className="mt-5 space-y-3.5">
                <li><span className="text-sm text-foreground/70 transition-colors duration-200 hover:text-foreground cursor-pointer">Shipping Policy</span></li>
                <li><span className="text-sm text-foreground/70 transition-colors duration-200 hover:text-foreground cursor-pointer">Returns & Exchanges</span></li>
                <li><span className="text-sm text-foreground/70 transition-colors duration-200 hover:text-foreground cursor-pointer">Size Guide</span></li>
                <li><span className="text-sm text-foreground/70 transition-colors duration-200 hover:text-foreground cursor-pointer">Contact Us</span></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">Newsletter</h4>
              <p className="mt-5 text-sm text-foreground/70 leading-relaxed">Quiet emails. New collections, no clutter.</p>
              <form onSubmit={e => { e.preventDefault(); setEmail(""); }} className="mt-5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" strokeWidth={1.5} />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="w-full rounded-pill border-2 border-foreground/20 bg-transparent py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground/40 outline-none focus:border-foreground transition-colors duration-200"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-pill bg-foreground px-6 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-khazanay-yellow transition-opacity duration-200 hover:opacity-90"
                  >
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-foreground">
        <div className="container-tight flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 md:flex-row">
          <span>© {new Date().getFullYear()} Uclothes. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="cursor-pointer transition-colors duration-200 hover:text-white/80">Privacy Policy</span>
            <span className="cursor-pointer transition-colors duration-200 hover:text-white/80">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
