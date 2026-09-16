// app/testimonials-reviews/page.jsx
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import VideoTestimonials from "@/components/VideoTestimonials";
import TextTestimonials from "@/components/TextTestimonials";

export const metadata = {
  title: "BizGrow Holdings Reviews | Client Testimonials & Success Stories",
  description: "Read BizGrow Holdings client testimonials and reviews. Explore real success stories, results, and trusted compliance services.",
};

const TestimonialsPage = () => {
  return (
    <main className="relative w-full overflow-x-hidden bg-white min-h-screen">
      {/* 🔹 1. PREMIUM HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 bg-[#12066a] overflow-hidden">
        {/* 1. Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/reviews-bg.jpg"
            alt="BizGrow Background"
            fill
            className="object-cover object-center scale-105 animate-subtle-zoom"
            priority
          />

          {/* 2. Layered Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#12066a]/90 via-[#12066a]/80 to-[#12066a]" />
          <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')] bg-repeat" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center w-full">
          <FadeIn direction="up">
            <span className="inline-block mt-10 text-white font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[9px] md:text-[10px] bg-white/5 px-6 md:px-8 py-2.5 md:py-3 rounded-full border border-white/30 mb-6 md:mb-8 backdrop-blur-sm">
              Global Trust & Excellence
            </span>

            {/* 🔹 Heading ek hi line mein rahegi (whitespace-nowrap aur optimized font-size ke sath) */}
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-6 md:mb-8 uppercase whitespace-nowrap">
              Proven{" "}
              <span className="text-transparent bg-clip-text ml-2 sm:ml-4 bg-gradient-to-r from-[#997819] via-[#d4af37] to-[#997819]">
                Impact
              </span>
            </h1>

            <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-medium leading-relaxed px-4 drop-shadow-lg">
              Real stories from our partners at BizGrow Holdings. We
              don't just deliver results; we build legacies.
            </p>

            {/* Scroll Down Indicator */}
            <div className="mt-8">
              <div className="w-[1px] h-16 md:h-20 bg-gradient-to-b from-[#997819] to-transparent mx-auto" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Components */}
      <div className="relative w-full overflow-hidden">
        <VideoTestimonials />
      </div>

      <div className="relative w-full overflow-hidden">
        <TextTestimonials />
      </div>
    </main>
  );
};

export default TestimonialsPage;