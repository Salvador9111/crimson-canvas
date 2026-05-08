import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AuthShell from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${window.location.origin}/`, data: { full_name: name } },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created");
    navigate("/verify-email");
  };

  return (
    <AuthShell title="Create account" subtitle="Join Maison Veil."
      footer={<>Have an account? <Link className="text-foreground underline-offset-4 hover:underline font-medium" to="/login">Sign in</Link></>}>
      <form onSubmit={submit} className="space-y-5">
        <div><Label>Full name</Label><Input className="rounded-lg mt-1.5" required value={name} onChange={e => setName(e.target.value)} /></div>
        <div><Label>Email</Label><Input className="rounded-lg mt-1.5" type="email" required value={email} onChange={e => setEmail(e.target.value)} /></div>
        <div><Label>Password</Label><Input className="rounded-lg mt-1.5" type="password" minLength={6} required value={password} onChange={e => setPassword(e.target.value)} /></div>
        <Button type="submit" disabled={loading} className="w-full rounded-pill">{loading ? "Creating…" : "Create account"}</Button>
      </form>
    </AuthShell>
  );
}
