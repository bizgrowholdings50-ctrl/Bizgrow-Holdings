import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileCheck2,
  ShieldCheck,
  Users,
} from "lucide-react";
import FadeIn from "@/components/MotionWrapper";
import FreeToolsFaq from "@/components/FreeToolsFaq";
import JsonLd from "@/components/JsonLd";

const scannerUrl = "/compliance-scanner";

export const metadata = {
  title: "Compliance Health Scanner | Free Business Readiness Assessment",
  description:
    "Get a free scored snapshot of your organisation’s compliance readiness across accreditations, people and vetting, site operations, records and insurance.",
};

const evaluationAreas = [
  {
    icon: BadgeCheck,
    title: "Policies & accreditation",
    description:
      "Review whether your policies and procedures are current and followed, alongside relevant certifications and accreditation progress.",
  },
  {
    icon: Users,
    title: "People & vetting",
    description:
      "Consider how consistently your organisation verifies identity, references and background checks before staff start.",
  },
  {
    icon: ShieldCheck,
    title: "Risk & site operations",
    description:
      "Check site risk assessments, training and licence records, and how operational issues are monitored and addressed.",
  },
  {
    icon: FileCheck2,
    title: "Records, insurance & evidence",
    description:
      "Review incident records, insurance cover and how quickly your organisation can produce the compliance documents clients request.",
  },
];

const faqs = [
  {
    q: "What does the Compliance Health Scanner assess?",
    a: "It is a guided self-assessment covering accreditations and policies, people and vetting, risk and site operations, and records, insurance and compliance evidence.",
  },
  {
    q: "Does it scan my website or check cookies?",
    a: "No. The current tool is an organisation-wide questionnaire, not an automated website, cookie or GDPR crawler. You answer questions about your own controls and practices.",
  },
  {
    q: "How long does the assessment take?",
    a: "The assessment takes approximately five minutes. You will need to provide your name, organisation and email address; phone number is optional.",
  },
  {
    q: "What do I receive at the end?",
    a: "You receive an overall readiness score, a risk status and scores for each assessment category. A detailed report is sent to the email address you provide.",
  },
  {
    q: "How is my information used?",
    a: "Your contact details and assessment responses are submitted to BizGrow Holdings to save the assessment and deliver your report. Please review our Privacy Policy before submitting your information.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function ComplianceScannerDetailPage() {
  return (
    <main className="mt-16 bg-white">
      <JsonLd schema={faqSchema} />

      <section className="relative overflow-hidden bg-[#12066a] px-5 pb-16 pt-16 text-white sm:px-8 sm:pb-20 sm:pt-20">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/compliance-hero-bg.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12066a] via-[#12066a]/95 to-[#12066a]/75" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <FadeIn>
            <Link href="/free-tools" className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 transition hover:text-[#d8bd72]">
              <ArrowRight size={14} className="rotate-180" /> All free tools
            </Link>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#d8bd72]/35 bg-white/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e2c978]">
              <ShieldCheck size={14} />
              Free organisation readiness assessment
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Compliance Health Scanner
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Understand where your organisation stands. Review key compliance controls in a guided self-assessment, then get a scored snapshot and a clear view of areas to prioritise.
            </p>
            <Link href={scannerUrl} className="mt-8 inline-flex min-h-13 items-center gap-2 rounded-xl bg-[#997819] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-white hover:text-[#12066a]">
              Start Free Scan <ArrowRight size={17} />
            </Link>
            <p className="mt-3 text-xs text-white/55">About five minutes · No payment details required</p>
          </FadeIn>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#997819]">What it evaluates</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#12066a] sm:text-4xl">A practical view of your compliance foundations</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                The scanner uses your answers to highlight readiness across the areas that support day-to-day assurance, audits and client requirements.
              </p>
            </div>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2">
            {evaluationAreas.map(({ icon: Icon, title, description }, index) => (
              <FadeIn key={title} delay={index * 0.08}>
                <article className="h-full rounded-2xl border border-slate-200 bg-[#faf9f7] p-6 sm:p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#12066a] text-[#d8bd72]">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-[#12066a]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
                </article>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#997819]/20 bg-[#997819]/[0.06] p-4 text-sm leading-6 text-slate-700">
              <ClipboardCheck className="mt-0.5 shrink-0 text-[#997819]" size={18} />
              <p><strong className="text-[#12066a]">A self-assessment, not an audit.</strong> Results are based on the answers you provide and are intended as an initial readiness guide, not formal certification or legal advice.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#faf9f7] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-10 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#997819]">Simple process</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#12066a] sm:text-4xl">How it works</h2>
            </div>
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Tell us who you are",
                text: "Enter your name, organisation and email address. A phone number is optional.",
              },
              {
                number: "02",
                title: "Answer guided questions",
                text: "Work through short questions about your policies, workforce, operations and evidence.",
              },
              {
                number: "03",
                title: "Review your score",
                text: "See your overall readiness, category scores and risk status, with a detailed report sent by email.",
              },
            ].map((step, index) => (
              <FadeIn key={step.number} delay={index * 0.1}>
                <article className="relative h-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
                  <span className="text-sm font-extrabold tracking-[0.15em] text-[#997819]">{step.number}</span>
                  <h3 className="mt-4 text-xl font-bold text-[#12066a]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FreeToolsFaq faqs={faqs} title="Compliance Health Scanner FAQs" />

      <section
        className="relative overflow-hidden bg-[#12066a] px-5 py-16 text-white sm:px-8 sm:py-20"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(18,6,106,0.96), rgba(18,6,106,0.9)), repeating-linear-gradient(45deg, transparent, transparent 34px, rgba(255,255,255,0.08) 35px, transparent 36px)",
          backgroundAttachment: "fixed",
        }}
      >
        <FadeIn>
          <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8bd72]">Your next step</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Ready to see your compliance snapshot?</h2>
              <p className="mt-4 text-sm leading-7 text-white/75">Start the free assessment and get a clearer picture of your organisation’s readiness.</p>
            </div>
            <Link href={scannerUrl} className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-[#997819] px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#12066a]">
              Start Free Scan <ArrowRight size={17} />
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
