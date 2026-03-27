import React from 'react';
import { Send, ArrowDown } from 'lucide-react';

const inputClasses = `
  peer w-full bg-transparent border-b-2 border-slate-100 
  px-0 py-5 text-xl font-bold text-[#12066a] 
  placeholder:text-transparent transition-all duration-500 outline-none
  focus:border-[#997819] hover:border-slate-300
`;

const labelClasses = `
  absolute left-0 top-5 text-zinc-400 pointer-events-none 
  transition-all duration-500 origin-left uppercase tracking-[0.3em] 
  font-black text-[10px] peer-focus:-translate-y-10 peer-focus:text-[#997819] 
  peer-[:not(:placeholder-shown)]:-translate-y-10
`;

const ContactForm = () => {
  return (
    <form className="w-full">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tighter mb-4">
          Send Us A <span className="text-[#997819] italic">Message.</span>
        </h2>
        <p className="text-slate-400 font-medium text-lg">Initiate your strategic consultation today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        <div className="relative group col-span-1">
          <input type="text" id="name" placeholder=" " className={inputClasses} required />
          <label htmlFor="name" className={labelClasses}>Your Full Name</label>
        </div>

        <div className="relative group col-span-1">
          <input type="email" id="email" placeholder=" " className={inputClasses} required />
          <label htmlFor="email" className={labelClasses}>Email Address</label>
        </div>

        <div className="relative group md:col-span-2">
          <select id="service" className={`${inputClasses} appearance-none cursor-pointer bg-transparent`} defaultValue="">
            <option value="" disabled hidden>What are you looking for?</option>
            <option value="iso">ISO Certification Strategy</option>
            <option value="acs">ACS Compliance Support</option>
            <option value="other">General Strategy Inquiry</option>
          </select>
          <label htmlFor="service" className={labelClasses}>Interested Service</label>
          <ArrowDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none group-focus-within:rotate-180 transition-transform" />
        </div>

        <div className="relative group md:col-span-2">
          <textarea id="msg" placeholder=" " className={`${inputClasses} min-h-[100px] py-4 resize-none`} required />
          <label htmlFor="msg" className={labelClasses}>Briefly describe your objectives</label>
        </div>
      </div>

      <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <button type="submit" className="w-full md:w-auto bg-[#12066a] hover:bg-[#997819] text-white font-black uppercase tracking-[0.2em] px-14 py-6 rounded-full transition-all duration-700 flex items-center justify-center gap-4 group relative overflow-hidden shadow-2xl hover:shadow-[#997819]/40 active:scale-95">
          <span className="relative z-10 text-sm">Initialize Consultation</span>
          <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verified Professional Inquiry</span>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;