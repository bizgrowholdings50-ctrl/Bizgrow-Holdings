"use client";

import { useState } from "react";

export default function AvatarWithFallback({
  src,
  name,
  email,
  size = "w-10 h-10",
  textSize = "text-sm",
}) {
  const [imgError, setImgError] = useState(false);

  // Fallback text (Initials generator)
  const getInitials = (n, e) => {
    if (n && n.trim() !== "") {
      const parts = n.trim().split(" ");
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return n.substring(0, 2).toUpperCase();
    }
    if (e) {
      return e.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  const initials = getInitials(name, email);
  const hasValidImage = src && typeof src === "string" && src.trim() !== "" && !imgError;

  return (
    <div
      className={`relative rounded-full overflow-hidden flex items-center justify-center font-bold shrink-0 border border-[#997819]/40 bg-[#12066a]/5 text-[#12066a] ${size} ${textSize}`}
    >
      {hasValidImage ? (
        <img
          src={src}
          alt={name || "Avatar"}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}