import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AuthShell from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated");
    navigate("/login");
  };

  return (
    <AuthShell title="Set new password" subtitle="Choose a new password for your account.">
      <form onSubmit={submit} className="space-y-4">
        <div><Label>New password</Label><Input className="rounded-none" type="password" minLength={6} required value={password} onChange={e => setPassword(e.target.value)} /></div>
        <Button type="submit" disabled={loading} className="w-full rounded-none">{loading ? "Updating…" : "Update password"}</Button>
      </form>
    </AuthShell>
  );
}
