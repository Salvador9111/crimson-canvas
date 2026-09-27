import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AuthShell from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password needs at least 6 characters, darling.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Vault key upgraded to perfection!");
    navigate("/login");
  };

  return (
    <AuthShell
      title="Forge a New Key."
      subtitle="Make it strong, memorable, and as sharp as Savile Row lapels."
      mode="reset"
      sassyTag="Key Update"
      footer={
        <Link
          className="text-[#8B1E3F] hover:text-[#721531] font-bold underline-offset-4 hover:underline transition-colors"
          to="/login"
        >
          ← Return to Sign In
        </Link>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
            Fresh Password
          </Label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 h-4 w-4 text-neutral-400 pointer-events-none" />
            <Input
              className="pl-10 pr-12 h-11 rounded-xl border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20 text-sm transition-all"
              type={showPassword ? "text" : "password"}
              minLength={6}
              required
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-neutral-400 hover:text-neutral-700 transition-colors p-1"
              aria-label={showPassword ? "Conceal password" : "Peek at password"}
              title={showPassword ? "Conceal" : "Peek"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
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
              Securing New Vault Key…
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>Update Vault Key</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>
    </AuthShell>
  );
}
