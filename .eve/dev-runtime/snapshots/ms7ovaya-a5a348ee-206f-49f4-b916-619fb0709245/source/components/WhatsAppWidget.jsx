"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Icons aur heavy logic ko dynamic import kiya aur SSR false kar diya
// Kyunki yeh client component ke andar hai, Next.js isay allow karega!
const MessageCircleIcon = dynamic(
  () => import("lucide-react").then((mod) => mod.MessageCircle),
  { ssr: false }
);

const WhatsAppWidget = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 group animate-fade-in">
      {/* Floating Label */}
      <div className="bg-white text-gray-800 py-2 px-4 rounded-xl shadow-lg border border-gray-100 mb-1 scale-0 group-hover:scale-100 origin-bottom-right transition-all duration-300 font-montserrat text-sm font-medium">
        Chat with our expert team! 👋
      </div>

      <a
        href="https://wa.me/447898205035?text=Hi%20BizGrow%20Holdings,%20I'm%20interested%20in%20your%20services."
        target="_blank"
        aria-label="Chat on WhatsApp"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-16 h-16 bg-[#997819] text-white rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:scale-110 transition-transform duration-300"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
        
        {/* Render Dynamic Icon */}
        <MessageCircleIcon size={32} fill="currentColor" className="relative z-10" />
        
        <span className="absolute top-0 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
      </a>
    </div>
  );
};

export default WhatsAppWidget;