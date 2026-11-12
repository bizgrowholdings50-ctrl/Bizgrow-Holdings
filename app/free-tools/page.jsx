import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, PhoneCall } from "lucide-react";
import FadeIn from "@/components/MotionWrapper";
import FreeToolsFaq from "@/components/FreeToolsFaq";
import ToolInfoModal from "@/components/ScannerInfoModal";

const bs10119Url =
  "https://assessment.bs10119.co.uk/bs10119-score?utm_source=bizgrow_website&utm_medium=free_tools_hub&utm_campaign=bs10119_readiness";

export const metadata = {
  title: "Free Compliance & Readiness Tools | BizGrow Holdings",
  description:
    "Use BizGrow Holdings' free UK compliance and readiness tools to review your compliance position and assess BS 10119 labour provision readiness.",
};

const faqs = [
  {
    q: "Are the tools free to use?",
    a: "Yes. There is no charge to complete either assessment, and you do not need a credit card.",
  },
  {
    q: "Do I need a credit card or a paid subscription?",
    a: "No. The tools are available without payment details or a subscription.",
  },
  {
    q: "How soon will I see my results?",
    a: "The Compliance Health Scanner shows your score and category results when you complete the assessment. The BS 10119 tool provides its result through the external assessment service.",
  },
  {
    q: "What happens to the details I enter?",
    a: "The Compliance Health Scanner asks for your name, organisation and email (phone is optional). Those details and your assessment answers are submitted to BizGrow Holdings so we can save your assessment and send your report. The BS 10119 check is hosted by a separate provider, so its own privacy information applies there.",
  },
];

const tools = [
  {
    name: "BS 10119 Readiness Check",
    category: "BS 10119 Free Assessment",
    description:
      "Review your labour provision practices against BS 10119 and identify readiness gaps.",
    bullets: ["Operational controls", "Workforce vetting", "Readiness score"],
    href: bs10119Url,
    action: bs10119Url,
    actionLabel: "Assess BS 10119 Readiness",
    external: true,
    image: "/bs10119-score.png",
    imageAlt: "BS 10119 readiness score assessment",
    info: {
      eyebrow: "External UK Standard Assessment",
      description:
        "Use the BS 10119 readiness check to review labour provision and supply chain practices against the standard’s expectations for security and events providers.",
      highlights: [
        "Consider operational readiness and labour provision controls",
        "Review alignment of workforce vetting and supply chain practices",
        "Continue to the external assessment for its readiness score",
      ],
      note: "The assessment is hosted by an external provider. Its privacy information and assessment terms apply when you continue.",
    },
  },
  {
    name: "Compliance Health Scanner",
    category: "Free compliance assessment",
    description:
      "A quick self-assessment of your policies, workforce controls and compliance evidence.",
    bullets: [
      "Policies & accreditation",
      "People & vetting",
      "Risk, records & insurance",
    ],
    action: "/compliance-scanner",
    actionLabel: "Check Your Compliance Score",
    image: "/health-scanner-1.png",
    imageAlt: "Compliance Health Scanner assessment",
    info: {
      eyebrow: "Free organisation readiness assessment",
      description:
        "A guided self-assessment to help you understand your organisation’s compliance foundations. It takes about five minutes and provides a useful starting point for prioritising improvements.",
      highlights: [
        "Assess policies, procedures and accreditation progress",
        "Review people, vetting and day-to-day operational controls",
        "Receive an overall score, category results and a detailed report",
      ],
      note: "This is a self-assessment, not an automated website scan, formal audit or certification decision. Your results are based on the answers you provide.",
    },
  },
];

