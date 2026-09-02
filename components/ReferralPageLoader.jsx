"use client";

import { useEffect, useState } from "react";

export default function ReferralPageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;

    try {
      const reloadKey = "bizgrow_referral_reload";
      const alreadyReloaded = sessionStorage.getItem(reloadKey);

      if (!alreadyReloaded) {
        timeoutId = window.setTimeout(() => {
          try {
            sessionStorage.setItem(reloadKey, "true");
            window.location.reload();
          } catch (error) {
            console.error("REFERRAL AUTO RELOAD ERROR:", error);
            setLoading(false);
          }
        }, 2000);
      } else {
        sessionStorage.removeItem(reloadKey);
        setLoading(false);
      }
    } catch (error) {
      console.error("REFERRAL LOADER ERROR:", error);
      setLoading(false);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fcfcfd",
        zIndex: 9999,
      }}
      aria-label="Loading"
    >
      <p
        style={{
          fontSize: "13px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#94a3b8",
        }}
      >
        Loading...
      </p>
    </div>
  );
}