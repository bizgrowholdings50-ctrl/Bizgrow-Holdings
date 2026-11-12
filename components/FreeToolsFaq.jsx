import FadeIn from "@/components/MotionWrapper";

export default function FreeToolsFaq({ faqs, title = "Frequently asked questions" }) {
  return (
    <section className="bg-[#faf9f7] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <FadeIn duration={0.7}>
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#997819]">Helpful answers</p>
            <h2 className="mt-3 text-5xl font-bold tracking-tight text-[#12066a] ">{title}</h2>
          </div>
        </FadeIn>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FadeIn key={faq.q} delay={0.08 + index * 0.1} duration={0.65}>
              <details className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#997819]/40 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left text-base font-bold text-[#12066a] marker:hidden [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#12066a]/[0.06] text-lg leading-none text-[#997819] transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">{faq.a}</p>
              </details>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
