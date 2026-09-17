"use client";

import Image from "next/image";
import { useState } from "react";

export default function OrizonExactNotch() {
  const [activeTab, setActiveTab] = useState("buy");

  return (
    <div className="relative min-h-screen bg-[#e5e1dc]  flex flex-col justify-between overflow-hidden font-sans">
      
      {/* 🔹 1. VERY TOP HEADER */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 py-3 text-[11px] font-black tracking-[0.3em] text-slate-600 uppercase z-20">
        <span>Orizon Design</span>
        <span>Best Shots</span>
      </div>

      {/* 🔹 2. MAIN FLOATING CONTAINER */}
      <div 
        className="relative w-full max-w-7xl mx-auto my-auto rounded-[3rem] overflow-hidden shadow-2xl shadow-black/20 border border-white/50 bg-slate-200 min-h-[650px] flex flex-col justify-between p-2 md:p-6 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=2000&auto=format&fit=crop')` }}
      >
        
        {/* Soft Image Overlay */}
        <div className="absolute inset-0 bg-blue-900/10 backdrop-brightness-105 z-0" />

        {/* 🔹 3. THE EXACT HANGING NOTCH & FLOATING PILLS */}
        <div className="relative z-20 w-full flex justify-between items-start">
          
          {/* Left Area: Floating Buy Button */}
          <div className="flex-1 flex justify-center pt-5">
             <Image
                          src="/logo.webp"
                          alt="BizGrow Holdings Logo"
                          width={110}
                          height={40}
                          priority
                          style={{
                            width: "auto",
                            height: "auto",
                          }}
                          className="
                            w-auto
                            h-[38px]
                            object-contain
                          "
                        />
          </div>

          {/* CENTER: The White Hanging Notch */}
          <div className="relative bg-[#f8f9fc] -mt-6 h-24 px-8 md:px-12 rounded-b-[65px] flex items-center shadow-sm">
            
            {/* ⚠️ THE MAGIC TRICK: Left Smooth Concave Curve */}
            <div className="absolute top-0 -left-[40px] w-[40px] h-[40px] bg-[radial-gradient(circle_at_0%_103%,transparent_40px,#f8f9fc_40.5px)] pointer-events-none"></div>
            
            {/* ⚠️ THE MAGIC TRICK: Right Smooth Concave Curve */}
            <div className="absolute top-0 -right-[40px] w-[40px] h-[40px] bg-[radial-gradient(circle_at_103%_100%,transparent_40px,#f8f9fc_40.5px)] pointer-events-none"></div>

            {/* Filters Inside the Notch */}
            <div className="hidden md:flex items-center justify-between gap-10 text-slate-700 text-xs font-semibold w-full">
              <div className="text-left cursor-pointer group">
                <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  <span className="text-slate-300">📍</span> Location
                </span>
                <span className="text-slate-900 font-bold text-sm tracking-tight flex items-center gap-1">
                  Arizona <span className="text-slate-400 text-[10px]">▾</span>
                </span>
              </div>
              <div className="text-left cursor-pointer group">
                <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  <span className="text-slate-300">🏘️</span> Property Type
                </span>
                <span className="text-slate-900 font-bold text-sm tracking-tight flex items-center gap-1">
                  Villa <span className="text-slate-400 text-[10px]">▾</span>
                </span>
              </div>
               <div className="text-left cursor-pointer group">
                <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  <span className="text-slate-300">🏘️</span> Property Type
                </span>
                <span className="text-slate-900 font-bold text-sm tracking-tight flex items-center gap-1">
                  Villa <span className="text-slate-400 text-[10px]">▾</span>
                </span>
              </div>
               <div className="text-left cursor-pointer group">
                <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  <span className="text-slate-300">🏘️</span> Property Type
                </span>
                <span className="text-slate-900 font-bold text-sm tracking-tight flex items-center gap-1">
                  Villa <span className="text-slate-400 text-[10px]">▾</span>
                </span>
              </div>
               <div className="text-left cursor-pointer group">
                <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  <span className="text-slate-300">🏘️</span> Property Type
                </span>
                <span className="text-slate-900 font-bold text-sm tracking-tight flex items-center gap-1">
                  Villa <span className="text-slate-400 text-[10px]">▾</span>
                </span>
              </div>
              <div className="text-left cursor-pointer group">
                <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  <span className="text-slate-300">💵</span> Max Price
                </span>
                <span className="text-slate-900 font-bold text-sm tracking-tight flex items-center gap-1">
                  $300 000 <span className="text-slate-400 text-[10px]">▾</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Area: Floating Rent Button */}
          <div className="flex-1 flex justify-center pt-5">
            <button 
              onClick={() => setActiveTab("rent")}
              className="bg-white/95 text-slate-800 rounded-full px-8 py-3 font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 hover:scale-105 transition-transform"
            >
              Rent <span className="text-amber-500 font-black text-sm">↗</span>
            </button>
          </div>

        </div>

        {/* 🔹 4. HERO TITLE */}
        <div className="text-center max-w-3xl mx-auto mt-12 relative z-20 pointer-events-none">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase drop-shadow-xl leading-none">
            New Way Of <br/><span className="text-amber-300">Living</span>
          </h1>
        </div>

        {/* 🔹 5. BOTTOM CARDS */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 items-end p-4">
          <div className="bg-white/90 backdrop-blur-md border border-white/50 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Find The Perfect Place</span>
              <div className="text-3xl font-black text-slate-900 mt-1">10K+</div>
            </div>
            <div className="w-12 h-12 bg-[#12066a] text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-md cursor-pointer">
              ↗
            </div>
          </div>

          <div className="bg-slate-900/85 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-xl text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">Featured</span>
              <h3 className="text-lg font-bold mt-2 tracking-tight">Lunar Oasis Villa</h3>
            </div>
            <div className="w-11 h-11 bg-white/10 hover:bg-white hover:text-slate-900 text-white rounded-2xl flex items-center justify-center font-bold transition-all cursor-pointer">
              ↗
            </div>
          </div>
        </div>

      </div>

      {/* 🔹 6. VERY BOTTOM FOOTER */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 py-3 text-xs font-bold text-slate-700 uppercase z-20">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm">
          <span>Like & Follow 🤍</span>
        </div>
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm cursor-pointer hover:bg-white transition-all">
          <span>Swipe &gt;&gt;</span>
        </div>
      </div>

    </div>
  );
}