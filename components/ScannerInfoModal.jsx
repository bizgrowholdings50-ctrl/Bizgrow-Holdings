"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";

export default function ToolInfoModal({
  title,
  eyebrow,
  description,
  highlights,
  note,
  href,
  actionLabel,
  external = false,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#12066a]/20 px-5 py-3 text-sm font-bold text-[#12066a] transition hover:border-[#997819] hover:bg-[#faf9f7]"
      >
        Learn More <ArrowRight size={16} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-[#09052f]/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="scanner-modal-title"
            className="relative my-auto w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close scanner information"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-[#12066a] hover:text-white"
            >
              <X size={18} />
            </button>
            <p className="pr-10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#997819]">
              {eyebrow}
            </p>
            <h2 id="scanner-modal-title" className="mt-3 pr-8 text-2xl font-bold leading-tight text-[#12066a] sm:text-3xl">
              {title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {description}
            </p>
            <ul className="mt-5 space-y-3">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <Check size={17} className="mt-1 shrink-0 text-[#997819]" />
                  {highlight}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-[#faf9f7] p-4 text-xs leading-6 text-slate-600">
              {note}
            </p>
            {external ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#12066a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#997819]"
              >
                {actionLabel} <ArrowRight size={16} />
              </a>
            ) : (
              <a
                href={href}
                onClick={() => setIsOpen(false)}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#12066a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#997819]"
              >
                {actionLabel} <ArrowRight size={16} />
              </a>
            )}
          </section>
        </div>
      )}
    </>
  );
}
