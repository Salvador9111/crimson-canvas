import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Search, ShoppingBag, User as UserIcon, Menu, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CATEGORIES } from "@/lib/format";

export default function Header() {
  const { user, isAdmin, signOut } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/products?q=${encodeURIComponent(q)}`);
    setOpen(false);
  };

  const navCls = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-opacity duration-300 hover:opacity-60 ${isActive ? "opacity-100" : "opacity-80"}`;

  return (
    <>
      {/* Announcement bar — Khazanay-inspired promo strip */}
      <div className="bg-foreground text-background overflow-hidden">
        <div className="flex items-center justify-center h-9">
          <div className="flex items-center gap-2 animate-marquee whitespace-nowrap">
            <span className="text-[11px] tracking-[0.12em] uppercase font-medium">
              Free Shipping on Orders Over $150 &nbsp;·&nbsp; 30-Day Easy Returns &nbsp;·&nbsp; 100% Authentic Products &nbsp;·&nbsp;
            </span>
            <span className="text-[11px] tracking-[0.12em] uppercase font-medium">
              Free Shipping on Orders Over $150 &nbsp;·&nbsp; 30-Day Easy Returns &nbsp;·&nbsp; 100% Authentic Products &nbsp;·&nbsp;
            </span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-border shadow-soft"
            : "bg-white border-b border-border"
        }`}
      >
        {/* Desktop: 72px, Mobile: 64px per DESIGN.md */}
        <div className="container-tight flex h-[72px] md:h-[72px] items-center justify-between gap-8">
          <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>

          {/* Minimal logo — DESIGN.md */}
          <Link to="/" className="text-xl font-semibold tracking-tight">
            Maison <span className="font-normal">Veil</span>
          </Link>

          {/* Nav links — medium weight, large spacing, small hover fade */}
          <nav className="hidden items-center gap-10 md:flex">
            <NavLink to="/" end className={navCls}>Home</NavLink>
            <NavLink to="/products" className={navCls}>Shop</NavLink>
            {CATEGORIES.map(c => (
              <NavLink key={c.slug} to={`/products?category=${c.slug}`} className="text-sm font-medium opacity-80 transition-opacity duration-300 hover:opacity-60">{c.label}</NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            {/* Prominent search — Khazanay-style pill search bar */}
            <form onSubmit={submit} className="hidden md:flex items-center bg-[#F5F5F5] rounded-pill px-4 py-2 transition-all duration-300 focus-within:bg-[#EAEAEA] focus-within:ring-1 focus-within:ring-foreground/10">
              <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <input
                value={q} onChange={e => setQ(e.target.value)}
                placeholder="Search products..."
                className="w-44 bg-transparent px-2.5 py-0.5 text-sm outline-none placeholder:text-muted-foreground"
              />
            </form>

            <Link to="/products" className="hidden md:block">
              <Heart className="h-5 w-5 opacity-80 transition-opacity duration-300 hover:opacity-60" strokeWidth={1.5} />
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full p-1.5 hover:bg-hover-bg transition-colors duration-200"><UserIcon className="h-5 w-5" strokeWidth={1.5} /></DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem onClick={() => navigate("/account")}>My Account</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/account?tab=orders")}>Orders</DropdownMenuItem>
                  {isAdmin && <DropdownMenuItem onClick={() => navigate("/admin")}>Admin</DropdownMenuItem>}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="text-sm font-medium opacity-80 transition-opacity duration-300 hover:opacity-60">Sign in</Link>
            )}

            {/* Cart with Khazanay-style yellow badge */}
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-khazanay-yellow text-[10px] font-bold text-foreground">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu — slide drawer style per DESIGN.md */}
        {open && (
          <div className="border-t border-border bg-white md:hidden">
            <div className="container-tight space-y-4 py-6">
              <form onSubmit={submit} className="flex items-center bg-[#F5F5F5] rounded-pill px-4 py-3">
                <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products..." className="w-full bg-transparent px-3 py-1 text-sm outline-none" />
              </form>
              <NavLink to="/" end onClick={() => setOpen(false)} className="block py-3 text-sm font-medium">Home</NavLink>
              <NavLink to="/products" onClick={() => setOpen(false)} className="block py-3 text-sm font-medium">Shop</NavLink>
              {CATEGORIES.map(c => (
                <NavLink key={c.slug} to={`/products?category=${c.slug}`} onClick={() => setOpen(false)} className="block py-3 text-sm font-medium">{c.label}</NavLink>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
