import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AuthShell from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back");
    navigate("/");
  };

  return (
    <AuthShell title="Sign in" subtitle="Welcome back to Maison Veil."
      footer={<>New here? <Link className="text-primary underline-offset-4 hover:underline" to="/signup">Create account</Link></>}>
      <form onSubmit={submit} className="space-y-4">
        <div><Label>Email</Label><Input className="rounded-none" type="email" required value={email} onChange={e => setEmail(e.target.value)} /></div>
        <div>
          <div className="flex justify-between"><Label>Password</Label>
            <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-primary">Forgot?</Link>
          </div>
          <Input className="rounded-none" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <Button type="submit" disabled={loading} className="w-full rounded-none">{loading ? "Signing in…" : "Sign in"}</Button>
      </form>
    </AuthShell>
  );
}
