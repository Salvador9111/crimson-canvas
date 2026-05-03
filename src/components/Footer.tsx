export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container-tight grid gap-8 py-12 md:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold">Maison Veil</p>
          <p className="mt-2 text-sm text-muted-foreground">Quietly considered clothing for everyday elegance.</p>
        </div>
        <div>
          <h4 className="uppercase-tracked mb-3 text-foreground">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Shirts</li><li>T-Shirts</li><li>Trousers</li>
          </ul>
        </div>
        <div>
          <h4 className="uppercase-tracked mb-3 text-foreground">Help</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Shipping</li><li>Returns</li><li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="uppercase-tracked mb-3 text-foreground">Newsletter</h4>
          <p className="text-sm text-muted-foreground">Quiet emails. New collections, no clutter.</p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Maison Veil. All rights reserved.
      </div>
    </footer>
  );
}
