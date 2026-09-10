"use client";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ShieldCheck,
  Award,
  FileText,
  Lock,
  Play,
  Pause,
  ArrowDown,
} from "lucide-react";

const HorizontalProcess = () => {
  const targetRef = useRef(null);
  const [isVertical, setIsVertical] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isTabletTouch = window.matchMedia(
        "(pointer: coarse) and (max-width: 1366px)",
      ).matches;
      setIsVertical(isTabletTouch || window.innerWidth <= 1025);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const percent = Math.min(Math.max(Math.round(latest * 100), 0), 100);
      setScrollPercent(percent);
      if (latest >= 0.99 && isAutoPlaying) {
        setIsAutoPlaying(false);
      }
    });
  }, [scrollYProgress, isAutoPlaying]);

  useEffect(() => {
    let animationFrameId;
    if (isAutoPlaying && targetRef.current) {
      const element = targetRef.current;

      const scrollStep = () => {
        const currentScroll = window.scrollY;
        const targetTop = element.offsetTop;
        const sectionHeight = element.offsetHeight;

        if (
          currentScroll >= targetTop - 50 &&
          currentScroll < targetTop + sectionHeight - window.innerHeight
        ) {
          window.scrollBy({ top: 1.2, behavior: "auto" });
        } else if (currentScroll < targetTop) {
          window.scrollTo({ top: targetTop, behavior: "smooth" });
        }

        if (isAutoPlaying) {
          animationFrameId = requestAnimationFrame(scrollStep);
        }
      };

      animationFrameId = requestAnimationFrame(scrollStep);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoPlaying]);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001,
  });