export default function FreeToolsPage() {
  return (
    <main className=" bg-white">
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#090338] via-[#12066a] to-[#1d0d8a] px-5 py-24 text-white sm:px-8">
        {/* Ambient Radial Glows (Pure CSS Gradients) */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#997819]/20 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-32 h-[550px] w-[550px] rounded-full bg-[#3b27ba]/35 blur-[140px]" />

        {/* Subtle Architectural Grid Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Concentric Decorative Rings */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[980px] w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#997819]/10" />

        {/* Main Content */}
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <FadeIn direction="up" duration={0.65}>
            {/* Top Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#997819]/40 bg-white/[0.06] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#e5c158] backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#e5c158]" />
              BizGrow Interactive Diagnostic Suite
            </div>
          </FadeIn>
          <FadeIn delay={0.12} duration={0.8}>
            {/* Headline with Gold Gradient Accent */}
            <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Free{" "}
              <span className="bg-gradient-to-r from-[#f3d478] via-[#d4af37] to-[#997819] bg-clip-text text-transparent">
                Compliance &amp; Readiness
              </span>{" "}
              Tools for UK Businesses
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.24} duration={0.7}>
            {/* Sub-headline */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-200/90 sm:text-xl sm:leading-8">
              Benchmark your website&apos;s regulatory posture and evaluate your
              BS 10119 operational readiness in minutes—100% free, instant
              insights, zero friction.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.36} duration={0.7}>
            {/* Quick Action Pills / Anchor Links */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#tools-showcase"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b89225] to-[#997819] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#997819]/25 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                Explore Free Tools
                <span aria-hidden="true">↓</span>
              </a>
              <div className="flex items-center gap-4 rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-xs font-medium text-slate-200 backdrop-blur-md">
                <span>✓ No Credit Card</span>
                <span className="h-3 w-[1px] bg-white/20" />
                <span>✓ Instant Score</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 w-full max-w-fit -translate-x-1/2 text-center">
          <FadeIn direction="up" delay={0.25} duration={0.65}>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
              Scroll to Tools
            </span>
            <div className="mx-auto mt-2 h-6 w-[1px] bg-gradient-to-b from-[#e5c158]/70 to-transparent" />
          </FadeIn>
        </div>
      </section>

      <section
        id="tools-showcase"
        className="px-5 py-14 sm:px-8 sm:py-20 bg-[#faf9f7]"
      >
        {/* Stylish Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <FadeIn duration={0.7}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#997819]/30 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#997819] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#997819]" />
              Interactive Diagnostic Suite
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#12066a] sm:text-4xl lg:text-5xl">
              Select a Tool to Begin Your Evaluation
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Choose between our automated website compliance auditor or our
              dedicated BS 10119 readiness assessment app to get instant
              corporate insights.
            </p>
          </FadeIn>
        </div>

        {/* Tools Grid */}
        <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-2">
          {tools.map((tool, index) => (
            <FadeIn key={tool.name} delay={0.12 + index * 0.18} duration={0.7}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_16px_45px_rgba(18,6,106,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#997819]/40 hover:shadow-[0_24px_60px_rgba(18,6,106,0.14)]">
                <div className="relative aspect-[16/8.5] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={tool.image}
                    alt={tool.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10094b]/55 via-transparent to-black/10" />
                  <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3 sm:inset-x-6 sm:top-6">
                    <span className="rounded-full border border-white/35 bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#12066a] shadow-sm backdrop-blur">
                      {tool.category}
                    </span>
                    <span className="text-xs font-semibold tracking-[0.16em] text-white/85">
                      0{index + 1}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  <h3 className="text-2xl font-bold tracking-tight text-[#12066a] sm:text-[27px]">
                    {tool.name}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                    {tool.description}
                  </p>
                  <ul className="mt-5 grid gap-2 border-t border-slate-100 pt-4 sm:grid-cols-3">
                    {tool.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-xs font-medium leading-5 text-slate-700"
                      >
                        <Check
                          size={14}
                          className="mt-0.5 shrink-0 text-[#997819]"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-col gap-3 border-t border-slate-100 pt-5">
                    {tool.external ? (
                      <a
                        href={tool.action}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#12066a] px-3 py-3 text-xs font-bold text-white transition hover:bg-[#997819] sm:text-sm"
                      >
                        {tool.actionLabel} <ArrowUpRight size={16} />
                      </a>
                    ) : (
                      <Link
                        href={tool.action}
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#12066a] px-3 py-3 text-xs font-bold text-white transition hover:bg-[#997819] sm:text-sm"
                      >
                        {tool.actionLabel} <ArrowRight size={16} />
                      </Link>
                    )}
                    <ToolInfoModal
                      title={tool.name}
                      eyebrow={tool.info.eyebrow}
                      description={tool.info.description}
                      highlights={tool.info.highlights}
                      note={tool.info.note}
                      href={tool.action}
                      actionLabel={tool.actionLabel}
                      external={tool.external}
                    />
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <FreeToolsFaq faqs={faqs} title="Frequently Asked Questions" />

      <section className="px-5 py-12 sm:px-8 sm:py-16">
  <div
    className="relative isolate mx-auto flex min-h-[390px] max-w-7xl items-center justify-center overflow-hidden rounded-[28px] bg-[#12066a] bg-cover bg-center px-6 py-14 text-center text-white shadow-[0_24px_70px_rgba(18,6,106,0.2)] sm:min-h-[440px] sm:px-12 sm:py-20"
    style={{
      backgroundImage:
        "linear-gradient(110deg, rgba(18,6,106,0.85), rgba(10,6,56,0.78)), url('/about-cta.jpg')",
      backgroundAttachment: "fixed",
    }}
  >
    <div className="relative mx-auto max-w-4xl">
      <FadeIn direction="up" duration={0.7}>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e2c05b] sm:text-sm">
          Close Your Compliance Gaps
        </p>
      </FadeIn>
      <FadeIn direction="up" delay={0.12} duration={0.7}>
        <h2 className="mt-4 text-3xl font-bold  leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Need Help Fixing What Your{" "}
          <span className="text-[#d5ad2f]">Scan Revealed?</span>
        </h2>
      </FadeIn>
      <FadeIn direction="up" delay={0.24} duration={0.7}>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
          Our UK compliance specialists can review your diagnostic report, resolve hidden digital or BS 10119 risks, and build a bulletproof regulatory framework for your business.
        </p>
      </FadeIn>
      <FadeIn direction="up" delay={0.36} duration={0.7}>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/contact-us"
            className="inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#997819] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-lg transition hover:bg-[#b18d25] sm:w-auto"
          >
            Review Report With an Expert <ArrowRight size={17} />
          </Link>
          <a
            href="tel:+447898205035"
            className="inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-xl border border-white/25 bg-black/20 px-6 py-3.5 text-xs font-bold tracking-[0.08em] text-white backdrop-blur-sm transition hover:border-[#d5ad2f] hover:bg-black/35 sm:w-auto"
          >
            <PhoneCall size={15} className="text-[#d5ad2f]" />
            +44 7898 205035
          </a>
        </div>
      </FadeIn>
    </div>
  </div>
</section>
    </main>
  );
}
