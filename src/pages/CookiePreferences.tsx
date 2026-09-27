import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Cookie, 
  ShieldCheck, 
  Check, 
  Settings2, 
  Sliders, 
  RotateCcw, 
  Info, 
  Lock, 
  Sparkles, 
  BarChart3, 
  Megaphone, 
  ArrowRight, 
  ExternalLink,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  getStoredCookiePreferences,
  saveCookiePreferences,
  acceptAllCookies,
  rejectNonEssentialCookies,
  DEFAULT_PREFERENCES,
  type CookiePreferences as PreferencesType
} from "@/lib/cookieConsent";

export default function CookiePreferences() {
  const [prefs, setPrefs] = useState<PreferencesType>(DEFAULT_PREFERENCES);
  const [savedTime, setSavedTime] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const current = getStoredCookiePreferences();
    setPrefs(current);
    if (current.updatedAt) {
      setSavedTime(new Date(current.updatedAt).toLocaleString());
    }

    const handleConsentUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<PreferencesType>;
      if (customEvent.detail) {
        setPrefs(customEvent.detail);
        if (customEvent.detail.updatedAt) {
          setSavedTime(new Date(customEvent.detail.updatedAt).toLocaleString());
        }
      }
    };

    window.addEventListener("crimson-cookie-consent-updated", handleConsentUpdate);
    return () => {
      window.removeEventListener("crimson-cookie-consent-updated", handleConsentUpdate);
    };
  }, []);

  const handleToggle = (key: "functional" | "analytics" | "marketing", val: boolean) => {
    setPrefs((prev) => ({ ...prev, [key]: val }));
    setHasChanges(true);
  };

  const handleSave = () => {
    const updated = saveCookiePreferences({
      functional: prefs.functional,
      analytics: prefs.analytics,
      marketing: prefs.marketing,
      hasConsented: true,
    });
    setPrefs(updated);
    setHasChanges(false);
    if (updated.updatedAt) {
      setSavedTime(new Date(updated.updatedAt).toLocaleString());
    }
    toast.success("Preferences Saved Successfully", {
      description: "Your personalized cookie configuration is now active across Crimson Canvas.",
    });
  };

  const handleAcceptAll = () => {
    const updated = acceptAllCookies();
    setPrefs(updated);
    setHasChanges(false);
    if (updated.updatedAt) {
      setSavedTime(new Date(updated.updatedAt).toLocaleString());
    }
    toast.success("All Cookies Accepted", {
      description: "You have enabled essential, functional, analytical, and tailored styling cookies.",
    });
  };

  const handleRejectNonEssential = () => {
    const updated = rejectNonEssentialCookies();
    setPrefs(updated);
    setHasChanges(false);
    if (updated.updatedAt) {
      setSavedTime(new Date(updated.updatedAt).toLocaleString());
    }
    toast.info("Non-Essential Cookies Disabled", {
      description: "Only strictly necessary cookies required for checkout and bag retention remain active.",
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 animate-fade-up">
      {/* Editorial Header Banner */}
      <section className="relative overflow-hidden bg-[#141212] py-16 sm:py-20 text-white isolate">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#8B1E3F]" aria-hidden="true" />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#8B1E3F]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container-tight relative z-10 pl-6 sm:pl-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-widest text-[#E5B6BD] uppercase border border-white/10">
                <Cookie className="h-3.5 w-3.5" />
                Consent & Privacy Center
              </span>
              <h1 className="mt-3 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Cookie Preferences
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                Take full control over how Crimson Canvas uses cookies, browser storage, and telemetry to power your shopping experience.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectNonEssential}
                className="h-9 rounded-pill border-white/20 bg-white/5 text-xs text-white hover:bg-white/15 hover:text-white"
              >
                Reject Non-Essential
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="h-9 rounded-pill bg-[#8B1E3F] hover:bg-[#721531] text-xs font-semibold text-white px-5 shadow-sm"
              >
                Accept All Cookies
              </Button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Consent State:</span>
              <strong className="text-white font-medium">
                {prefs.hasConsented ? "Active & Configured" : "Default / Unsaved"}
              </strong>
            </div>

            {savedTime && (
              <div className="text-neutral-400">
                Last Updated: <span className="text-neutral-200 font-medium">{savedTime}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Interactive Preferences Manager */}
      <section className="container-tight py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Left Column: Interactive Categories */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                    Cookie Management Center
                  </h2>
                  <p className="mt-1 text-xs text-neutral-500 font-light">
                    Toggle your preferences below. Changes take effect across your current and future visits.
                  </p>
                </div>

                {hasChanges && (
                  <Button
                    onClick={handleSave}
                    size="sm"
                    className="h-8.5 rounded-pill bg-[#8B1E3F] hover:bg-[#721531] text-xs text-white px-4 animate-in fade-in"
                  >
                    <Save className="mr-1.5 h-3.5 w-3.5" />
                    Save Changes
                  </Button>
                )}
              </div>

              {/* Category 1: Strictly Necessary */}
              <div className="py-6 border-b border-neutral-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800">
                        <Lock className="h-3.5 w-3.5" />
                      </div>
                      <h3 className="text-sm font-bold text-neutral-900">
                        1. Strictly Necessary Cookies
                      </h3>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                        Always Active
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed font-light pl-9.5">
                      These cookies are essential for our digital store to operate securely. They maintain your shopping bag items, keep your authentication session active, enable checkout transactions, and protect against cross-site request forgery (CSRF). They cannot be switched off in our systems.
                    </p>
                  </div>
                  <Switch checked={true} disabled className="opacity-70 cursor-not-allowed mt-1" />
                </div>

                <div className="mt-4 ml-9.5 rounded-xl bg-[#FAFAFA] p-3.5 text-[11px] text-neutral-600 border border-neutral-200/70">
                  <span className="font-semibold text-neutral-800">Examples:</span>{" "}
                  <code>sb-*-auth-token</code> (Secure user sign-in session), <code>cart-storage</code> (Shopping bag memory), <code>csrf_token</code> (Checkout fraud safeguard).
                </div>
              </div>

              {/* Category 2: Functional & Preferences */}
              <div className="py-6 border-b border-neutral-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800">
                        <Sliders className="h-3.5 w-3.5" />
                      </div>
                      <h3 className="text-sm font-bold text-neutral-900">
                        2. Functional & Preference Cookies
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed font-light pl-9.5">
                      These cookies enable enhanced personalization and memory. They remember your saved wishlist items between browser restarts, your preferred display currency (GBP/USD/EUR), size filter preferences, and collapsed sidebar state. Disabling these may result in lost display choices.
                    </p>
                  </div>
                  <Switch
                    checked={prefs.functional}
                    onCheckedChange={(val) => handleToggle("functional", val)}
                    className="mt-1"
                  />
                </div>

                <div className="mt-4 ml-9.5 rounded-xl bg-[#FAFAFA] p-3.5 text-[11px] text-neutral-600 border border-neutral-200/70">
                  <span className="font-semibold text-neutral-800">Examples:</span>{" "}
                  <code>crimson_wishlist</code> (Saved archive pieces), <code>user_currency_pref</code> (Currency indicator), <code>sidebar:state</code> (Collapsible menu memory).
                </div>
              </div>

              {/* Category 3: Performance & Analytics */}
              <div className="py-6 border-b border-neutral-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800">
                        <BarChart3 className="h-3.5 w-3.5" />
                      </div>
                      <h3 className="text-sm font-bold text-neutral-900">
                        3. Performance & Analytics Cookies
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed font-light pl-9.5">
                      These cookies gather aggregated, fully anonymized metrics regarding which garments patrons explore most, server response latencies, and checkout step completion rates. They help us troubleshoot interface bugs, improve mobile responsiveness, and measure overall site speed.
                    </p>
                  </div>
                  <Switch
                    checked={prefs.analytics}
                    onCheckedChange={(val) => handleToggle("analytics", val)}
                    className="mt-1"
                  />
                </div>

                <div className="mt-4 ml-9.5 rounded-xl bg-[#FAFAFA] p-3.5 text-[11px] text-neutral-600 border border-neutral-200/70">
                  <span className="font-semibold text-neutral-800">Examples:</span>{" "}
                  <code>_ga</code> (Anonymized traffic metrics), <code>v_latency</code> (Page speed performance timing).
                </div>
              </div>

              {/* Category 4: Marketing & Tailored Experience */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800">
                        <Megaphone className="h-3.5 w-3.5" />
                      </div>
                      <h3 className="text-sm font-bold text-neutral-900">
                        4. Marketing & Tailored Curation Cookies
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed font-light pl-9.5">
                      Used to deliver personalized lookbook recommendations, announce private collection archive drops, and measure our journal campaign effectiveness. They ensure you receive garment suggestions tailored to your aesthetic rather than generic repetitive announcements.
                    </p>
                  </div>
                  <Switch
                    checked={prefs.marketing}
                    onCheckedChange={(val) => handleToggle("marketing", val)}
                    className="mt-1"
                  />
                </div>

                <div className="mt-4 ml-9.5 rounded-xl bg-[#FAFAFA] p-3.5 text-[11px] text-neutral-600 border border-neutral-200/70">
                  <span className="font-semibold text-neutral-800">Examples:</span>{" "}
                  <code>cc_campaign_id</code> (Archive drop source attribution), <code>lookbook_rec</code> (Tailored style matches).
                </div>
              </div>

              {/* Save Bar */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-6">
                <div className="text-xs text-neutral-500">
                  {hasChanges ? (
                    <span className="text-amber-700 font-medium">Unsaved preference adjustments pending</span>
                  ) : (
                    <span>All preferences up to date</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRejectNonEssential}
                    className="h-9 rounded-pill text-xs border-neutral-300"
                  >
                    Reject All Non-Essential
                  </Button>
                  <Button
                    onClick={handleSave}
                    size="sm"
                    className="h-9 rounded-pill bg-[#8B1E3F] hover:bg-[#721531] text-xs font-semibold text-white px-5 shadow-sm"
                  >
                    <Check className="mr-1.5 h-3.5 w-3.5" />
                    Save Selected Preferences
                  </Button>
                </div>
              </div>
            </div>

            {/* Informational Policy Clauses */}
            <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-serif text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                Cookie Policy & Browser Controls
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
                <h4 className="font-semibold text-neutral-900 text-xs uppercase tracking-wider">
                  What Are Cookies?
                </h4>
                <p>
                  Cookies are small text files placed on your device by websites you visit. They are widely used to make web applications work efficiently, provide uninterrupted shopping cart experiences, and offer insight into store usability.
                </p>

                <h4 className="font-semibold text-neutral-900 text-xs uppercase tracking-wider pt-2">
                  Managing Cookies Directly Through Your Web Browser
                </h4>
                <p>
                  In addition to our interactive preference manager above, most web browsers permit you to refuse or erase cookies through browser settings. For guidance:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
                  <li>
                    <strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Third-party cookies.
                  </li>
                  <li>
                    <strong>Apple Safari:</strong> Preferences &gt; Privacy &gt; Prevent cross-site tracking.
                  </li>
                  <li>
                    <strong>Mozilla Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Enhanced Tracking Protection.
                  </li>
                  <li>
                    <strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions.
                  </li>
                </ul>
                <p className="text-xs text-neutral-500 pt-1">
                  <em>Note: Disabling all cookies via browser controls may impair the ability to add items to your cart or finalize orders.</em>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Support & Summary Cards */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-sm">
                <ShieldCheck className="h-4 w-4 text-[#8B1E3F]" />
                Customer Data Ethics
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                Crimson Canvas maintains a zero-sale data policy. We do not monetize browsing history, nor do we permit intrusive behavioral cross-site retargeting.
              </p>
              <div className="border-t border-neutral-100 pt-3">
                <Link
                  to="/privacy"
                  className="flex items-center justify-between text-xs font-medium text-[#8B1E3F] hover:text-[#721531] transition-colors"
                >
                  <span>Read Full Privacy Notice</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Quick Navigation
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link
                    to="/terms"
                    className="flex items-center justify-between text-neutral-600 hover:text-[#8B1E3F] transition-colors"
                  >
                    <span>Terms of Service</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping"
                    className="flex items-center justify-between text-neutral-600 hover:text-[#8B1E3F] transition-colors"
                  >
                    <span>Shipping & Delivery</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/returns"
                    className="flex items-center justify-between text-neutral-600 hover:text-[#8B1E3F] transition-colors"
                  >
                    <span>Returns & Exchanges</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#8B1E3F]/20 bg-[#8B1E3F]/5 p-6 space-y-3">
              <h4 className="font-serif text-sm font-bold text-neutral-900">
                Need Help with Your Preferences?
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                Our privacy team is at your disposal to clarify technical storage policies or assist with preference settings.
              </p>
              <a
                href="mailto:privacy@crimsoncanvas.com"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B1E3F] hover:underline"
              >
                privacy@crimsoncanvas.com
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
