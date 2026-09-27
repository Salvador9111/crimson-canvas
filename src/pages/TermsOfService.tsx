import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Scale, 
  ShieldCheck, 
  RotateCcw, 
  Truck, 
  Printer, 
  Search, 
  ArrowRight, 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle,
  FileCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TermsOfService() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("terms-1");

  const sections = useMemo(() => [
    {
      id: "terms-1",
      title: "1. Agreement & Acceptance of Terms",
      content: `Welcome to Crimson Canvas. These Terms of Service ("Terms," "Agreement") constitute a legally binding agreement between you ("Customer," "Patron," or "User") and Crimson Canvas Heritage Ltd. ("Crimson Canvas," "we," "us," or "our"), governing your access to and purchase of garments through crimsoncanvas.com (the "Storefront").

By visiting our website, creating an account, browsing our collections, or placing an order, you agree to be bound by these Terms, our Privacy Notice, and our Cookie Policy. If you do not agree with all terms herein, please discontinue using the storefront immediately.`
    },
    {
      id: "terms-2",
      title: "2. Eligibility & Account Creation",
      content: `To enter into transactions with Crimson Canvas, you represent and warrant that:
• You are at least eighteen (18) years of age or the age of legal majority in your jurisdiction.
• You possess the legal authority to enter into binding commercial contracts and payment obligations.
• All registration details provided during account creation or guest checkout are accurate, truthful, and current.

You are responsible for maintaining the confidentiality of your account credentials, password, and restricted access to your terminal. You accept liability for all activities conducted under your registered email.`
    },
    {
      id: "terms-3",
      title: "3. Craftsmanship, Sizing & Fiber Characteristics",
      content: `Crimson Canvas specializes in slow fashion, utilizing honest natural textiles: 100% GOTS-certified organic cotton, natural flax linen, and botanical corozo buttons.

A. Natural Fiber Characteristics: Minor yarn variations, slubs, and natural textures are intrinsic hallmarks of pure unblended botanical fibers, not manufacturing defects.
B. Color Representation: We execute studio color grading under balanced 5500K daylight lighting. However, because display monitors and mobile screens render color differently, subtle tone variations between your device screen and the physical cloth may occur.
C. Sizing & Fit: Garment measurements are provided on each product page. While our patterns undergo rigorous pre-shrinkage processes, natural fabric relaxation of +/- 1.5 cm is considered within acceptable artisan tolerances.`
    },
    {
      id: "terms-4",
      title: "4. Pricing, Currency & Payment Terms",
      content: `A. Pricing: All prices displayed on our storefront are stated in the local currency selected (GBP, USD, EUR) and exclude local sales taxes or customs duties unless explicitly stated at checkout.
B. Pricing Discrepancies: In the rare event an item is erroneously cataloged at an incorrect price due to technical error, we reserve the right to decline or cancel orders placed for the mispriced garment prior to dispatch, promptly refunding the transaction.
C. Payment Execution: Payment must be tendered in full prior to order dispatch. We accept major credit and debit cards (Visa, MasterCard, American Express) and authorized digital wallets via encrypted, PCI-DSS Level 1 payment processors.
D. Fraud Screening: All transactions are subjected to automated fraud scoring. We reserve the right to request proof of billing address or cancel suspicious orders to protect account holders.`
    },
    {
      id: "terms-5",
      title: "5. Orders, Acceptance & Contract Formation",
      content: `When you place an order on crimsoncanvas.com, you receive an automated acknowledgment email ("Order Received"). This email confirms receipt of your order request but does not signify final legal acceptance.

Legal contract formation occurs only when Crimson Canvas issues a formal "Order Dispatched & Tracking Confirmation" email, indicating that your garments have been inspected by our quality team and handed over to our international courier partner.`
    },
    {
      id: "terms-6",
      title: "6. Shipping, Worldwide Delivery & Risk of Loss",
      content: `A. Global Delivery: We ship globally utilizing carbon-neutral priority couriers (DHL Express, FedEx, Royal Mail). Complimentary carbon-neutral shipping is provided on qualified orders over $150 USD (or local equivalent).
B. Dispatch Windows: In-stock garments are typically packaged and dispatched within 24 to 48 business hours from our Mayfair location.
C. Title & Risk of Loss: All purchases are made pursuant to a shipment contract. Title and risk of loss pass to you upon courier delivery scan at the shipping address provided at checkout.
D. Customs, Tariffs & Import Duties: For deliveries outside the United Kingdom, orders may be subject to local import taxes, customs duties, and brokerage clearance fees assessed by destination authorities. Unless 'DDP' (Delivered Duty Paid) is explicitly designated, these fees are the customer's sole responsibility.`
    },
    {
      id: "terms-7",
      title: "7. 30-Day Return & Archive Exchange Policy",
      content: `We take tremendous pride in the longevity and cut of our garments. If you are not completely satisfied with your selection:

A. Return Period: You may initiate a return or exchange within thirty (30) calendar days from the date of package delivery.
B. Condition Requirements: To qualify for a full refund or exchange:
• Garments must be unworn, unwashed, unaltered, and free of fragrance, pet hair, or makeup markings.
• All original archive tags, labels, and spare buttons must remain securely attached.
• The item must be repacked in its original archival Crimson Canvas dust bag and box.
C. Non-Returnable Items: Bespoke tailored garments, monogrammed apparel, or items marked as "Final Archive Clearance" cannot be returned or exchanged.
D. Refund Processing: Upon receipt and inspection at our London facility (typically 3-5 business days), refunds are credited back to the original method of payment. Financial institutions may require 5-10 business days to reflect the credit.`
    },
    {
      id: "terms-8",
      title: "8. Intellectual Property & Brand Trademarks",
      content: `All content featured on crimsoncanvas.com—including garment design patterns, silhouettes, tailoring cuts, photographic imagery, lookbooks, typography, brand naming, logotypes, and our signature vertical crimson edge motif—is the exclusive intellectual property of Crimson Canvas Ltd., protected under UK and international copyright and trademark laws.

You may not reproduce, duplicate, copy, sell, reverse-engineer, or exploit any portion of our designs or imagery without express prior written consent from our directors.`
    },
    {
      id: "terms-9",
      title: "9. User Content, Reviews & Testimonials",
      content: `If you submit customer reviews, photographs, or styling feedback to our brand, you grant Crimson Canvas a non-exclusive, royalty-free, perpetual license to display, publish, and utilize such feedback across our marketing and lookbook materials.

You warrant that your reviews are truthful, reflect your genuine personal experience, and do not contain defamatory, obscene, or infringing material.`
    },
    {
      id: "terms-10",
      title: "10. Prohibited Conduct",
      content: `When interacting with our storefront, you agree not to:
• Use any automated bot, scraper, crawler, or unauthorized script to extract catalog pricing or bypass security architectures.
• Attempt to gain unauthorized access to our Supabase database, servers, or patron accounts.
• Place fraudulent, speculative, or bad-faith orders.
• Impersonate any individual, affiliate, or customer concierge representative.`
    },
    {
      id: "terms-11",
      title: "11. Disclaimer of Warranties",
      content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CRIMSON CANVAS PROVIDES ITS STOREFRONT AND SERVICES ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

NOTHING IN THESE TERMS SHALL AFFECT YOUR STATUTORY RIGHTS AS A CONSUMER UNDER THE UK CONSUMER RIGHTS ACT 2015 OR EQUIVALENT MANDATORY JURISDICTIONAL CONSUMER PROTECTION LEGISLATION.`
    },
    {
      id: "terms-12",
      title: "12. Limitation of Liability",
      content: `UNDER NO CIRCUMSTANCES SHALL CRIMSON CANVAS, ITS DIRECTORS, ARTISANS, EMPLOYEES, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR PURCHASE OR USE OF OUR GARMENTS.

IN ALL CASES, OUR MAXIMUM AGGREGATE LIABILITY ARISING UNDER OR RELATED TO ANY TRANSACTION SHALL BE STRICTLY LIMITED TO THE ACTUAL PURCHASE AMOUNT PAID BY YOU FOR THE SPECIFIC GARMENT GIVING RISE TO THE CLAIM.`
    },
    {
      id: "terms-13",
      title: "13. Governing Law & Dispute Resolution",
      content: `These Terms and any dispute, controversy, or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of England and Wales.

In the spirit of mindful craft and mutual respect, both parties agree to first seek amicable resolution through direct communication with our Customer Concierge Desk (concierge@crimsoncanvas.com) before initiating formal judicial proceedings in the courts of London, England.`
    },
    {
      id: "terms-14",
      title: "14. Modifications to Terms",
      content: `Crimson Canvas reserves the right to amend these Terms of Service at any time. Changes will be posted to this URL with a revised "Last Updated" date. Your continued utilization of our storefront after revisions constitutes acceptance of the amended Terms.`
    },
    {
      id: "terms-15",
      title: "15. Concierge & Legal Notices",
      content: `For legal correspondence, formal notices, or inquiries regarding your orders and these Terms:

Crimson Canvas Legal & Customer Assurance
14 Savile Row, Mayfair, London W1S 3JN, United Kingdom
Email: legal@crimsoncanvas.com | concierge@crimsoncanvas.com
Concierge Line: +44 20 7946 0198
Operating Hours: Monday – Saturday, 10:00 – 19:00 GMT`
    }
  ], []);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections.filter(
      (s) => s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q)
    );
  }, [sections, searchQuery]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 animate-fade-up">
      {/* Editorial Header Banner */}
      <section className="relative overflow-hidden bg-[#141212] py-16 sm:py-20 text-white isolate">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#8B1E3F]" aria-hidden="true" />
        <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-[#8B1E3F]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container-tight relative z-10 pl-6 sm:pl-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-widest text-[#E5B6BD] uppercase border border-white/10">
                <Scale className="h-3.5 w-3.5" />
                Customer Governance & Consumer Protection
              </span>
              <h1 className="mt-3 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Terms of Service
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                Clear conditions governing orders, bespoke craftsmanship, carbon-neutral shipping, and archive guarantees.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="h-9 rounded-pill border-white/20 bg-white/5 text-xs text-white hover:bg-white/15 hover:text-white"
              >
                <Printer className="mr-2 h-3.5 w-3.5" />
                Print Terms
              </Button>
              <Button asChild size="sm" className="h-9 rounded-pill bg-[#8B1E3F] hover:bg-[#721531] text-xs text-white">
                <Link to="/privacy">
                  <ShieldCheck className="mr-2 h-3.5 w-3.5" />
                  Privacy Notice
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/10 pt-4 text-xs text-neutral-400">
            <div>
              <span className="text-neutral-500">Effective Date:</span>{" "}
              <strong className="text-neutral-300 font-medium">March 1, 2026</strong>
            </div>
            <div>
              <span className="text-neutral-500">Last Revised:</span>{" "}
              <strong className="text-neutral-300 font-medium">March 27, 2026</strong>
            </div>
            <div>
              <span className="text-neutral-500">Legal Jurisdiction:</span>{" "}
              <strong className="text-neutral-300 font-medium">England & Wales • London Courts</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Terms at a Glance Strip */}
      <section className="border-b border-neutral-200 bg-white py-8">
        <div className="container-tight">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B1E3F]">
            Store Terms at a Glance
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-neutral-200/80 bg-[#FAFAFA] p-4">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs sm:text-sm">
                <RotateCcw className="h-4 w-4 text-[#8B1E3F]" />
                30-Day Free Returns
              </div>
              <p className="mt-1 text-xs text-neutral-600 leading-relaxed font-light">
                Full refunds or exchanges on all unworn items with tags within 30 days.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200/80 bg-[#FAFAFA] p-4">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs sm:text-sm">
                <Truck className="h-4 w-4 text-[#8B1E3F]" />
                Carbon-Neutral Delivery
              </div>
              <p className="mt-1 text-xs text-neutral-600 leading-relaxed font-light">
                Tracked express delivery globally. Complimentary on orders over $150.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200/80 bg-[#FAFAFA] p-4">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs sm:text-sm">
                <FileCheck className="h-4 w-4 text-[#8B1E3F]" />
                Clear Transparent Pricing
              </div>
              <p className="mt-1 text-xs text-neutral-600 leading-relaxed font-light">
                No hidden checkout surcharges. Upfront currency and customs clarity.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200/80 bg-[#FAFAFA] p-4">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs sm:text-sm">
                <Sparkles className="h-4 w-4 text-[#8B1E3F]" />
                Natural Textile Integrity
              </div>
              <p className="mt-1 text-xs text-neutral-600 leading-relaxed font-light">
                100% GOTS organic cotton and French linen backed by lifetime care advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sticky Sidebar */}
      <section className="container-tight py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Sticky Sidebar Navigation */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
              <Input
                type="search"
                placeholder="Search terms & clauses…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs rounded-lg bg-white border-neutral-300"
              />
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 px-2">
                Sections Index
              </h3>
              <nav className="space-y-1">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSection(sec.id)}
                    className={`block rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                      activeSection === sec.id
                        ? "bg-[#8B1E3F] text-white font-medium shadow-sm"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Quick Links Card */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Related Legal Documents
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    to="/privacy"
                    className="flex items-center justify-between text-neutral-600 hover:text-[#8B1E3F] transition-colors"
                  >
                    <span>Privacy Notice</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="flex items-center justify-between text-neutral-600 hover:text-[#8B1E3F] transition-colors"
                  >
                    <span>Cookie Preferences</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping"
                    className="flex items-center justify-between text-neutral-600 hover:text-[#8B1E3F] transition-colors"
                  >
                    <span>Shipping & Returns</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          {/* Legal Clauses Body */}
          <main className="space-y-10">
            {filteredSections.length === 0 ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center">
                <HelpCircle className="mx-auto h-8 w-8 text-neutral-400" />
                <h3 className="mt-3 font-semibold text-neutral-800">No matching terms found</h3>
                <p className="mt-1 text-xs text-neutral-500">
                  Try another keyword or reset the search to browse all terms.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="mt-4 rounded-pill text-xs"
                >
                  Reset Search
                </Button>
              </div>
            ) : (
              filteredSections.map((sec) => (
                <article
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-28 rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm transition-all duration-200 hover:border-neutral-300"
                >
                  <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 border-b border-neutral-100 pb-3">
                    {sec.title}
                  </h2>
                  <div className="mt-4 whitespace-pre-line text-xs sm:text-sm text-neutral-700 leading-relaxed font-light space-y-3">
                    {sec.content}
                  </div>
                </article>
              ))
            )}

            {/* Concierge Help Box */}
            <div className="rounded-2xl border border-[#8B1E3F]/20 bg-[#8B1E3F]/5 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-neutral-900">
                    Need Guidance on Your Order?
                  </h3>
                  <p className="text-xs text-neutral-600 max-w-xl">
                    Our Mayfair concierge team is pleased to assist with custom fitting queries, fabric guidance,
                    or return authorizations.
                  </p>
                </div>
                <Button asChild className="rounded-pill bg-[#8B1E3F] hover:bg-[#721531] text-xs text-white">
                  <a href="mailto:concierge@crimsoncanvas.com">
                    <Mail className="mr-2 h-3.5 w-3.5" />
                    Contact Concierge
                  </a>
                </Button>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
