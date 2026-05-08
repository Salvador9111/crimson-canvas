import { Link } from "react-router-dom";

export default function AuthShell({ title, subtitle, children, footer }: {
  title: string; subtitle?: string; children: React.ReactNode; footer?: React.ReactNode;
}) {
  return (
    <div className="container-tight grid min-h-[80vh] place-items-center py-16">
      <div className="w-full max-w-md animate-fade-up">
        <Link to="/" className="block text-xl font-semibold tracking-tight">
          Maison <span className="font-normal">Veil</span>
        </Link>
        <h1 className="mt-10 text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
        <div className="mt-8 space-y-5">{children}</div>
        {footer && <div className="mt-8 text-sm text-muted-foreground">{footer}</div>}
      </div>
    </div>
  );
}