const x = useTransform(
    smoothProgress,
    [0, 0.12, 0.28, 0.42, 0.58, 0.75, 0.88, 1], 
    ["0vw", "0vw", "-100vw", "-100vw", "-200vw", "-200vw", "-300vw", "-300vw"],
  );

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = useTransform(
    smoothProgress,
    [0, 1],
    [circumference, 0],
  );

  const promptOpacity = useTransform(
    smoothProgress,
    [0.01, 0.06, 0.18, 0.24],
    [0, 1, 1, 0],
  );
  const promptScale = useTransform(smoothProgress, [0.01, 0.06], [0.9, 1]);

  const sections = [
    {
      id: "01",
      tag: "Security Standards",
      title: "Security Accreditation",
      description:
        "Build credibility, strengthen your operational compliance and meet recognised UK security benchmarks.",
      bgImage: "/bff32405515f5c8002a7bed0ada4c092.jpg",
      highlightText: "SIA ACS & Vetting Compliance",
      icon: ShieldCheck,
      details:
        "Comprehensive framework alignment designed to elevate private security operational trust and credentials across the UK market.",
    },
    {
      id: "02",
      tag: "Quality Frameworks",
      title: "Quality & Management",
      description:
        "Implement structured management systems that improve consistency, corporate performance, and business confidence.",
      bgImage: "/Quality-Management.jpg",
      highlightText: "ISO 9001, 14001 & 45001",
      icon: Award,
      details:
        "Drive organisational excellence, environmental responsibility, and robust occupational safety standards systematically.",
    },
    {
      id: "03",
      tag: "Contractor Compliance",
      title: "Health & Safety",
      description:
        "Strengthen contractor credentials and prepare your organisation for elite, verified UK safety accreditations.",
      bgImage: "/Healt & Safety.jpg",
      highlightText: "CHAS, SafeContractor & Constructionline",
      icon: FileText,
      details:
        "Seamless documentation and audit readiness to clear pre-qualification barriers and secure high-value contracts.",
    },
    {
      id: "04",
      tag: "Digital Protection",
      title: "Cyber Security",
      description:
        "Demonstrate rigorous digital resilience and ensure your organisation protects sensitive data against modern threats.",
      bgImage: "/Cyber-Security.jpg",
      highlightText: "Cyber Essentials & Plus",
      icon: Lock,
      details:
        "Independent technical verification and security controls that provide instant assurance to your enterprise clients.",
    },
  ];

  const sectionHeightVh =
    isVertical === false ? (sections.length + 1) * 100 : "auto";

  return (
    <section
      ref={targetRef}
      style={{
        height:
          isVertical === null
            ? "100vh"
            : isVertical
              ? "auto"
              : `${sectionHeightVh}vh`,
      }}
      className="relative bg-[#12066a] overflow-visible py-16 lg:py-0 min-h-screen"
    >
      <div
        className={`${
          isVertical === false
            ? "sticky top-0 h-screen w-full flex items-center overflow-clip"
            : "relative"
        }`}
      >
        {/* Section Heading */}
        <div
          className={`
            ${
              isVertical
                ? "relative pt-14 pb-2 px-6"
                : "absolute top-24 lg:top-28 left-0 right-0 z-30"
            }
            flex
            flex-col
            items-center
            text-center
            pointer-events-none
          `}
        >
          <div className="flex items-center gap-3 -mb-1">
            <span className="w-8 h-[1px] -mt-3  bg-[#997819]/70" />
            <span className="text-[#D4AF37] -mt-3 font-bold tracking-[0.22em] uppercase text-[12px] mb-2">
              Our Expertise
            </span>
            <span className="w-8 h-[1px] -mt-3  bg-[#997819]/70" />
          </div>

          <h2 className="text-white text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight max-w-xl">
            The Services We Deliver
          </h2>
        </div>

        {/* Elite Cinematic Scroll Message Popup */}
        {!isVertical && (
          <motion.div
            style={{ opacity: promptOpacity, scale: promptScale }}
            className="
      absolute bottom-18 left-1/2 -translate-x-1/2
      z-40 hidden md:flex
      items-center gap-2
      text-white/80
      pointer-events-none
    "
          >
            <ArrowDown className="w-4 h-4 text-[#997819] animate-bounce" />

            <span className="text-[13px] font-semibold tracking-wide">
              Scroll to explore
              <span className="text-white/40 mx-2">or</span>
              <span className="text-[#997819]">
                click play button to proceed automatically
              </span>
            </span>
          </motion.div>
        )}

        {/* Bottom Progress Bar with Play/Pause & Subtext */}
        {/* Interactive Controls */}
        {!isVertical && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 hidden md:flex items-center gap-3">
            {/* Auto-play CTA */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`
        group relative flex items-center gap-3
        px-4 py-2.5 rounded-full
        bg-[#12066a]/90 backdrop-blur-xl
        border border-[#997819]/50
        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
        transition-all duration-300
        hover:border-[#997819]
        hover:bg-[#12066a]
      `}
              title={
                isAutoPlaying
                  ? "Pause automatic scrolling"
                  : "Explore automatically"
              }
            >
              {/* Attention Ring */}
              {!isAutoPlaying && scrollPercent < 10 && (
                <span className="absolute inset-0 rounded-full border border-[#997819]/60 animate-ping opacity-30 pointer-events-none" />
              )}

              {/* Play Icon */}
              <span
                className="
          w-9 h-9 rounded-full
          bg-[#997819]
          text-[#12066a]
          flex items-center justify-center
          shadow-lg
          transition-transform duration-300
          group-hover:scale-105
        "
              >
                {isAutoPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </span>

              {/* CTA Text */}
              <span className="flex flex-col text-left leading-tight pr-2">
                <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#997819]">
                  {isAutoPlaying ? "Auto-play active" : "Interactive journey"}
                </span>

                <span className="text-xs font-semibold text-white">
                  {isAutoPlaying ? "Pause experience" : "Explore automatically"}
                </span>
              </span>
            </button>

            {/* Progress */}
            <div className="relative flex items-center justify-center w-12 h-12">
              <svg className="absolute inset-0 w-12 h-12 -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="21"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-white/10"
                  fill="transparent"
                />

                <motion.circle
                  cx="24"
                  cy="24"
                  r="21"
                  stroke="#997819"
                  strokeWidth="2.5"
                  strokeDasharray={2 * Math.PI * 21}
                  style={{
                    strokeDashoffset: useTransform(
                      smoothProgress,
                      [0, 1],
                      [2 * Math.PI * 21, 0],
                    ),
                  }}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <span className="text-[10px] font-bold text-white font-mono">
                {scrollPercent}%
              </span>
            </div>
          </div>
        )}

        <motion.div
          style={{ x: isVertical ? 0 : x }}
          className={`flex ${
            isVertical
              ? "flex-col px-6 gap-20"
              : "will-change-transform items-center"
          }`}
        >
          {sections.map((item) => {
            const MainIcon = item.icon;
            return (
              <div
                key={item.id}
                className={`relative shrink-0 flex flex-col lg:flex-row items-center justify-between 
                ${
                  isVertical
                    ? "w-full max-w-5xl mx-auto py-12"
                    : "h-screen w-screen px-12 lg:px-24 pt-20 lg:pt-16"
                }`}
              >
                {/* Background Image with brand color overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={item.bgImage}
                    alt={item.title}
                    className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-105 scale-105"
                  />
                  <div className="absolute inset-0 bg-[#12066a]/40 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#12066a]/95 via-[#12066a]/30 to-transparent" />
                </div>

                {/* Left Column - Category Title & Info */}
                <div className="z-10 w-full lg:w-[38%] mb-6 lg:mb-0 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                    <span className="text-[#D4AF37] font-mono font-bold text-sm tracking-widest">
                      {item.id}
                    </span>
                    <span className="w-8 h-[1px] bg-[#997819]/70" />
                    <span className="text-zinc-200 font-bold tracking-widest uppercase text-xs">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none drop-shadow-md">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm md:text-base text-zinc-200 leading-relaxed font-medium max-w-md mx-auto lg:mx-0 drop-shadow">
                    {item.description}
                  </p>
                </div>

                {/* Right Column - Single Refined Focal Card */}
                <div className="w-full lg:w-[52%] relative z-10">
                  <div className="bg-[#12066a]/70 backdrop-blur-xl border border-white/15 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                    {/* Background Watermark ID */}
                    <div className="absolute -top-6 -right-4 text-[11rem] font-black text-white/[0.03] z-0 select-none pointer-events-none leading-none">
                      {item.id}
                    </div>

                    <div className="relative z-10 flex flex-col gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#997819] flex items-center justify-center shadow-inner border border-white/10 group-hover:bg-[#997819] group-hover:text-[#12066a] transition-all duration-300">
                        <MainIcon className="w-7 h-7" />
                      </div>

                      <div>
                        <span className="text-[#D4AF37] font-mono font-bold text-xs uppercase tracking-wider block mb-1">
                          Core Focus Area
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          {item.highlightText}
                        </h4>
                        <p className="text-sm text-zinc-300 mt-3 leading-relaxed font-normal">
                          {item.details}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-zinc-300">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#997819]" />{" "}
                        PROFESSIONAL CONSULTANCY
                      </span>
                      <span className="text-white bg-white/10 px-3 py-1 rounded-md border border-white/10">
                        UK WIDE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalProcess;