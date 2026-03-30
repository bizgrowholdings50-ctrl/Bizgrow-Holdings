"use client";
import { useState } from 'react';
import Image from 'next/image';
import FadeIn from "@/components/MotionWrapper";
import { 
  ShieldCheck, 
  Award, 
  Users, 
  ArrowRight, 
  PhoneCall,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

// 📄 Data Registry
const certificateData = [
  { id: "BG-06022406", name: "Ch. M. Mudassar Bashir", company: "Cerberus Security Services Ltd", trainer: "Ms. Sabahat Haider", date: "15/03/2024", status: "Sent" },
  { id: "BG-06022409", name: "Ms. Shaheera Jannat", company: "Grizzlys Security Services Ltd", trainer: "Ms. Sabahat Haider", date: "05/12/2022", status: "Sent" },
  { id: "BG-06022412", name: "Mr. Zakria Shinwari", company: "Progressive Group Services Ltd", trainer: "None", date: "05/06/2024", status: "Sent" },
  { id: "BG-06022415", name: "Mr. Aamir Ilyas Awan", company: "Paramount BPO Ltd", trainer: "Ms. Sabahat Haider", date: "13/11/2024", status: "Verified" },
  { id: "BG-06022417", name: "Mr. M. Saqib", company: "MBS Security FM Ltd", trainer: "Dr. Javed Iqbal", date: "12/11/2024", status: "Verified" },
  { id: "BG-06022420", name: "Mr. Saleem Raza Malik", company: "Bold Security Solutions Ltd", trainer: "Mr. Muhammad Qasim", date: "15/11/2024", status: "Completed" },
  { id: "BG-06022424", name: "Muhammad Bilal Ansari", company: "Smart Guarding Services Ltd (SGS)", trainer: "Mr. Muhammad Qasim", date: "28/08/2024", status: "Verified" },
  { id: "BG-06022427", name: "Waseem Akram", company: "Rawal Veritas / Cava Guards", trainer: "Mr. Muhammad Qasim", date: "N/A", status: "In Process" },
  { id: "BG-06022429", name: "Newland Security Staff", company: "Newland Security Ltd", trainer: "Mr. Muhammad Qasim", date: "N/A", status: "Pending" }
];

export default function CertificateVerification() {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setIsLoading(true);

    // Initial check for empty input
    if (!certId.trim()) {
      setTimeout(() => {
        setError("Please enter a valid Certificate ID to proceed.");
        setIsLoading(false);
      }, 500);
      return;
    }

    // Logic for matching ID
    setTimeout(() => {
      const cleanId = certId.trim().toUpperCase();
      const found = certificateData.find(item => item.id === cleanId);

      if (found) {
        setResult(found);
      } else {
        setError("Invalid ID: We couldn't find any record matching this Certificate Number.");
      }
      setIsLoading(false);
    }, 800); // Small delay for "searching" feel
  };

  return (
    <main className="bg-white overflow-x-hidden">
      
      {/* 🔹 1. HERO SECTION */}
      <section className="relative h-[85dvh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/about-hero.webp" alt="Verification" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#12066a]/85 backdrop-blur-[2px]" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <h2 className="text-[10rem] md:text-[18rem] font-black text-white/[0.05] leading-none uppercase tracking-tighter">
            VERIFY
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full text-center">
          <FadeIn direction="up">
            <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs">Official Portal</span>
            <h1 className="text-4xl md:text-7xl font-black text-white mt-6 uppercase">
              Certificate <br /> <span className="text-[#997819]">Verification</span>
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 2. SEARCH BOX & ERROR HANDLING */}
      <section className="relative z-30 -mt-24 px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <FadeIn direction="up" delay={0.4}>
            <div className={`bg-white p-6 md:p-10 rounded-[3rem] shadow-2xl border transition-all duration-300 ${error ? 'border-red-200' : 'border-zinc-100'}`}>
                <form onSubmit={handleVerify} className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-black uppercase text-[#12066a] tracking-widest ml-2">Enter Certificate Number</label>
                        <input 
                            type="text" placeholder="e.g. BG-06022406" 
                            className={`w-full p-5 bg-zinc-50 border rounded-2xl outline-none font-bold transition-all ${error ? 'border-red-300 focus:border-red-500' : 'border-zinc-100 focus:border-[#997819]'}`}
                            value={certId} onChange={(e) => { setCertId(e.target.value); setError(""); }}
                        />
                    </div>
                    <div className="flex items-end">
                        <button 
                          disabled={isLoading}
                          className="w-full md:w-auto bg-[#12066a] text-white font-black uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-[#997819] transition-all h-[62px] flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {isLoading ? "Checking..." : <><Search size={20} /> Verify</>}
                        </button>
                    </div>
                </form>

                {/* ❌ Error Message */}
                {error && (
                  <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-2xl flex items-center gap-3 animate-shake">
                    <AlertCircle size={20} />
                    <span className="text-sm font-bold uppercase tracking-tight">{error}</span>
                  </div>
                )}

                {/* ✅ Success Result */}
                {result && (
                  <div className="mt-10 p-8 bg-[#12066a] rounded-[2.5rem] text-white relative overflow-hidden animate-in zoom-in duration-500">
                    <div className="absolute right-0 top-0 text-9xl font-black text-white/[0.03] uppercase pointer-events-none">VALID</div>
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                        <div>
                            <p className="text-[#997819] text-[10px] font-black uppercase tracking-widest">Candidate Name</p>
                            <p className="text-xl font-bold mt-1">{result.name}</p>
                        </div>
                        <div>
                            <p className="text-[#997819] text-[10px] font-black uppercase tracking-widest">Verification Status</p>
                            <p className="text-xl font-bold mt-1 flex items-center gap-2">
                                <CheckCircle2 className="text-green-400" size={20} /> {result.status}
                            </p>
                        </div>
                        <div className="md:col-span-2 h-px bg-white/10 w-full" />
                        <div>
                            <p className="text-[#997819] text-[10px] font-black uppercase tracking-widest">Organization</p>
                            <p className="text-sm font-bold mt-1 opacity-80">{result.company}</p>
                        </div>
                        <div>
                            <p className="text-[#997819] text-[10px] font-black uppercase tracking-widest">Issue Date</p>
                            <p className="text-xl font-bold mt-1">{result.date !== "N/A" ? result.date : "Verified"}</p>
                        </div>
                    </div>
                  </div>
                )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 3. INFORMATION SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-4xl font-black text-[#12066a] uppercase leading-none">Why verify <span className="text-[#997819]">Compliance?</span></h2>
                <p className="mt-6 text-zinc-500 font-medium leading-relaxed">
                    In the UK security and construction industry, valid certification is the difference between legal compliance and liability. BizGrow Holdings ensures all candidates meet BS7858 standards and ISO requirements.
                </p>
                <div className="mt-8 space-y-4">
                    {["Real-time database access", "ISO & UKAS Standard Validation", "Anti-Fraudulent Protection"].map((text, i) => (
                        <div key={i} className="flex items-center gap-3 font-bold text-[#12066a]">
                            <CheckCircle2 size={18} className="text-[#997819]" /> {text}
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-[#12066a] p-12 rounded-[3rem] text-center">
                <Award size={60} className="text-[#997819] mx-auto mb-6" />
                <h3 className="text-white text-2xl font-black uppercase mb-4">Request New Audit</h3>
                <button className="w-full bg-[#997819] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                    Get Certified
                </button>
            </div>
        </div>
      </section>

      {/* 🔹 4. FOOTER CTA */}
      <section className="pb-24 px-6">
          <div className="max-w-7xl mx-auto bg-[#12066a] p-12 md:rounded-full rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                  <h2 className="text-white text-2xl font-black uppercase">Need Support?</h2>
                  <p className="text-white/50 text-xs tracking-widest uppercase">Contact our compliance helpdesk</p>
              </div>
              <div className="flex gap-4">
                  <a href="tel:+447898205035" className="bg-white text-[#12066a] px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                      <PhoneCall size={14} /> Call Experts
                  </a>
              </div>
          </div>
      </section>

    </main>
  );
}