import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Search, ShoppingBag, User as UserIcon, Menu, X } from "lucide-react";
import { useState } from "react";
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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/products?q=${encodeURIComponent(q)}`);
    setOpen(false);
  };

  const navCls = ({ isActive }: { isActive: boolean }) =>
    `uppercase-tracked transition-colors hover:text-primary ${isActive ? "text-primary" : "text-foreground"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="container-tight flex h-16 items-center justify-between gap-6">
        <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" className="font-display text-2xl font-semibold tracking-tight">
          Maison <span className="text-primary">Veil</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navCls}>Home</NavLink>
          <NavLink to="/products" className={navCls}>Shop</NavLink>
          {CATEGORIES.map(c => (
            <NavLink key={c.slug} to={`/products?category=${c.slug}`} className="uppercase-tracked text-foreground hover:text-primary">{c.label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <form onSubmit={submit} className="hidden md:flex items-center border-b border-border focus-within:border-primary">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search"
              className="w-40 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
            />
          </form>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full p-1 hover:bg-secondary"><UserIcon className="h-5 w-5" /></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={() => navigate("/account")}>My Account</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/account?tab=orders")}>Orders</DropdownMenuItem>
                {isAdmin && <DropdownMenuItem onClick={() => navigate("/admin")}>Admin</DropdownMenuItem>}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="uppercase-tracked hover:text-primary">Sign in</Link>
          )}

          <Link to="/cart" className="relative">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="border-t border-border md:hidden">
          <div className="container-tight space-y-3 py-4">
            <form onSubmit={submit} className="flex items-center border-b border-border">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search" className="w-full bg-transparent px-2 py-2 text-sm outline-none" />
            </form>
            <NavLink to="/" end onClick={() => setOpen(false)} className="block py-2 uppercase-tracked">Home</NavLink>
            <NavLink to="/products" onClick={() => setOpen(false)} className="block py-2 uppercase-tracked">Shop</NavLink>
            {CATEGORIES.map(c => (
              <NavLink key={c.slug} to={`/products?category=${c.slug}`} onClick={() => setOpen(false)} className="block py-2 uppercase-tracked">{c.label}</NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
