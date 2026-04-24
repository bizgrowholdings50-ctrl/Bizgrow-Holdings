"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function EndorsalScript() {
  const pathname = usePathname();

  useEffect(() => {
    // Purana script agar koi hai toh usay remove karein
    const existingScript = document.getElementById("endorsal-runtime");
    if (existingScript) existingScript.remove();

    // Naya script create karein
    const script = document.createElement("script");
    script.id = "endorsal-runtime";
    script.src = "https://cdn.endorsal.io/widgets/widget.min.js";
    script.async = true;
    
    script.onload = () => {
      // Jab script load ho jaye, toh manually widget ko initialize karein
      if (window.NDRSL) {
        window.NDRSL.init("5df2ab9a4264b343388ca3"); // Aapki ID
      }
    };

    document.head.appendChild(script);
  }, [pathname]); // Jab bhi path change hoga (pathname), ye dubara chalega

  return null;
}