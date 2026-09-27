import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import heroImg from "@/assets/hero.jpg";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const SASSY_FASHION_QUOTES = [
  {
    quote: "Dress like you’re about to bump into your ex and their stylist.",
    tag: "The Crimson Maxim",
  },
  {
    quote: "Life is far too brief for synthetic fabric and uninspired tailoring.",
    tag: "Rule No. 01",
  },
  {
    quote: "Quiet luxury, loud standards. Welcome to the inner circle.",
    tag: "Archive Codex",
  },
  {
    quote: "They say money can't buy taste. Good thing you already brought both.",
    tag: "Curator's Guild",
  },
  {
    quote: "Fast fashion is an apology. Bespoke texture is a declaration.",
    tag: "Style Note",
  },
  {
    quote: "No logos needed. Just weight, silhouette, and unapologetic confidence.",
    tag: "Fabric Philosophy",
  },
];

interface AuthPageProps {
  initialMode?: "signin" | "signup";
}

export default function AuthPage({ initialMode = "signin" }: AuthPageProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Mode derived from route or initial prop
  const currentPathMode = location.pathname === "/signup" ? "signup" : "signin";
  const [mode, setMode] = useState<"signin" | "signup">(currentPathMode || initialMode);
  const [transitionDirection, setTransitionDirection] = useState<"right" | "left">("right");

  // Keep state synced if URL changes (e.g. browser back/forward)
  useEffect(() => {
    const routeMode = location.pathname === "/signup" ? "signup" : "signin";
    if (routeMode !== mode) {
      setTransitionDirection(routeMode === "signup" ? "right" : "left");
      setMode(routeMode);
    }
  }, [location.pathname]);

  // Sassy Quote Carousel State
  const [quoteIdx, setQuoteIdx] = useState(0);
  const nextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % SASSY_FASHION_QUOTES.length);
  };
  const currentQuote = SASSY_FASHION_QUOTES[quoteIdx];

  // Common Loading State
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form State
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupShowPassword, setSignupShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Password Humor for Login
  const getPasswordHumor = () => {
    if (!loginPassword) return null;
    if (loginPassword.length < 6)
      return {
        text: "Minimalist... but dangerously short, darling.",
        color: "text-rose-600 bg-rose-50 border-rose-200",
      };
    if (loginPassword.length < 10)
      return {
        text: "Standard weave. Clean and functional.",
        color: "text-amber-600 bg-amber-50 border-amber-200",
      };
    return {
      text: "Vault-grade bespoke armor. Karl Lagerfeld would approve.",
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    };
  };
  const passwordFeedback = getPasswordHumor();

  // Dynamic Password Strength Evaluation for Signup
  const getPasswordStrength = () => {
    if (!signupPassword)
      return {
        score: 0,
        text: "Give us at least 6 characters of substance, darling.",
        color: "text-neutral-400",
      };
    let score = 0;
    if (signupPassword.length >= 6) score += 1;
    if (signupPassword.length >= 10) score += 1;
    if (/[A-Z]/.test(signupPassword) && /[a-z]/.test(signupPassword)) score += 1;
    if (/[0-9]/.test(signupPassword) || /[^A-Za-z0-9]/.test(signupPassword)) score += 1;

    switch (score) {
      case 1:
        return {
          score: 1,
          text: "Flimsy as polyester fast fashion. Add some flair.",
          color: "text-rose-600",
        };
      case 2:
        return {
          score: 2,
          text: "Decent weave. Could use tighter stitching.",
          color: "text-amber-600",
        };
      case 3:
        return {
          score: 3,
          text: "320 GSM heavyweight organic weave. Looking sharp.",
          color: "text-emerald-700",
        };
      case 4:
        return {
          score: 4,
          text: "Savile Row impenetrable fortress. Perfection.",
          color: "text-[#8B1E3F]",
        };
      default:
        return {
          score: 0,
          text: "Give us at least 6 characters of substance, darling.",
          color: "text-neutral-400",
        };
    }
  };
  const strength = getPasswordStrength();

  // Mode Switch Handler with sassy directional animation
  const handleModeSwitch = (newMode: "signin" | "signup") => {
    if (newMode === mode) return;
    setTransitionDirection(newMode === "signup" ? "right" : "left");
    setMode(newMode);
    navigate(newMode === "signup" ? "/signup" : "/login");
  };

  // Google OAuth
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) {
        toast.error(error.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to initiate Google sign in.");
    } finally {
      setGoogleLoading(false);
    }
  };

  // Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error("Please provide both email and password, darling.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    setLoading(false);

    if (error) {
      if (error.message.toLowerCase().includes("invalid login")) {
        return toast.error("That key didn't turn. Double-check your spelling, darling.");
      }
      return toast.error(error.message);
    }

    toast.success("Welcome back, trendsetter. Opening the archive…");
    navigate("/");
  };

  // Signup Submit
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword.length < 6) {
      toast.error("Password needs at least 6 characters, darling.");
      return;
    }
    if (!agreedToTerms) {
      toast.error("Please agree with our terms and services to proceed.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: signupName,
        },
      },
    });
    setLoading(false);

    if (error) return toast.error(error.message);
    toast.success("Account created! Welcome to the inner circle.", {
      icon: <Sparkles className="h-4 w-4 text-[#8B1E3F]" />,
    });
    navigate("/verify-email");
  };

  const isSignup = mode === "signup";

  return (
    <div className="relative min-h-screen bg-[#FDFCFB] text-neutral-900 overflow-x-hidden">
      <div className="grid min-h-screen lg:grid-cols-12">
        {/* Left Column: Atmospheric Editorial Showcase (Remains completely stable across transitions) */}
        <div className="relative hidden lg:col-span-5 xl:col-span-6 lg:flex flex-col justify-between overflow-hidden bg-[#121111] p-10 xl:p-14 text-white isolate">
          {/* Signature Crimson Accent Stripe on far left edge */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#8B1E3F] z-20" aria-hidden="true" />

          {/* Background Hero Image with Deep Vignette */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImg}
              alt="Crimson Canvas"
              className="h-full w-full object-cover object-center scale-105 opacity-40 transition-transform duration-1000 ease-out"
            />
            {/* Multi-layer Editorial Scrim Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121111] via-[#121111]/75 to-[#121111]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#121111]/90 via-transparent to-[#121111]/60" />
            {/* Ambient Pulsing Crimson Glow */}
            <div className="absolute -left-20 bottom-10 w-96 h-96 bg-[#8B1E3F]/30 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Top Brand Header */}
          <div className="relative z-10 flex items-center justify-between">
            <Link to="/" className="flex flex-col group py-0.5 select-none">
              <span className="font-serif text-2xl font-extrabold tracking-[0.2em] text-white leading-none uppercase">
                CRIMSON
              </span>
              <span className="font-serif text-xs font-bold tracking-[0.34em] text-[#E5B6BD] leading-tight mt-1 uppercase">
                CANVAS
              </span>
            </Link>
          </div>

          {/* Center: Dynamic Sassy Quote Carousel */}
          <div className="relative z-10 my-auto py-12 max-w-xl">
            <div className="border-l-2 border-[#8B1E3F] pl-6 py-2 transition-all duration-300">
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#E5B6BD]">
                  {currentQuote.tag}
                </span>

                {/* Sassy Shuffle Button */}
                <button
                  type="button"
                  onClick={nextQuote}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1 text-[11px] font-medium text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Shuffle sartorial wisdom"
                >
                  <Sparkles className="h-3 w-3 text-[#E5B6BD]" />
                  <span>Shuffle Wit</span>
                </button>
              </div>

              <blockquote className="font-serif text-2xl xl:text-3xl text-white font-normal leading-snug tracking-tight">
                "{currentQuote.quote}"
              </blockquote>
            </div>

            {/* Quote Indicators */}
            <div className="flex items-center gap-2 pl-6 mt-6">
              {SASSY_FASHION_QUOTES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setQuoteIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === quoteIdx ? "w-8 bg-[#8B1E3F]" : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`View quote ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form Card Area */}
        <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center items-center p-4 sm:p-5 lg:p-6 relative min-h-screen">
          {/* Subtle Ambient Background Mesh */}
          <div className="absolute inset-0 bg-[#FDFCFB] pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #8B1E3F 1px, transparent 0)`,
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          {/* Mobile-only logo */}
          <div className="lg:hidden relative z-10 flex justify-center mb-2.5">
            <Link to="/" className="flex flex-col items-center group py-0.5 select-none">
              <span className="font-serif text-lg font-extrabold tracking-[0.16em] text-neutral-900 leading-none uppercase">
                CRIMSON
              </span>
              <span className="font-serif text-[9px] font-bold tracking-[0.28em] text-[#8B1E3F] leading-tight mt-0.5 uppercase">
                CANVAS
              </span>
            </Link>
          </div>

          {/* Central Card Container */}
          <div className="relative z-10 w-full max-w-[445px] mx-auto my-auto animate-fade-up">
            <div className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-neutral-200/90 relative overflow-hidden backdrop-blur-xl">
              {/* Static Signature Top Crimson Line Accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8B1E3F] via-[#E5B6BD] to-[#8B1E3F]" />

              {/* Interactive Segmented Switcher with Fast GPU Sliding Indicator */}
              <div className="relative flex rounded-full bg-neutral-100 p-1 mb-4 border border-neutral-200/80 select-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)]">
                {/* Hardware-accelerated sliding active pill */}
                <div
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-neutral-200/70 transition-transform duration-250 ease-out will-change-transform ${
                    isSignup ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
                  }`}
                  aria-hidden="true"
                />

                <button
                  type="button"
                  onClick={() => handleModeSwitch("signin")}
                  className={`relative z-10 flex-1 text-center py-2.5 text-xs font-semibold rounded-full transition-colors duration-200 cursor-pointer ${
                    !isSignup
                      ? "text-neutral-900 font-bold"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => handleModeSwitch("signup")}
                  className={`relative z-10 flex-1 text-center py-2.5 text-xs font-semibold rounded-full transition-colors duration-200 cursor-pointer ${
                    isSignup
                      ? "text-neutral-900 font-bold"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Ultra-smooth GPU-accelerated Directional Slide Transition */}
              <div
                key={mode}
                className={
                  transitionDirection === "right"
                    ? "animate-smooth-slide-right"
                    : "animate-smooth-slide-left"
                }
              >
                {/* Title & Subtitle without any badges */}
                <div className={isSignup ? "mb-4" : "mb-5 sm:mb-6"}>
                  <h1 className="font-serif text-2xl sm:text-[1.75rem] font-bold tracking-tight text-neutral-900">
                    {isSignup ? "Begin Your Journey" : "Welcome Back"}
                  </h1>
                  <p className="mt-1 text-xs sm:text-[13px] text-neutral-500 leading-relaxed font-light">
                    {isSignup
                      ? "Say goodbye to disposable fashion. Let's build your timeless signature."
                      : "Step back into your private archive and bespoke wardrobe."}
                  </p>
                </div>

                {/* Dynamic Form Content */}
                {isSignup ? (
                  /* ===================== CREATE ACCOUNT FORM ===================== */
                  <form onSubmit={handleSignupSubmit} className="space-y-3">
                    {/* Name */}
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                        Name
                      </Label>
                      <div className="relative flex items-center">
                        <User className="absolute left-3.5 h-4 w-4 text-neutral-400 pointer-events-none" />
                        <Input
                          className="pl-10 h-11 rounded-xl border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20 text-xs sm:text-sm transition-all"
                          required
                          placeholder="e.g. Vivienne, Coco, or your alias"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                        Email
                      </Label>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-3.5 h-4 w-4 text-neutral-400 pointer-events-none" />
                        <Input
                          className="pl-10 h-11 rounded-xl border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20 text-xs sm:text-sm transition-all"
                          type="email"
                          required
                          placeholder="your.signature@look.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                        Password
                      </Label>
                      <div className="relative flex items-center">
                        <Lock className="absolute left-3.5 h-4 w-4 text-neutral-400 pointer-events-none" />
                        <Input
                          className="pl-10 pr-12 h-11 rounded-xl border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20 text-xs sm:text-sm transition-all"
                          type={signupShowPassword ? "text" : "password"}
                          minLength={6}
                          required
                          placeholder="At least 6 characters"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setSignupShowPassword(!signupShowPassword)}
                          className="absolute right-3.5 text-neutral-400 hover:text-neutral-700 transition-colors p-1 cursor-pointer"
                          aria-label={signupShowPassword ? "Conceal password" : "Peek at password"}
                          title={signupShowPassword ? "Conceal" : "Peek"}
                        >
                          {signupShowPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>

                      {/* Password strength meter */}
                      {signupPassword && (
                        <div className="pt-1 space-y-1 animate-fade-up">
                          <div className="grid grid-cols-4 gap-1.5">
                            {[1, 2, 3, 4].map((step) => (
                              <div
                                key={step}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  step <= strength.score
                                    ? strength.score === 1
                                      ? "bg-rose-500"
                                      : strength.score === 2
                                      ? "bg-amber-500"
                                      : strength.score === 3
                                      ? "bg-emerald-500"
                                      : "bg-[#8B1E3F]"
                                    : "bg-neutral-200"
                                }`}
                              />
                            ))}
                          </div>
                          <p className={`text-[11px] font-medium transition-colors ${strength.color}`}>
                            {strength.text}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Terms Agreement Checkbox */}
                    <div className="py-0.5">
                      <div className="flex items-start gap-2.5">
                        <input
                          id="terms-checkbox"
                          type="checkbox"
                          required
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                          className="h-4 w-4 mt-0.5 rounded border-neutral-300 text-[#8B1E3F] focus:ring-[#8B1E3F] cursor-pointer"
                        />
                        <label htmlFor="terms-checkbox" className="text-xs text-neutral-600 select-none cursor-pointer">
                          I agree to Crimson Canvas's{" "}
                          <Link
                            to="/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="font-medium text-[#8B1E3F] underline hover:text-[#721531]"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="font-medium text-[#8B1E3F] underline hover:text-[#721531]"
                          >
                            Privacy Notice
                          </Link>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-11.5 sm:h-12 rounded-pill bg-[#8B1E3F] hover:bg-[#721531] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-soft transition-all duration-300 hover:shadow-[0_8px_25px_rgba(139,30,63,0.35)] cursor-pointer mt-1"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 animate-spin text-[#E5B6BD]" />
                          Creating Account…
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <span>Create Account</span>
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>

                    {/* Divider */}
                    <div className="relative my-3 pt-0.5">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-neutral-200/80" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-3 text-[10px] font-bold tracking-[0.2em] text-neutral-400">
                          or continue with
                        </span>
                      </div>
                    </div>

                    {/* Continue with Google */}
                    <Button
                      type="button"
                      variant="outline"
                      disabled={googleLoading}
                      onClick={handleGoogleSignIn}
                      className="w-full h-11.5 sm:h-12 rounded-pill border-neutral-200/90 bg-white hover:bg-neutral-50 hover:border-neutral-300 text-xs sm:text-sm font-semibold text-neutral-800 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm group"
                    >
                      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>{googleLoading ? "Connecting to Google…" : "Continue with Google"}</span>
                    </Button>
                  </form>
                ) : (
                  /* ===================== SIGN IN FORM (MATCHED HEIGHT) ===================== */
                  <form onSubmit={handleLoginSubmit} className="space-y-4.5 sm:space-y-5">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label className="text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-neutral-700">
                        Email
                      </Label>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-3.5 h-4.5 w-4.5 text-neutral-400 pointer-events-none" />
                        <Input
                          className="pl-11 h-12 sm:h-12.5 rounded-xl border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20 text-sm transition-all"
                          type="email"
                          required
                          placeholder="e.g. curator@crimsoncanvas.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-neutral-700">
                          Password
                        </Label>
                        <Link
                          to="/forgot-password"
                          className="text-xs sm:text-[13px] font-medium text-neutral-400 hover:text-[#8B1E3F] transition-colors"
                        >
                          Forgot Password
                        </Link>
                      </div>

                      <div className="relative flex items-center">
                        <Lock className="absolute left-3.5 h-4.5 w-4.5 text-neutral-400 pointer-events-none" />
                        <Input
                          className="pl-11 pr-12 h-12 sm:h-12.5 rounded-xl border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20 text-sm transition-all"
                          type={loginShowPassword ? "text" : "password"}
                          required
                          placeholder="••••••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setLoginShowPassword(!loginShowPassword)}
                          className="absolute right-3.5 text-neutral-400 hover:text-neutral-700 transition-colors p-1 cursor-pointer"
                          aria-label={loginShowPassword ? "Conceal password" : "Peek at password"}
                          title={loginShowPassword ? "Conceal" : "Peek"}
                        >
                          {loginShowPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>

                      {/* Password Commentary */}
                      {passwordFeedback && (
                        <div
                          className={`flex items-center gap-1.5 mt-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium animate-fade-up ${passwordFeedback.color}`}
                        >
                          <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                          <span>{passwordFeedback.text}</span>
                        </div>
                      )}
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center justify-between py-2 sm:py-2.5">
                      <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-4 w-4 rounded border-neutral-300 text-[#8B1E3F] focus:ring-[#8B1E3F] cursor-pointer"
                        />
                        <span className="text-xs sm:text-[13px] text-neutral-600 group-hover:text-neutral-900 transition-colors">
                          Remember my taste on this device
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 sm:h-12.5 rounded-pill bg-[#8B1E3F] hover:bg-[#721531] text-white text-sm sm:text-[15px] font-semibold tracking-wide shadow-soft transition-all duration-300 hover:shadow-[0_8px_25px_rgba(139,30,63,0.35)] cursor-pointer mt-2"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 animate-spin text-[#E5B6BD]" />
                          Unlocking the Vault…
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <span>Sign in</span>
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>

                    {/* Divider */}
                    <div className="relative my-4 sm:my-4.5 pt-0.5">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-neutral-200/80" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-3 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-neutral-400">
                          or continue with
                        </span>
                      </div>
                    </div>

                    {/* Continue with Google */}
                    <Button
                      type="button"
                      variant="outline"
                      disabled={googleLoading}
                      onClick={handleGoogleSignIn}
                      className="w-full h-12 sm:h-12.5 rounded-pill border-neutral-200/90 bg-white hover:bg-neutral-50 hover:border-neutral-300 text-sm sm:text-[15px] font-semibold text-neutral-800 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm group"
                    >
                      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>{googleLoading ? "Connecting to Google…" : "Continue with Google"}</span>
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Outer Footer with Smooth Directional Transition */}
            <div
              key={mode + "-footer"}
              className={`mt-2.5 sm:mt-3 text-center text-xs text-neutral-500 font-medium ${
                transitionDirection === "right"
                  ? "animate-smooth-slide-right"
                  : "animate-smooth-slide-left"
              }`}
            >
              {isSignup ? (
                <>
                  Already a member of the guild?{" "}
                  <button
                    type="button"
                    onClick={() => handleModeSwitch("signin")}
                    className="text-[#8B1E3F] hover:text-[#721531] underline-offset-4 hover:underline font-bold transition-colors cursor-pointer"
                  >
                    Sign in and flaunt it →
                  </button>
                </>
              ) : (
                <>
                  New to Crimson Canvas?{" "}
                  <button
                    type="button"
                    onClick={() => handleModeSwitch("signup")}
                    className="text-[#8B1E3F] hover:text-[#721531] underline-offset-4 hover:underline font-bold transition-colors cursor-pointer"
                  >
                    Create an account →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
