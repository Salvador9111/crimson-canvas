import { Link } from "react-router-dom";
import AuthShell from "@/components/AuthShell";
import { MailCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
  return (
    <AuthShell
      title="Check Your Inbox."
      subtitle="We’ve dispatched a bespoke verification courier to your email address."
      mode="verify"
      sassyTag="VIP Dispatch"
      footer={
        <Link
          className="text-[#8B1E3F] hover:text-[#721531] font-bold underline-offset-4 hover:underline transition-colors"
          to="/login"
        >
          ← Already verified? Sign in
        </Link>
      }
    >
      <div className="space-y-5 text-center py-2">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#8B1E3F]/10 border border-[#8B1E3F]/20 text-[#8B1E3F] animate-fade-up">
          <MailCheck className="h-8 w-8" strokeWidth={1.75} />
        </div>

        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-neutral-900">
            One Click Away From Archive Access
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed max-w-sm mx-auto">
            Open the link in your inbox to seal your member credentials. Once confirmed, your bespoke recommendations and private fittings await.
          </p>
        </div>

        <div className="pt-2">
          <Button
            asChild
            className="w-full rounded-pill bg-[#8B1E3F] hover:bg-[#721531] text-white py-5 text-sm font-semibold tracking-wide shadow-soft transition-all duration-300 hover:shadow-[0_8px_25px_rgba(139,30,63,0.35)]"
          >
            <Link to="/login" className="flex items-center justify-center gap-2">
              <span>Return to Sign In</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </AuthShell>
  );
}
