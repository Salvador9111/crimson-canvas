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
            ? "bg-white/95 backdrop-blur-md shadow-soft border-b border-border/80"
            : "bg-white border-b border-border"
        }`}
      >
        <div className="container-tight flex h-[72px] items-center justify-between gap-6">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-1.5 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Menu className="h-5 w-5" strokeWidth={1.75} />}
          </button>

          {/* Logo — Clean contemporary typography */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold tracking-tight text-charcoal-dark group-hover:text-primary transition-colors">
              Uclothes
            </span>
          </Link>

          {/* Nav links — clean text without colored background pills */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/" className={getLinkCls(location.pathname === "/")}>Home</Link>
            <Link to="/products" className={getLinkCls(location.pathname === "/products" && !currentCategory)}>Shop All</Link>
            {CATEGORIES.map(c => (
              <Link
                key={c.slug}
                to={`/products?category=${c.slug}`}
                className={getLinkCls(location.pathname === "/products" && currentCategory === c.slug)}
              >
                {c.label}
              </Link>
            ))}
            <Link to="/about" className={getLinkCls(location.pathname === "/about")}>About</Link>
          </nav>

          {/* Actions: Search, Wishlist, User, Bag */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <form
              onSubmit={submit}
              className={`hidden md:flex items-center h-10 rounded-pill bg-background border transition-all duration-300 px-4 ${
                searchFocused
                  ? "border-primary ring-2 ring-primary/20 w-64 bg-white"
                  : "border-border hover:border-border/80 w-48"
              }`}
            >
              <Search className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.75} />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search"
                className="w-full bg-transparent px-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </form>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-foreground/80 hover:text-primary transition-colors rounded-full hover:bg-secondary/60"
              aria-label="View wishlist"
            >
              <Heart className="h-5 w-5" strokeWidth={1.75} />
              {wishlistCount > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account dropdown */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="rounded-full p-2 text-foreground/80 hover:text-primary hover:bg-secondary/60 transition-colors outline-none"
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
                    <DropdownMenuItem onClick={() => navigate("/admin")} className="rounded-lg cursor-pointer text-primary font-medium">
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
                className="hidden sm:inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-foreground/80 hover:text-primary transition-colors px-2 py-1"
              >
                Sign in
              </Link>
            )}

            {/* Shopping Bag */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center rounded-full bg-secondary/80 p-2.5 text-primary hover:bg-secondary transition-all hover:scale-105"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-border bg-white md:hidden animate-fade-up">
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
                <Link to="/products" onClick={() => setOpen(false)} className={`block px-3 py-2 text-sm font-medium ${location.pathname === "/products" && !currentCategory ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"}`}>Shop All</Link>
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
                <NavLink to="/wishlist" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-secondary">
                  Wishlist ({wishlistCount})
                </NavLink>
                {!user && (
                  <NavLink to="/login" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-primary rounded-lg hover:bg-secondary">
                    Sign in / Register
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
