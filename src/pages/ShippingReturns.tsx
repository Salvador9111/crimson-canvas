import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Clock, 
  Globe, 
  Package, 
  HelpCircle, 
  ArrowRight, 
  Mail,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShippingReturns() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "returns" ? "returns" : "shipping";
  const [activeTab, setActiveTab] = useState<"shipping" | "returns">(initialTab);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "returns" || tab === "shipping") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const setTab = (tab: "shipping" | "returns") => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 animate-fade-up">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-[#141212] py-16 sm:py-20 text-white isolate">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#8B1E3F]" aria-hidden="true" />
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-[#8B1E3F]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container-tight relative z-10 pl-6 sm:pl-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-widest text-[#E5B6BD] uppercase border border-white/10">
            <Truck className="h-3.5 w-3.5" />
            Customer Care & Fulfillment
          </span>
          <h1 className="mt-3 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Shipping & Returns
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            Carbon-neutral worldwide delivery, bespoke archival packaging, and a 30-day effortless return guarantee.
          </p>

          {/* Tab Selector */}
          <div className="mt-8 flex gap-3 border-t border-white/10 pt-6">
            <button
              onClick={() => setTab("shipping")}
              className={`flex items-center gap-2 rounded-pill px-5 py-2 text-xs font-semibold transition-all ${
                activeTab === "shipping"
                  ? "bg-[#8B1E3F] text-white shadow-sm"
                  : "bg-white/10 text-neutral-300 hover:bg-white/20 hover:text-white"
              }`}
            >
              <Truck className="h-3.5 w-3.5" />
              Shipping & Delivery
            </button>
            <button
              onClick={() => setTab("returns")}
              className={`flex items-center gap-2 rounded-pill px-5 py-2 text-xs font-semibold transition-all ${
                activeTab === "returns"
                  ? "bg-[#8B1E3F] text-white shadow-sm"
                  : "bg-white/10 text-neutral-300 hover:bg-white/20 hover:text-white"
              }`}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Returns & Exchanges
            </button>
          </div>
        </div>
      </section>

      {/* Main Tab Content */}
      <section className="container-tight py-12 sm:py-16">
        {activeTab === "shipping" ? (
          <div className="space-y-10">
            {/* Quick Metrics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E3F]">
                  <Globe className="h-4 w-4" /> Global Reach
                </div>
                <p className="mt-2 text-xl font-bold text-neutral-900">Over 60 Countries</p>
                <p className="mt-1 text-xs text-neutral-500 font-light">Direct from London Savile Row</p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E3F]">
                  <Clock className="h-4 w-4" /> Dispatch Speed
                </div>
                <p className="mt-2 text-xl font-bold text-neutral-900">24–48 Hours</p>
                <p className="mt-1 text-xs text-neutral-500 font-light">Carefully hand-pressed and packed</p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E3F]">
                  <Truck className="h-4 w-4" /> Complimentary
                </div>
                <p className="mt-2 text-xl font-bold text-neutral-900">Orders Over $150</p>
                <p className="mt-1 text-xs text-neutral-500 font-light">Automated at online checkout</p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E3F]">
                  <Package className="h-4 w-4" /> Carbon Neutral
                </div>
                <p className="mt-2 text-xl font-bold text-neutral-900">100% Offset</p>
                <p className="mt-1 text-xs text-neutral-500 font-light">Biodegradable cotton bags & recycled boxes</p>
              </div>
            </div>

            {/* Delivery Rates Table */}
            <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 pb-4 border-b border-neutral-100">
                Delivery Tiers & Transit Estimates
              </h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 text-neutral-500 text-[11px] uppercase tracking-wider">
                      <th className="pb-3 font-semibold">Destination</th>
                      <th className="pb-3 font-semibold">Courier Service</th>
                      <th className="pb-3 font-semibold">Estimated Transit</th>
                      <th className="pb-3 font-semibold">Standard Fee</th>
                      <th className="pb-3 font-semibold">Complimentary Tier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-neutral-700">
                    <tr>
                      <td className="py-3.5 font-medium text-neutral-900">United Kingdom (Domestic)</td>
                      <td className="py-3.5">Royal Mail Special Delivery / DPD</td>
                      <td className="py-3.5">1–2 Business Days</td>
                      <td className="py-3.5">£5.00</td>
                      <td className="py-3.5 font-semibold text-emerald-700">Free on orders &gt; £100</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 font-medium text-neutral-900">European Union</td>
                      <td className="py-3.5">DHL Express Europe</td>
                      <td className="py-3.5">2–4 Business Days</td>
                      <td className="py-3.5">€12.00</td>
                      <td className="py-3.5 font-semibold text-emerald-700">Free on orders &gt; €140</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 font-medium text-neutral-900">United States &amp; Canada</td>
                      <td className="py-3.5">FedEx International Priority</td>
                      <td className="py-3.5">2–4 Business Days</td>
                      <td className="py-3.5">$15.00</td>
                      <td className="py-3.5 font-semibold text-emerald-700">Free on orders &gt; $150</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 font-medium text-neutral-900">Rest of the World</td>
                      <td className="py-3.5">DHL Express Worldwide</td>
                      <td className="py-3.5">3–6 Business Days</td>
                      <td className="py-3.5">$22.00</td>
                      <td className="py-3.5 font-semibold text-emerald-700">Free on orders &gt; $200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Packaging & Tracking Info */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm space-y-3">
                <h3 className="font-serif text-lg font-bold text-neutral-900">Archival Packaging</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                  Every Crimson Canvas piece is folded in acid-free tissue paper, encased inside a reusable organic cotton garment bag, and sealed in our FSC-certified recycled rigid mailer. Zero single-use plastics are utilized.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm space-y-3">
                <h3 className="font-serif text-lg font-bold text-neutral-900">Customs & Import Duties</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                  UK VAT is calculated at checkout. For international destinations, any local customs tariffs or handling surcharges are determined by destination border authorities and handled seamlessly through our courier partners.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Returns Overview */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E3F]">
                  <RotateCcw className="h-4 w-4" /> Return Window
                </div>
                <p className="mt-2 text-xl font-bold text-neutral-900">30 Calendar Days</p>
                <p className="mt-1 text-xs text-neutral-500 font-light">From the date of courier delivery</p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E3F]">
                  <CheckCircle2 className="h-4 w-4" /> Full Refund
                </div>
                <p className="mt-2 text-xl font-bold text-neutral-900">Original Payment</p>
                <p className="mt-1 text-xs text-neutral-500 font-light">Processed within 3-5 days of inspection</p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E3F]">
                  <ShieldCheck className="h-4 w-4" /> Exchange Guarantee
                </div>
                <p className="mt-2 text-xl font-bold text-neutral-900">Complimentary Sizing</p>
                <p className="mt-1 text-xs text-neutral-500 font-light">Free replacement shipping on size exchanges</p>
              </div>
            </div>

            {/* How to Return Step-by-Step */}
            <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 pb-4 border-b border-neutral-100">
                How to Initiate a Return or Exchange
              </h2>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8B1E3F] text-white text-xs font-bold">
                    1
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900">Contact or Request</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    Email our concierge at <a href="mailto:concierge@crimsoncanvas.com" className="text-[#8B1E3F] underline">concierge@crimsoncanvas.com</a> with your order reference number and reason for return or size exchange.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8B1E3F] text-white text-xs font-bold">
                    2
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900">Affix Return Label</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    We will provide an insured digital courier return label. Secure garments in their original archive dust bag and box with tags attached.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8B1E3F] text-white text-xs font-bold">
                    3
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900">Inspection &amp; Refund</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    Upon delivery to our Mayfair facility, garments undergo standard quality check. Your refund or replacement is dispatched within 72 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Eligibility Note */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6 flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-amber-800 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs text-amber-900">
                <p className="font-semibold">Garment Condition Standard</p>
                <p className="leading-relaxed">
                  To protect the integrity of our slow-fashion archive, garments returned with perfume odors, makeup stains, missing sewn tags, or signs of wear cannot be refunded and will be returned to the sender.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Concierge Contact Card */}
        <div className="mt-12 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="font-serif text-lg font-bold text-neutral-900">
              Need Help With a Current Shipment or Return?
            </h3>
            <p className="text-xs text-neutral-600 max-w-xl mt-1">
              Our Savile Row concierge desk is on hand to check tracking status, arrange courier pickups, or recommend sizing adjustments.
            </p>
          </div>
          <Button asChild className="rounded-pill bg-[#8B1E3F] hover:bg-[#721531] text-xs text-white">
            <a href="mailto:concierge@crimsoncanvas.com">
              <Mail className="mr-2 h-3.5 w-3.5" />
              Email Concierge Team
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
