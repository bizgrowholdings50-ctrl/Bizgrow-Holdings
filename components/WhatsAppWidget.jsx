"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppWidget = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 group">
      
      {/* Floating Label */}
      <div className="bg-white text-gray-800 py-2 px-4 rounded-xl shadow-lg border border-gray-100 mb-1 scale-0 group-hover:scale-100 origin-bottom-right transition-all duration-300 font-montserrat text-sm font-medium">
        Chat with our expert team! 👋
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/447898205035?text=Hi%20BizGrow%20Holdings,%20I'm%20interested%20in%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with BizGrow Holdings on WhatsApp"
        className="
          relative
          flex
          items-center
          justify-center
          w-16
          h-16
          rounded-full
          bg-[#25D366]
          text-white
          shadow-[0_8px_30px_rgba(37,211,102,0.45)]
          transition-all
          duration-300
          hover:scale-110
          hover:shadow-[0_10px_35px_rgba(37,211,102,0.6)]
        "
      >
        {/* Pulse */}
        <span
          className="
            absolute
            inset-0
            rounded-full
            bg-[#25D366]
            animate-ping
            opacity-20
          "
        />

        {/* WhatsApp Logo */}
        <FaWhatsapp
          size={34}
          className="relative z-10"
        />

        {/* Online indicator */}
        <span
          className="
            absolute
            top-0
            right-1
            w-4
            h-4
            bg-green-500
            border-2
            border-white
            rounded-full
            z-20
          "
        />
      </a>
    </div>
  );
};

export default WhatsAppWidget;