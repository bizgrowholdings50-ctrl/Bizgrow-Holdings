"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ScorecardSideCta() {
  const pathname = usePathname();

  // Agar user pehle se scanner page par hai, toh side CTA show mat karain
  if (pathname === "/compliance-scanner") return null;

  return (
    <Link
      href="/compliance-scanner"
      aria-label="Open Compliance Health Scanner"
      className="group fixed left-0 top-1/2 z-[9990] hidden -translate-x-[18px] -translate-y-1/2 items-center justify-center rounded-r-xl border border-[#997819] bg-[#12066a] px-3.5 py-6 text-white shadow-2xl shadow-black/30 transition-all duration-500 ease-out hover:translate-x-0 hover:bg-[#997819] hover:pl-4 focus:translate-x-0 focus:outline-none lg:flex"
    >
      <span
        className="select-none text-[11px] font-black uppercase tracking-[0.22em]"
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        Compliance Health Check
      </span>
    </Link>
  );
}