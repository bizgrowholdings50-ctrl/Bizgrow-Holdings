"use client";
import Link from "next/link";
import FadeIn from "@/components/MotionWrapper";
import { Home, PhoneCall, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] bg-white flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* 🔹 Background Large Watermark - Subtle & Professional */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h2 className="text-[12rem] md:text-[22rem] font-black text-zinc-100 leading-none uppercase tracking-tighter">
          OFFLINE
        </h2>
      </div>

      <div className="max-w-4xl w-full text-center relative z-10">
        <FadeIn direction="up">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-8">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-700 text-[10px] font-black uppercase tracking-[0.2em]">Error 404: Resource Missing</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-[#12066a] leading-[0.9] uppercase tracking-tighter">
            Way Off <br />
            <span className="text-[#997819]">The Registry</span>
          </h1>

          <p className="mt-8 text-zinc-500 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get your compliance journey back on track.
          </p>

          {/* Action Buttons - Premium Style */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link 
              href="/"
              className="w-full sm:w-auto bg-[#12066a] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-[#997819] transition-all duration-700 shadow-2xl active:scale-95"
            >
              <Home size={16} /> Return to Home
            </Link>

            <Link 
              href="/contact"
              className="w-full sm:w-auto bg-zinc-50 text-[#12066a] px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-zinc-100 transition-all active:scale-95 border border-zinc-200"
            >
              <PhoneCall size={16} /> Contact Support
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* 🔹 Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#997819]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#12066a]/5 rounded-full blur-[100px]" />
    </main>
  );
}