"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const popupLink =
  "https://assessment.bs10119.co.uk/bs10119-score?utm_source=bizgrow_website&utm_medium=readiness_popup&utm_campaign=bs10119_readiness";
const shownKey = "bizgrow_bs10119_readiness_popup_shown";

export default function BS10119ReadinessPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(shownKey)) return undefined;
    } catch (error) {
      console.warn("Unable to read BS 10119 popup display state:", error);
    }

    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(shownKey, "true");
      } catch (error) {
        console.warn("Unable to save BS 10119 popup display state:", error);
      }
      setIsOpen(true);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const root = document.documentElement;
    const body = document.body;
    const previousOverflow = root.style.overflow;
    const previousPaddingRight = root.style.paddingRight;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const lenis = window.lenis || window.__lenis;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    if (scrollbarWidth > 0) {
      root.style.paddingRight = `${scrollbarWidth}px`;
    }
    lenis?.stop();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closePopup();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPaddingRight;
      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousBodyTouchAction;
      lenis?.start();
    };
  }, [isOpen]);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080528]/70 p-4 backdrop-blur-sm"
          data-lenis-prevent
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePopup();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="bs10119-popup-title"
            initial={{ opacity: 0, scale: 0.985, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, y: 4 }}
            transition={{
              duration: 0.48,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ willChange: "transform, opacity", transformOrigin: "center center" }}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)] [backface-visibility:hidden] [transform:translateZ(0)]"
          >
            <button
              type="button"
              onClick={closePopup}
              aria-label="Close BS 10119 readiness popup"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#12066a] shadow-md transition hover:bg-[#12066a] hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="relative min-h-56 bg-[#12066a] md:min-h-full">
                <Image
                  src="/bs10119-score.png"
                  alt="Preview of the BS 10119 readiness assessment score"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#997819]">
                  FOR UK SECURITY &amp; LABOUR PROVIDERS
                </p>
                <h2
                  id="bs10119-popup-title"
                  className="mt-3 text-2xl font-bold leading-tight text-[#12066a] sm:text-3xl"
                >
                  How Audit-Ready Is Your BS 10119 Setup?
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Find out where your workforce vetting, subcontracting, and
                  operational controls stand. Get an instant score and tailored
                  gap report in 2 minutes.
                </p>
                <a
                  href={popupLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closePopup}
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#12066a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#997819]"
                >
                  Start Free Readiness Check <ArrowUpRight size={17} />
                </a>
                <a
                  href="/free-tools"
                  onClick={closePopup}
                  className="mt-3 block w-full py-2 text-center text-xs font-semibold text-slate-500 transition hover:text-[#12066a]"
                >
                  Find this assessment anytime in the Free Tools menu
                </a>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
