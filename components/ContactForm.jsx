"use client";
import React, { useState } from 'react';
import { Send, ArrowDown, CheckCircle2, Loader2, Phone } from 'lucide-react';

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
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      number: e.target.number.value, // Ye fetch ho raha hai
      service: e.target.service.value,
      message: e.target.msg.value,
    };

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSent(true);
        e.target.reset();
        setTimeout(() => setSent(false), 5000);
      }
    } catch (err) {
      console.error("Error sending email:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tighter mb-4">
          Send Us A <span className="text-[#997819] italic">Message.</span>
        </h2>
        <p className="text-slate-400 font-medium text-lg">Initiate your strategic consultation today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {/* Full Name */}
        <div className="relative group col-span-1">
          <input type="text" name="name" id="name" placeholder=" " className={inputClasses} required />
          <label htmlFor="name" className={labelClasses}>Your Full Name</label>
        </div>

        {/* Email Address */}
        <div className="relative group col-span-1">
          <input type="email" name="email" id="email" placeholder=" " className={inputClasses} required />
          <label htmlFor="email" className={labelClasses}>Email Address</label>
        </div>

        {/* Phone Number - NEW FIELD */}
        <div className="relative group col-span-1">
          <input type="tel" name="number" id="number" placeholder=" " className={inputClasses} required />
          <label htmlFor="number" className={labelClasses}>Phone Number</label>
        </div>

        {/* Interested Service */}
        <div className="relative group col-span-1">
          <select 
            name="service" 
            id="service" 
            className={`${inputClasses} appearance-none cursor-pointer bg-transparent`} 
            defaultValue=""
            required
          >
            <option value="" disabled hidden>What are you looking for?</option>
            <option value="ISO Certification">ISO Certification Strategy</option>
            <option value="SIA ACS Support">ACS Compliance Support</option>
            <option value="Cyber Essentials">Cyber Essentials</option>
            <option value="General Inquiry">General Strategy Inquiry</option>
          </select>
          <label htmlFor="service" className={labelClasses}>Interested Service</label>
          <ArrowDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none group-focus-within:rotate-180 transition-transform" />
        </div>

        {/* Message */}
        <div className="relative group md:col-span-2">
          <textarea name="msg" id="msg" placeholder=" " className={`${inputClasses} min-h-[100px] py-4 resize-none`} required />
          <label htmlFor="msg" className={labelClasses}>Briefly describe your objectives</label>
        </div>
      </div>

      <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <button 
          disabled={loading || sent}
          type="submit" 
          className="w-full md:w-auto bg-[#12066a] hover:bg-[#997819] text-white font-black uppercase tracking-[0.2em] px-14 py-6 rounded-full transition-all duration-700 flex items-center justify-center gap-4 group relative overflow-hidden shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
        >
          <span className="relative z-10 text-sm">
            {loading ? "Processing..." : sent ? "Inquiry Sent" : "Initialize Consultation"}
          </span>
          
          {loading ? (
            <Loader2 size={18} className="animate-spin relative z-10" />
          ) : sent ? (
            <CheckCircle2 size={18} className="text-emerald-400 relative z-10" />
          ) : (
            <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>

        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full animate-pulse ${sent ? 'bg-emerald-500' : 'bg-[#997819]'}`} />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {sent ? "Message Received Successfully" : "Verified Professional Inquiry"}
          </span>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;