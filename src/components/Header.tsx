import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Search, ShoppingBag, User as UserIcon, Menu, X, Heart, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CATEGORIES } from "@/lib/format";

export default function Header() {
  const { user, isAdmin, signOut } = useAuth();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const currentCategory = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      navigate(`/products?q=${encodeURIComponent(q.trim())}`);
      setOpen(false);
    }
  };

  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkCls = (active: boolean) =>
    `text-sm font-medium transition-colors duration-200 ${
      active
        ? "text-primary font-semibold"
        : "text-foreground/75 hover:text-foreground"
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-b border-neutral-200/60"
            : "bg-white/70 backdrop-blur-md border-b border-neutral-200/50 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
        }`}
      >
        <div className="container-tight flex h-[72px] items-center justify-between gap-4">
          {/* Left: Mobile menu trigger & Brand Logo */}
          <div className="flex-1 flex items-center justify-start gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-1.5 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Menu className="h-5 w-5" strokeWidth={1.75} />}
            </button>

            {/* Logo — CRIMSON CANVAS typography matching reference */}
            <Link to="/" className="flex flex-col group py-0.5 select-none">
              <span className="font-serif text-lg sm:text-xl font-extrabold tracking-[0.18em] text-neutral-900 leading-none uppercase">
                CRIMSON
              </span>
              <span className="font-serif text-[10px] sm:text-[11px] font-bold tracking-[0.32em] text-[#8B1E3F] leading-tight mt-0.5 uppercase">
                CANVAS
              </span>
            </Link>
          </div>

          {/* Nav links — 5 clean uppercase buttons perfectly centralized */}
          <nav className="hidden items-center justify-center gap-5 md:gap-6 lg:gap-8 md:flex shrink-0">
            <Link to="/" className={getLinkCls(location.pathname === "/")}>
              HOME
            </Link>
            <Link to="/products" className={getLinkCls(location.pathname === "/products" && !currentCategory && !location.search.includes("sort=newest"))}>
              SHOP
            </Link>
            <Link to="/products?sort=newest" className={getLinkCls(location.search.includes("sort=newest"))}>
              NEW ARRIVALS
            </Link>
            <Link to="/about" className={getLinkCls(location.pathname === "/about")}>
              MATERIALS
            </Link>
            <button
              type="button"
              onClick={scrollToFooter}
              className="text-sm font-medium text-foreground/75 hover:text-foreground transition-colors duration-200 cursor-pointer uppercase tracking-normal"
            >
              CONTACT
            </button>
          </nav>

          {/* Right Actions: Search icon, Wishlist, Bag, Account matching reference */}
          <div className="flex-1 flex items-center justify-end gap-4 sm:gap-5">
            {/* Search Icon Trigger / Expandable Input */}
            <div className="relative flex items-center">
              {searchFocused ? (
                <form
                  onSubmit={submit}
                  className="flex items-center h-9 rounded-full bg-neutral-100 border border-[#8B1E3F] ring-2 ring-[#8B1E3F]/20 px-3 w-48 sm:w-60 transition-all duration-300"
                >
                  <Search className="h-4 w-4 text-neutral-500 shrink-0" strokeWidth={1.75} />
                  <input
                    autoFocus
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    onBlur={() => !q && setSearchFocused(false)}
                    placeholder="Search collection..."
                    className="w-full bg-transparent px-2 text-xs text-foreground placeholder:text-neutral-400 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchFocused(false)}
                    className="text-neutral-400 hover:text-neutral-700 text-xs px-1"
                  >
                    ✕
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchFocused(true)}
                  className="p-1.5 text-neutral-800 hover:text-[#8B1E3F] transition-colors rounded-full hover:bg-neutral-100 cursor-pointer"
                  aria-label="Open search"
                >
                  <Search className="h-5 w-5" strokeWidth={1.75} />
                </button>
              )}
            </div>

            {/* Wishlist Link with Crimson Circular Badge */}
            <Link
              to="/wishlist"
              className="relative p-1.5 text-neutral-800 hover:text-[#8B1E3F] transition-colors rounded-full hover:bg-neutral-100"
              aria-label="View wishlist"
            >
              <Heart className="h-5 w-5" strokeWidth={1.75} />
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#8B1E3F] text-[10px] font-bold text-white shadow-sm ring-1 ring-white">
                {wishlistCount}
              </span>
            </Link>

            {/* Shopping Bag with Crimson Circular Badge */}
            <Link
              to="/cart"
              className="relative p-1.5 text-neutral-800 hover:text-[#8B1E3F] transition-colors rounded-full hover:bg-neutral-100"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#8B1E3F] text-[10px] font-bold text-white shadow-sm ring-1 ring-white">
                {cartCount}
              </span>
            </Link>

            {/* Account dropdown */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="rounded-full p-1.5 text-neutral-800 hover:text-[#8B1E3F] hover:bg-neutral-100 transition-colors outline-none"
                  aria-label="Account options"
                >
                  <UserIcon className="h-5 w-5" strokeWidth={1.75} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 p-1.5 shadow-card rounded-xl border border-border">
                  <DropdownMenuItem onClick={() => navigate("/account")} className="rounded-lg cursor-pointer">
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/account?tab=orders")} className="rounded-lg cursor-pointer">
                    Orders & History
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/wishlist")} className="rounded-lg cursor-pointer">
                    Wishlist ({wishlistCount})
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate("/admin")} className="rounded-lg cursor-pointer text-[#8B1E3F] font-medium">
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="rounded-lg cursor-pointer text-destructive">
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                className="p-1.5 text-neutral-800 hover:text-[#8B1E3F] transition-colors rounded-full hover:bg-neutral-100"
                aria-label="Sign in"
              >
                <UserIcon className="h-5 w-5" strokeWidth={1.75} />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-neutral-200/60 bg-white/85 backdrop-blur-xl md:hidden animate-fade-up shadow-lg">
            <div className="container-tight space-y-3 py-6">
              <form onSubmit={submit} className="flex items-center rounded-pill bg-background border border-border px-4 py-2.5">
                <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
                <input
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="Search"
                  className="w-full bg-transparent px-3 text-sm outline-none"
                />
              </form>
              <div className="pt-2 space-y-1">
                <Link to="/" onClick={() => setOpen(false)} className={`block px-3 py-2 text-sm font-medium ${location.pathname === "/" ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"}`}>Home</Link>
                <Link to="/products" onClick={() => setOpen(false)} className={`block px-3 py-2 text-sm font-medium ${location.pathname === "/products" && !currentCategory && !location.search.includes("sort=newest") ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"}`}>Shop All</Link>
                <Link to="/products?sort=newest" onClick={() => setOpen(false)} className={`block px-3 py-2 text-sm font-medium ${location.search.includes("sort=newest") ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"}`}>New Arrivals</Link>
                {CATEGORIES.map(c => (
                  <Link
                    key={c.slug}
                    to={`/products?category=${c.slug}`}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium ${location.pathname === "/products" && currentCategory === c.slug ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"}`}
                  >
                    {c.label}
                  </Link>
                ))}
                <Link to="/about" onClick={() => setOpen(false)} className={`block px-3 py-2 text-sm font-medium ${location.pathname === "/about" ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"}`}>About</Link>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setTimeout(scrollToFooter, 150);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground cursor-pointer"
                >
                  Contact
                </button>
                <Link to="/wishlist" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-secondary">
                  Wishlist ({wishlistCount})
                </Link>
                {!user && (
                  <Link to="/login" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-primary rounded-lg hover:bg-secondary">
                    Sign in / Register
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
