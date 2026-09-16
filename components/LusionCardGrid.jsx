// components/LusionCardGrid.jsx
"use client";

import { useState, useRef } from "react";
import gsap from "gsap";

const testCards = [
  {
    id: 1,
    title: "Health & Safety",
    category: "Compliance & Protocols",
    subtitle: "Enterprise Safety Standard",
    desc: "Comprehensive health and safety protocols engineered with absolute precision, real-time tracking, and ultra-smooth interactive architecture.",
    slides: [
      { title: "Standard Guidelines", desc: "Strict compliance workflows structured for optimal operational safety." },
      { title: "Risk Mitigation", desc: "Real-time hazard monitoring and immediate protocol execution." },
    ],
    stats: [
      { label: "Compliance", value: "100%" },
      { label: "Protocols", value: "Active" },
      { label: "Standard", value: "ISO-Ready" },
    ],
    bgImage: "/it-hero.jpg",
  },
  {
    id: 2,
    title: "Help & Support Grid",
    category: "Assistance Infrastructure",
    subtitle: "Enterprise Help Desk",
    desc: "Next-gen assistance platforms engineered with absolute precision, real-time query resolution, and ultra-smooth momentum-based UI architecture.",
    slides: [
      { title: "Instant Assistance", desc: "Real-time user support routing with sub-millisecond response." },
      { title: "Resource Hub", desc: "Centralized documentation and automated ticket tracking system." },
    ],
    stats: [
      { label: "Uptime", value: "99.99%" },
      { label: "Response", value: "< 5ms" },
      { label: "Support", value: "24/7 Grid" },
    ],
    bgImage: "/help-bg.jpg",
  },
];

