import { Link } from "react-router-dom";
import AuthShell from "@/components/AuthShell";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
  return (
    <AuthShell title="Check your email" subtitle="We've sent you a verification link.">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
        <MailCheck className="h-7 w-7 text-foreground" strokeWidth={1.5} />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Open the link in your inbox to confirm your address. You can close this tab once verified.
      </p>
      <Button asChild variant="outline" className="rounded-pill"><Link to="/login">Back to sign in</Link></Button>
    </AuthShell>
  );
}
