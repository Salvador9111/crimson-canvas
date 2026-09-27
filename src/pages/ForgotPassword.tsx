import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AuthShell from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    setSent(true);
    toast.success("Recovery dispatch on its way!");
  };

  return (
    <AuthShell
      title="Keys to the Vault."
      subtitle="Happens to the best of us. Even icons occasionally misplace things."
      mode="forgot"
      footer={
        <Link
          className="text-[#8B1E3F] hover:text-[#721531] font-bold underline-offset-4 hover:underline transition-colors"
          to="/login"
        >
          ← Go back
        </Link>
      }
    >
      {sent ? (
        <div className="space-y-4 py-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#8B1E3F]/10 text-[#8B1E3F]">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-neutral-900">Dispatch in Transit</h3>
          <p className="text-xs text-neutral-600 leading-relaxed max-w-sm mx-auto">
            If an archive profile exists for <strong className="text-neutral-900">{email}</strong>, a confidential reset dispatch is winging its way to your inbox right now.
          </p>
          <div className="pt-2">
            <Button asChild variant="outline" className="rounded-pill border-neutral-300 text-xs font-semibold">
              <Link to="/login">Go back</Link>
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
              Your Registered Email
            </Label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 h-4 w-4 text-neutral-400 pointer-events-none" />
              <Input
                className="pl-10 h-11 rounded-xl border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20 text-sm transition-all"
                type="email"
                required
                placeholder="curator@crimsoncanvas.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-pill bg-[#8B1E3F] hover:bg-[#721531] text-white py-5 text-sm font-semibold tracking-wide shadow-soft transition-all duration-300 hover:shadow-[0_8px_25px_rgba(139,30,63,0.35)] cursor-pointer mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 animate-spin text-[#E5B6BD]" />
                Sending Code…
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Get Code</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
