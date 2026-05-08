export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[#FAFAFA]">
      <div className="container-tight grid gap-12 py-16 md:grid-cols-4">
        <div>
          <p className="text-lg font-semibold tracking-tight">Maison Veil</p>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">Quietly considered clothing for everyday elegance.</p>
        </div>
        <div>
          <h4 className="uppercase-tracked mb-4 text-foreground">Shop</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="transition-colors duration-200 hover:text-foreground cursor-pointer">Shirts</li>
            <li className="transition-colors duration-200 hover:text-foreground cursor-pointer">T-Shirts</li>
            <li className="transition-colors duration-200 hover:text-foreground cursor-pointer">Trousers</li>
          </ul>
        </div>
        <div>
          <h4 className="uppercase-tracked mb-4 text-foreground">Help</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="transition-colors duration-200 hover:text-foreground cursor-pointer">Shipping</li>
            <li className="transition-colors duration-200 hover:text-foreground cursor-pointer">Returns</li>
            <li className="transition-colors duration-200 hover:text-foreground cursor-pointer">Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="uppercase-tracked mb-4 text-foreground">Newsletter</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">Quiet emails. New collections, no clutter.</p>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Maison Veil. All rights reserved.
      </div>
    </footer>
  );
}