export default function LusionCardGrid() {
  const [activeCard, setActiveCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const cardRefs = useRef({});
  const overlayRef = useRef(null);
  const overlayImgRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const slideRef = useRef(null);

  const scrollYRef = useRef(0);
  const originRectRef = useRef(null); // 🔹 exact card rect — close animation isi se hoga, re-render/scroll se independent
  const isAnimatingRef = useRef(false); // 🔹 rapid-click / double-trigger guard (jitter ka bada source)

  // ---------------- SCROLL LOCK HELPERS ----------------
  const lockScroll = () => {
    scrollYRef.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
  };

  const unlockScroll = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    window.scrollTo(0, scrollYRef.current);
  };

  // ---------------- OPEN SEQUENCE ----------------
  const handleCardClick = (card) => {
    if (isAnimatingRef.current || activeCard) return;
    isAnimatingRef.current = true;

    const cardEl = cardRefs.current[card.id];
    const overlay = overlayRef.current;
    const overlayImg = overlayImgRef.current;
    const content = contentWrapperRef.current;
    if (!cardEl || !overlay || !content) return;

    // exact rect capture — grid abhi tak scroll-lock se pehle hai, isliye ye accurate hai
    const rect = cardEl.getBoundingClientRect();
    originRectRef.current = rect;

    lockScroll();

    setActiveCard(card);
    setCurrentSlide(0);

    // Starting state = exact card bounds (no jump/flash)
    gsap.set(overlay, {
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      borderRadius: "2rem",
      display: "flex",
      zIndex: 9999,
      opacity: 1,
      overflow: "hidden",
      willChange: "top, left, width, height, border-radius",
    });

    if (overlayImg) gsap.set(overlayImg, { scale: 1, opacity: 1 });
    gsap.set(content, { opacity: 0, y: 24, pointerEvents: "none" });

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    // Step 1: card → full screen, radius → 0, image subtle parallax zoom
    tl.to(overlay, {
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      borderRadius: "0px",
      duration: 0.85,
      ease: "expo.inOut",
    }, 0)
      .to(overlayImg, {
        scale: 1.12,
        duration: 0.85,
        ease: "expo.inOut",
      }, 0)

      // Step 2: explicit "settle" pause — poori screen occupy hone ke baad ek beat rukta hai
      .to({}, { duration: 0.12 })

      // Step 3: image fade karke content ke liye jagah banana
      .to(overlayImg, {
        opacity: 0.25,
        duration: 0.3,
        ease: "power2.out",
      })

      // Step 4: content fade + slide in
      .to(content, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
        onStart: () => gsap.set(content, { pointerEvents: "auto" }),
      }, "-=0.1");
  };

  const handleSlideChange = (index) => {
    if (!slideRef.current || index === currentSlide) return;
    gsap.to(slideRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      onComplete: () => {
        setCurrentSlide(index);
        gsap.to(slideRef.current, { opacity: 1, y: 0, duration: 0.3 });
      },
    });
  };

  // ---------------- CLOSE / REVERSE SEQUENCE ----------------
  const handleBack = () => {
    if (isAnimatingRef.current || !activeCard) return;
    isAnimatingRef.current = true;

    const overlay = overlayRef.current;
    const overlayImg = overlayImgRef.current;
    const content = contentWrapperRef.current;
    if (!overlay || !content) return;

    // 🔹 close hamesha usi rect se hoga jo open ke waqt capture hua tha —
    // isse guaranteed pixel-perfect return hoga, scroll/resize se koi farak nahi padega
    const rect = originRectRef.current || {
      top: window.innerHeight / 2,
      left: window.innerWidth / 2,
      width: 0,
      height: 0,
    };

    gsap.set(content, { pointerEvents: "none" });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { display: "none" });
        setActiveCard(null);
        unlockScroll();
        isAnimatingRef.current = false;
      },
    });

    // Step 1: content fade out (reverse of last open-step)
    tl.to(content, {
      opacity: 0,
      y: 24,
      duration: 0.25,
      ease: "power2.in",
    })

      // Step 2: image wapas full focus mein aata hai (reverse of image-dim step)
      .to(overlayImg, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
      })

      // Step 3: portal shrink + image de-zoom, exact card position/radius par (reverse of step 1)
      .to(overlay, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: "2rem",
        duration: 0.85,
        ease: "expo.inOut",
      })
      .to(overlayImg, {
        scale: 1,
        duration: 0.85,
        ease: "expo.inOut",
      }, "<");
  };

  return (
    <div className="relative w-full min-h-screen bg-[#07031a] py-24 px-6 md:px-16 text-white overflow-x-hidden">
      <div className="max-w-6xl mx-auto mb-16">
        <span className="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-bold bg-white/5 px-4 py-2 rounded-full border border-white/10">
          Cinematic Sequence Engine v4.2
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mt-4 uppercase">
          Lusion Card <span className="text-[#d4af37]">Dive Effect</span>
        </h1>
        <p className="text-white/60 text-sm mt-2">
          Absolute fluid sequence: Zoom-in full screen → Image settle → Content fade-in.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {testCards.map((card) => (
          <div
            key={card.id}
            ref={(el) => (cardRefs.current[card.id] = el)}
            onClick={() => handleCardClick(card)}
            className="group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer border border-white/10 bg-[#0c0538] shadow-2xl flex flex-col justify-end p-8"
            style={{
              // 🔹 jab overlay open hai to asal card ko hide kar do (double-image jitter avoid)
              visibility: activeCard?.id === card.id ? "hidden" : "visible",
            }}
          >
            <img
              src={card.bgImage}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 filter saturate-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07031a] via-[#07031a]/40 to-transparent" />

            <div className="relative z-10">
              <span className="text-[#d4af37] text-xs font-bold uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                {card.category}
              </span>
              <h3 className="text-white text-3xl font-black mt-3 tracking-wide uppercase">
                {card.title}
              </h3>
              <p className="text-white/70 text-sm mt-2 line-clamp-2 font-medium">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Cinematic Portal Overlay */}
      <div
        ref={overlayRef}
        className="fixed hidden bg-[#0a0428] shadow-2xl flex-col justify-between"
        style={{ pointerEvents: activeCard ? "auto" : "none" }}
      >
        {activeCard && (
          <div className="absolute inset-0 overflow-hidden z-0">
            <img
              ref={overlayImgRef}
              src={activeCard.bgImage}
              alt={activeCard.title}
              className="w-full h-full object-cover filter saturate-[1.2]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07031a] via-[#07031a]/70 to-transparent" />
          </div>
        )}

        <div
          ref={contentWrapperRef}
          className="relative z-10 w-full h-full flex flex-col justify-between opacity-0 py-8 md:py-12 px-6 md:px-16"
        >
          {activeCard && (
            <>
              <div className="flex justify-between items-center w-full z-20">
                <span className="text-[#d4af37] font-black uppercase tracking-widest text-xs md:text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                  // Case Study: {activeCard.title}
                </span>
                <button
                  onClick={handleBack}
                  className="bg-white text-[#07031a] font-bold px-6 py-3 rounded-full hover:bg-[#d4af37] hover:text-white transition-all duration-300 shadow-lg cursor-pointer text-xs md:text-sm tracking-wider uppercase"
                >
                  ← Back to Grid
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-20 my-auto">
                <div>
                  <span className="text-[#d4af37] text-xs font-bold uppercase tracking-widest">
                    {activeCard.category}
                  </span>
                  <h2 className="text-white text-4xl sm:text-6xl font-black uppercase tracking-tighter mt-2 mb-4 leading-none">
                    {activeCard.title}
                  </h2>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 font-medium">
                    {activeCard.desc}
                  </p>

                  <div
                    ref={slideRef}
                    className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6 backdrop-blur-md shadow-inner"
                  >
                    <h4 className="text-[#d4af37] font-bold uppercase text-sm tracking-wider mb-2">
                      0{currentSlide + 1}. {activeCard.slides[currentSlide].title}
                    </h4>
                    <p className="text-white/80 text-xs md:text-sm">
                      {activeCard.slides[currentSlide].desc}
                    </p>
                  </div>

                  <div className="flex gap-3 mb-6">
                    {activeCard.slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSlideChange(idx)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          currentSlide === idx
                            ? "bg-[#d4af37] text-[#07031a]"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        Slide {idx + 1}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    {activeCard.stats.map((stat, idx) => (
                      <div key={idx} className="bg-white/5 p-3 rounded-2xl border border-white/10">
                        <div className="text-[#d4af37] text-base md:text-xl font-black">{stat.value}</div>
                        <div className="text-white/60 text-[9px] md:text-[10px] uppercase tracking-wider mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative h-[280px] sm:h-[380px] rounded-3xl overflow-hidden border border-white/20 shadow-2xl group">
                  <img
                    src={activeCard.bgImage}
                    alt={activeCard.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07031a]/80 via-transparent to-transparent" />
                </div>
              </div>

              <div className="flex justify-between items-center text-white/40 text-[10px] md:text-xs uppercase tracking-widest pt-4 border-t border-white/10">
                <span>Sequence Engine v4.2 (Staggered Portal Active)</span>
                <span>Secure Node Active</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}