import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X, Settings2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getStoredCookiePreferences,
  acceptAllCookies,
  rejectNonEssentialCookies,
  saveCookiePreferences,
  type CookiePreferences,
} from "@/lib/cookieConsent";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(getStoredCookiePreferences());

  useEffect(() => {
    const current = getStoredCookiePreferences();
    setPrefs(current);
    if (!current.hasConsented) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }

    const handleConsentUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<CookiePreferences>;
      if (customEvent.detail) {
        setPrefs(customEvent.detail);
      }
    };

    const handleOpenModal = () => {
      setIsVisible(true);
      setIsCustomizeOpen(true);
    };

    window.addEventListener("crimson-cookie-consent-updated", handleConsentUpdate);
    window.addEventListener("crimson-open-cookie-settings", handleOpenModal);

    return () => {
      window.removeEventListener("crimson-cookie-consent-updated", handleConsentUpdate);
      window.removeEventListener("crimson-open-cookie-settings", handleOpenModal);
    };
  }, []);

  const handleAcceptAll = () => {
    const updated = acceptAllCookies();
    setPrefs(updated);
    setIsVisible(false);
    setIsCustomizeOpen(false);
    toast.success("Cookie preferences saved: All cookies accepted.", {
      description: "Your session and personalized store experiences are active.",
    });
  };

  const handleRejectAll = () => {
    const updated = rejectNonEssentialCookies();
    setPrefs(updated);
    setIsVisible(false);
    setIsCustomizeOpen(false);
    toast.info("Cookie preferences saved: Only essential cookies active.", {
      description: "Non-essential analytics and marketing cookies have been disabled.",
    });
  };

  const handleSaveCustom = () => {
    const updated = saveCookiePreferences({
      functional: prefs.functional,
      analytics: prefs.analytics,
      marketing: prefs.marketing,
      hasConsented: true,
    });
    setPrefs(updated);
    setIsVisible(false);
    setIsCustomizeOpen(false);
    toast.success("Preferences updated successfully.", {
      description: "Your tailored privacy choices have been recorded.",
    });
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie Preferences and Consent"
      className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 sm:max-w-[420px] w-auto animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#141212]/95 backdrop-blur-xl p-4 sm:p-5 text-white shadow-2xl">
        {/* Signature Crimson Stripe */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8B1E3F]" />

        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#8B1E3F]/20 text-[#E5B6BD] border border-[#8B1E3F]/40 shrink-0">
                <Cookie className="h-3.5 w-3.5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-white">
                  Cookie &amp; Privacy Preferences
                </h3>
                <p className="text-[10px] text-neutral-400">
                  Transparent choices for your shopping privacy.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors shrink-0"
              aria-label="Dismiss cookie notice"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed font-light">
            We use essential cookies to maintain your bag and secure checkout. Optional cookies help us refine garment displays and measure store speed. Explore our{" "}
            <Link to="/privacy" className="text-[#E5B6BD] underline underline-offset-2 hover:text-white">
              Privacy Notice
            </Link>{" "}
            and{" "}
            <Link to="/cookies" className="text-[#E5B6BD] underline underline-offset-2 hover:text-white">
              Cookie Policy
            </Link>
            .
          </p>

          {/* Interactive Customize Drawer */}
          {isCustomizeOpen && (
            <div className="mt-1 space-y-2.5 rounded-xl border border-white/10 bg-white/5 p-3 text-xs max-h-60 overflow-y-auto">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <div className="pr-3">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-white text-[11px]">Strictly Necessary</span>
                    <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-semibold text-emerald-300 border border-emerald-500/30">
                      Active
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400">
                    Required for sign-in, bag memory, and checkout.
                  </p>
                </div>
                <Switch checked={true} disabled className="opacity-70 cursor-not-allowed scale-90" />
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <div className="pr-3">
                  <span className="font-medium text-white text-[11px]">Functional &amp; Preferences</span>
                  <p className="text-[10px] text-neutral-400">
                    Remembers wishlist, sizing, and currency choices.
                  </p>
                </div>
                <Switch
                  checked={prefs.functional}
                  onCheckedChange={(checked) => setPrefs((p) => ({ ...p, functional: checked }))}
                  className="scale-90"
                />
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <div className="pr-3">
                  <span className="font-medium text-white text-[11px]">Analytics &amp; Performance</span>
                  <p className="text-[10px] text-neutral-400">
                    Anonymously evaluates store traffic and page speed.
                  </p>
                </div>
                <Switch
                  checked={prefs.analytics}
                  onCheckedChange={(checked) => setPrefs((p) => ({ ...p, analytics: checked }))}
                  className="scale-90"
                />
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="pr-3">
                  <span className="font-medium text-white text-[11px]">Marketing &amp; Personalization</span>
                  <p className="text-[10px] text-neutral-400">
                    Informs private release announcements and recommendations.
                  </p>
                </div>
                <Switch
                  checked={prefs.marketing}
                  onCheckedChange={(checked) => setPrefs((p) => ({ ...p, marketing: checked }))}
                  className="scale-90"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="grid grid-cols-2 gap-2">
              {isCustomizeOpen ? (
                <Button
                  size="sm"
                  onClick={handleSaveCustom}
                  className="col-span-2 h-8 rounded-pill bg-[#8B1E3F] hover:bg-[#721531] text-white text-xs font-semibold"
                >
                  <Check className="h-3.5 w-3.5 mr-1" />
                  Save Preferences
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRejectAll}
                    className="h-8 rounded-pill border-white/20 bg-transparent text-white text-[11px] sm:text-xs hover:bg-white/10 hover:text-white px-2.5 truncate"
                  >
                    Reject Non-Essential
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAcceptAll}
                    className="h-8 rounded-pill bg-[#8B1E3F] hover:bg-[#721531] text-white text-[11px] sm:text-xs font-semibold px-2.5 shadow-sm truncate"
                  >
                    Accept All
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-0.5">
              <button
                type="button"
                onClick={() => setIsCustomizeOpen(!isCustomizeOpen)}
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                <Settings2 className="h-3 w-3" />
                <span>{isCustomizeOpen ? "Hide Options" : "Customize"}</span>
              </button>

              <Link
                to="/cookies"
                onClick={() => setIsVisible(false)}
                className="hover:text-white underline underline-offset-2 transition-colors"
              >
                Full Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
