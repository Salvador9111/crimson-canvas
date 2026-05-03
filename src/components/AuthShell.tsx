import { Link } from "react-router-dom";

export default function AuthShell({ title, subtitle, children, footer }: {
  title: string; subtitle?: string; children: React.ReactNode; footer?: React.ReactNode;
}) {
  return (
    <div className="container-tight grid min-h-[80vh] place-items-center py-16">
      <div className="w-full max-w-md">
        <Link to="/" className="font-display block text-2xl font-semibold">
          Maison <span className="text-primary">Veil</span>
        </Link>
        <h1 className="font-display mt-8 text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
        <div className="mt-8 space-y-4">{children}</div>
        {footer && <div className="mt-6 text-sm text-muted-foreground">{footer}</div>}
      </div>
    </div>
  );
}
