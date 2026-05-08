import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AuthShell from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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
  };

  return (
    <AuthShell title="Reset password" subtitle="We'll send you a link to reset your password."
      footer={<Link className="text-foreground font-medium hover:underline underline-offset-4" to="/login">Back to sign in</Link>}>
      {sent ? (
        <p className="text-sm text-muted-foreground">If an account exists for {email}, a reset link is on the way.</p>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <div><Label>Email</Label><Input className="rounded-lg mt-1.5" type="email" required value={email} onChange={e => setEmail(e.target.value)} /></div>
          <Button type="submit" disabled={loading} className="w-full rounded-pill">{loading ? "Sending…" : "Send reset link"}</Button>
        </form>
      )}
    </AuthShell>
  );
}
