import { Link } from "react-router-dom";

export default function AuthShell({ title, subtitle, children, footer }: {
  title: string; subtitle?: string; children: React.ReactNode; footer?: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[#FAFAFA]">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #111 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="relative container-tight grid min-h-screen place-items-center py-16">
          <div className="w-full max-w-md animate-fade-up">
          <Link to="/" className="block text-xl font-semibold tracking-tight">
            Uclothes
          </Link>
          <h1 className="mt-10 text-3xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}

          <div className="mt-8 rounded-2xl bg-white p-8 shadow-card">
            {children}
          </div>

          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
