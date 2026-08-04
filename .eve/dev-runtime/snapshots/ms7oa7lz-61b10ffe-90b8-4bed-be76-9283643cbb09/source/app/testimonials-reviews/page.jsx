import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
// Dono components ko alag alag import karein
import VideoTestimonials from "@/components/VideoTestimonials";
import TextTestimonials from "@/components/TextTestimonials";


export const metadata = {
  title: "BizGrow Holdings Reviews | Client Testimonials & Success Stories",
  description: "Read BizGrow Holdings client testimonials and reviews. Explore real success stories, results, and trusted compliance services.",
};
const TestimonialsPage = () => {
  return (
    // 'overflow-x-hidden' ensures ke koi b element width se bahar na nikal sakay
    <main className="relative w-full overflow-x-hidden bg-white min-h-screen">
      {/* 🔹 1. PREMIUM HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 bg-[#12066a] overflow-hidden">
        {/* 1. Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/reviews-bg.jpg" // 👈 Apni premium image ka path yahan dein
            alt="BizGrow Background"
            fill
            className="object-cover object-center scale-105 animate-subtle-zoom" // Thora zoom effect premium lagta hai
            priority
          />

          {/* 2. Layered Overlays (Darkness + Branding Color) */}
          {/* Gradient taake text pop kare aur niche wala section smoothly merge ho */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#12066a]/90 via-[#12066a]/80 to-[#12066a]" />

          {/* Subtle Grid Pattern on top of image */}
          <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')] bg-repeat" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <FadeIn direction="up">
            <span className="inline-block text-[#997819] font-black uppercase tracking-[0.5em] text-[10px] bg-white/5 px-8 py-3 rounded-full border border-white/10 mb-8 backdrop-blur-sm">
              Global Trust & Excellence
            </span>

            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.8] mb-8 uppercase">
              Proven <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#997819] via-[#d4af37] to-[#997819]">
                Impact
              </span>
            </h1>

            <p className="text-blue-100/70 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed drop-shadow-lg">
              Real stories from our partners at BizGrow Holdings. We
              don't just deliver results; we build legacies.
            </p>

            {/* Optional: Add a Scroll Down Indicator */}
            <div>
              <div className="w-[1px] h-20 bg-gradient-to-b from-[#997819] to-transparent mx-auto" />
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
