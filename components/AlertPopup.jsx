'use client';
import { useState, useEffect } from 'react';

export default function ProfessionalAlertBar() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Target Date: 12th August 2026, 20:00 (8 PM) UK Time
    const targetDate = new Date('2026-08-12T20:00:00+01:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Copy to Clipboard Function
  const handleCopyZoomLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('https://bit.ly/4wMiBmn');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full fixed top-0 bg-[#12066a] text-white text-xs sm:text-sm py-2 px-4 shadow-md z-50 border-b border-white/10 flex flex-col xl:flex-row items-center justify-center gap-3 xl:gap-5 text-center">
      
      {/* Alert Badge with Date & Zoom Info */}
      <div className="flex items-center gap-1.5 bg-indigo-600/30 border border-[#997819] text-indigo-300 font-medium px-2.5 py-1 rounded-full text-[11px] tracking-wide">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        <span className="text-white font-semibold">Free Webinar: 12th Aug, 8 PM UK</span>
      </div>

      {/* Precise Prompt Text */}
      <span className="text-white text-xs sm:text-sm">
        For Details Select Your Funnel Track 👉
      </span>

      {/* Clean Track Buttons */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        
        {/* PSW Track */}
        <a 
          href="https://bizgrow-holdings.co.uk/master-webinar" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-3 py-1.5 rounded-lg transition-all border border-white/10 hover:border-white/30 text-left"
        >
          <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.16 3.422z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v7" />
          </svg>
          <div>
            <div className="text-xs font-semibold leading-tight">PSW</div>
            <div className="text-[10px] text-gray-300 leading-tight">Post-Study Work</div>
          </div>
        </a>
        
        {/* Professional Track */}
        <a 
          href="https://bizgrow-holdings.co.uk/home-7953" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-3 py-1.5 rounded-lg transition-all border border-white/10 hover:border-white/30 text-left"
        >
          <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <div>
            <div className="text-xs font-semibold leading-tight">Professional</div>
            <div className="text-[10px] text-gray-300 leading-tight">Career Growth</div>
          </div>
        </a>

        {/* Owner Track */}
        <a 
          href="https://bizgrow-holdings.co.uk/home-5367" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-3 py-1.5 rounded-lg transition-all border border-white/10 hover:border-white/30 text-left"
        >
          <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <div>
            <div className="text-xs font-semibold leading-tight">Owner</div>
            <div className="text-[10px] text-gray-300 leading-tight">Business Scaling</div>
          </div>
        </a>

      </div>

      {/* Countdown & Instant Copy Section */}
      <div className="flex items-center gap-2 bg-black/30 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono">
        <span className="text-amber-400 font-semibold">Starts:</span>
        <span className="text-white">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
        <span className="text-white/40">|</span>
        <button 
          onClick={handleCopyZoomLink}
          className="text-green-400 hover:text-green-500 underline font-sans text-[11px] font-medium cursor-pointer transition-colors"
        >
          {copied ? '✅ Link Copied!' : 'Copy Zoom Link'}
        </button>
      </div>

    </div>
  );
}