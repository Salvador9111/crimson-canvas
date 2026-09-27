import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  FileText, 
  Printer, 
  Search, 
  ArrowRight, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Cookie, 
  Scale, 
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PrivacyNotice() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("section-1");

  const sections = useMemo(() => [
    {
      id: "section-1",
      title: "1. Scope & Data Controller",
      content: `Crimson Canvas ("we," "our," "the Company," or "Crimson Canvas Ltd.") operates the digital storefront and luxury garment archive located at crimsoncanvas.com. For the purposes of the UK Data Protection Act 2018, General Data Protection Regulation (EU GDPR 2016/679), and California Consumer Privacy Act (CCPA/CPRA), the designated Data Controller responsible for your personal information is:

Crimson Canvas Heritage Ltd.
14 Savile Row, Mayfair, London W1S 3JN, United Kingdom
Company Registration: #09841203 (England & Wales)
Data Protection Officer Contact: privacy@crimsoncanvas.com

This Privacy Notice governs all customer interactions across our digital boutique, bespoke fitting consultations, order checkout, newsletter communications, and customer concierge inquiries.`
    },
    {
      id: "section-2",
      title: "2. Information We Collect",
      content: `We collect information necessary to deliver exceptional apparel craftsmanship, fulfill global shipments, and provide elevated customer service. This includes:

A. Personal & Contact Identification: Full name, honorific, delivery address, billing address, email address, telephone contact for courier notifications.
B. Commercial & Transaction Records: Garments ordered, bespoke size specifications, order totals, transaction status, purchase dates, archive wishlist items, and invoice history.
C. Secure Payment Tokens: We utilize PCI-DSS Level 1 compliant payment gateways (such as Stripe). We do not store raw credit/debit card numbers or CVV codes on our servers; only tokenized references and transaction identifiers are retained for order reconciliation.
D. Account Credentials: For registered members, encrypted passwords, authentication sessions, and saved shipping preferences.
E. Technical & Browsing Data: IP address, browser type, device operating system, referring URLs, pages viewed, time spent on garment details, and cookie identifiers (as governed by our Cookie Policy).
F. Concierge Inquiries: Communications submitted via our concierge contact form, emails regarding tailoring, size advice, or aftercare.`
    },
    {
      id: "section-3",
      title: "3. How We Use Your Data & Legal Grounds",
      content: `Under UK and European data privacy laws, every processing activity requires a recognized lawful basis:

1. Performance of a Contract (Article 6(1)(b) GDPR):
• Processing your order, generating packing manifests, and arranging carbon-neutral dispatch via international couriers (DHL Express, FedEx).
• Managing 30-day returns, exchanges, and warranty inquiries.
• Providing account access and order history tracking.

2. Legitimate Interests (Article 6(1)(f) GDPR):
• Preventing fraudulent transactions, duplicate orders, and chargeback disputes.
• Ensuring server stability, safeguarding website security, and optimizing garment catalog performance.
• Internal financial audits, stock allocation, and supply chain forecasting.

3. Explicit Consent (Article 6(1)(a) GDPR):
• Delivering our Journal newsletter, private archive pre-order previews, and tailored styling editorial (you may unsubscribe at any moment).
• Non-essential analytical and personalization cookies.

4. Legal Obligation (Article 6(1)(c) GDPR):
• Compliance with HMRC / UK tax records, statutory customs declarations, VAT recording, and export control regulations.`
    },
    {
      id: "section-4",
      title: "4. Third-Party Service Providers & Zero-Sale Guarantee",
      content: `WE DO NOT SELL, RENT, OR MONETIZE YOUR PERSONAL INFORMATION. We never distribute customer data to data brokers or third-party marketing syndicates.

We partner exclusively with vetted enterprise service providers who are bound by stringent Data Processing Agreements (DPAs):
• Logistics & Courier Services: DHL Express, FedEx, and Royal Mail for package delivery and SMS tracking updates.
• Payment Processing: PCI-DSS Level 1 payment processors for encrypted transaction settlement.
• Database & Cloud Infrastructure: Supabase and Vercel cloud environments with AES-256 data-at-rest encryption and ISO 27001 certified physical centers.
• Communications & Concierge: Transactional email providers for order receipts, tracking confirmations, and password resets.`
    },
    {
      id: "section-5",
      title: "5. International Data Transfers & Safeguards",
      content: `As an international luxury fashion brand serving patrons across Europe, North America, and the Asia-Pacific region, your data may be transferred to and processed in countries outside your country of residence.

When transfers occur outside the United Kingdom or European Economic Area (EEA), we enforce recognized cross-border safeguards:
• UK International Data Transfer Agreements (IDTAs) and EU Standard Contractual Clauses (SCCs).
• Adequacy decisions adopted by the UK Secretary of State and European Commission.
• Strict end-to-end cryptographic standards (TLS 1.3 in transit and AES-256 at rest).`
    },
    {
      id: "section-6",
      title: "6. Data Retention Policy",
      content: `We retain personal data only as long as necessary for the purpose collected:
• Order & Invoicing Records: Retained for 6 years following the end of the relevant tax year to satisfy statutory financial audits, customs verifications, and accounting requirements.
• Member Account Data: Maintained active for the lifetime of your account. You may request account deletion at any time.
• Concierge Inquiries: Inactive customer correspondence is purged after 24 months.
• Newsletter Subscriptions: Retained until you opt out or withdraw consent via the unsubscribe link present in every newsletter.
• Inactive Guest Checkout Data: Sanitized and anonymized for aggregate trend analysis after 36 months.`
    },
    {
      id: "section-7",
      title: "7. Your Statutory Privacy Rights",
      content: `Depending on your jurisdiction (UK GDPR, EU GDPR, or US State Laws including California CCPA/CPRA), you possess comprehensive rights over your personal data:

• Right to Access: You may request a complete copy of all personal records we maintain regarding your account and order history.
• Right to Rectification: You may correct inaccurate or incomplete billing, shipping, or contact information.
• Right to Erasure ("Right to be Forgotten"): You may request complete erasure of your account and personal identifiers, subject only to ongoing statutory tax obligations.
• Right to Restrict Processing: You may request that we temporarily suspend active processing of your data while a dispute or audit is evaluated.
• Right to Data Portability: You may request your order history and account data in a structured, machine-readable JSON or CSV format.
• Right to Object: You may object to any processing rooted in our legitimate interests or direct marketing at any time.
• Non-Discrimination: In compliance with California CCPA, Crimson Canvas will never deny goods, charge differing rates, or provide varying levels of quality or service based on the exercise of your privacy rights.

To exercise any right, email our Privacy Team at privacy@crimsoncanvas.com with the subject line "Data Subject Request". We respond within thirty (30) calendar days.`
    },
    {
      id: "section-8",
      title: "8. Payment Security & Encryption Standards",
      content: `The security of your transactions and confidentiality is paramount to Crimson Canvas:
• Transport Security: Every digital interaction across crimsoncanvas.com is encrypted utilizing Transport Layer Security (TLS 1.3) with modern SHA-256 cipher suites.
• Payment Tokenization: All card transactions bypass our web servers and are submitted directly to tokenized payment vaults. Crimson Canvas personnel never have visibility into full card numbers.
• Access Governance: Internal access to customer orders and shipping records is restricted strictly to authorized concierge and dispatch specialists through two-factor authentication (2FA).`
    },
    {
      id: "section-9",
      title: "9. Cookies & Telemetry",
      content: `Our website utilizes essential cookies to maintain your shopping bag across browsing sessions and safeguard checkout authentication. We also provide full granular control over optional analytical and functional cookies.

For complete specifications regarding our cookie classifications, persistence durations, and an interactive preferences manager, please review our dedicated Cookie Preferences & Policy page.`
    },
    {
      id: "section-10",
      title: "10. Children's Privacy",
      content: `Crimson Canvas does not intentionally market to, collect data from, or sell garments to children under sixteen (16) years of age. If you believe a minor has created an account or placed an order without parental authorization, please contact us immediately for prompt deletion of the associated records.`
    },
    {
      id: "section-11",
      title: "11. Notice Modifications & Updates",
      content: `We may periodically revise this Privacy Notice to reflect evolving operational practices, new artisan collaborations, or legislative updates. Any significant changes will be published here with an updated "Last Modified" timestamp. For substantial alterations affecting your rights, we will notify registered patrons via email.`
    },
    {
      id: "section-12",
      title: "12. Concierge & Privacy Inquiries",
      content: `For questions regarding this policy, to request data exports, or to contact our Data Protection Officer:

Data Protection Officer
Crimson Canvas Ltd.
14 Savile Row, Mayfair, London W1S 3JN, UK
Direct Privacy Desk: privacy@crimsoncanvas.com
General Concierge: concierge@crimsoncanvas.com
Operating Hours: Monday – Saturday, 10:00 – 19:00 GMT

Patrons within the United Kingdom also have the right to lodge a complaint with the UK Information Commissioner's Office (ICO) at ico.org.uk.`
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
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-[#8B1E3F]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container-tight relative z-10 pl-6 sm:pl-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-widest text-[#E5B6BD] uppercase border border-white/10">
                <ShieldCheck className="h-3.5 w-3.5" />
                Customer Trust & Compliance
              </span>
              <h1 className="mt-3 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Privacy Notice
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                Clear, transparent, and respectful data protection standards for patrons of Crimson Canvas worldwide.
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
                Print Notice
              </Button>
              <Button asChild size="sm" className="h-9 rounded-pill bg-[#8B1E3F] hover:bg-[#721531] text-xs text-white">
                <Link to="/cookies">
                  <Cookie className="mr-2 h-3.5 w-3.5" />
                  Cookie Settings
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
              <span className="text-neutral-500">Last Reviewed:</span>{" "}
              <strong className="text-neutral-300 font-medium">March 27, 2026</strong>
            </div>
            <div>
              <span className="text-neutral-500">Jurisdiction:</span>{" "}
              <strong className="text-neutral-300 font-medium">UK GDPR • EU GDPR • CCPA Compliant</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Strip */}
      <section className="border-b border-neutral-200 bg-white py-8">
        <div className="container-tight">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B1E3F]">
            Privacy at a Glance
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-neutral-200/80 bg-[#FAFAFA] p-4">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs sm:text-sm">
                <EyeOff className="h-4 w-4 text-[#8B1E3F]" />
                Zero Data Selling
              </div>
              <p className="mt-1 text-xs text-neutral-600 leading-relaxed font-light">
                We never monetize, broker, or sell personal customer records to third parties.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200/80 bg-[#FAFAFA] p-4">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs sm:text-sm">
                <Lock className="h-4 w-4 text-[#8B1E3F]" />
                Tokenized Payments
              </div>
              <p className="mt-1 text-xs text-neutral-600 leading-relaxed font-light">
                PCI-DSS Level 1 encrypted transactions. We never store credit or debit card numbers.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200/80 bg-[#FAFAFA] p-4">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs sm:text-sm">
                <CheckCircle2 className="h-4 w-4 text-[#8B1E3F]" />
                Full Data Ownership
              </div>
              <p className="mt-1 text-xs text-neutral-600 leading-relaxed font-light">
                Request an export or full erasure of your customer profile and order history anytime.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200/80 bg-[#FAFAFA] p-4">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs sm:text-sm">
                <ShieldCheck className="h-4 w-4 text-[#8B1E3F]" />
                Savile Row Heritage
              </div>
              <p className="mt-1 text-xs text-neutral-600 leading-relaxed font-light">
                Registered UK company with physical oversight and dedicated concierge support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sidebar */}
      <section className="container-tight py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Sticky Sidebar Navigation */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
              <Input
                type="search"
                placeholder="Search privacy clauses…"
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
                    to="/terms"
                    className="flex items-center justify-between text-neutral-600 hover:text-[#8B1E3F] transition-colors"
                  >
                    <span>Terms of Service</span>
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
                <h3 className="mt-3 font-semibold text-neutral-800">No matching privacy clauses found</h3>
                <p className="mt-1 text-xs text-neutral-500">
                  Try adjusting your search terms or clear the filter to browse the full notice.
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
                    Questions Regarding Your Data?
                  </h3>
                  <p className="text-xs text-neutral-600 max-w-xl">
                    Our dedicated privacy desk and Mayfair concierge team are available to help you with data
                    portability, account deletion, or tailoring records inquiries.
                  </p>
                </div>
                <Button asChild className="rounded-pill bg-[#8B1E3F] hover:bg-[#721531] text-xs text-white">
                  <a href="mailto:privacy@crimsoncanvas.com">
                    <Mail className="mr-2 h-3.5 w-3.5" />
                    Contact Privacy Team
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
