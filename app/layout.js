import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CustomCursor from "@/components/Cursor";
import EndorsalScript from "@/components/EndorsalScript";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://bizgrow-holdings.com"),
  title: {
    default: "BizGrow Holdings | UK's Leading Compliance & ISO Consultancy",
  },
  description:
    "Premier consultancy for SIA ACS, ISO Certifications (9001, 14001, 45001), and Cyber Essentials in the UK. Empowering business growth through compliance.",
  icons: {
    icon: "/site-icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://bizgrow-holdings.com",
    siteName: "BizGrow Holdings",
    images: [
      {
        url: "/about-hero.webp",
        width: 1200,
        height: 630,
        alt: "BizGrow Holdings - Business Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BizGrow Holdings | UK's Leading Compliance & ISO Consultancy",
    description:
      "Premier consultancy for SIA ACS, ISO Certifications and Cyber Essentials.",
    images: ["/about-hero.webp"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/crousel1.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <SpeedInsights />
        <CustomCursor />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
        <Footer />

        {/* --- Endorsal Script Start --- */}
        <Script id="endorsal-init" strategy="afterInteractive">
          {`
            window.NDRSL_CONFIG = { id: "5df2ab9a4264b34634388ca3" };
            !function(){var e,t=document;e=function(){var e=t.createElement("script");e.defer=!0,e.src="https://cdn.endorsal.io/widgets/widget.min.js";var n=t.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n),e.onload=function(){NDRSL.init("5df2ab9a4264b34634388ca3")}},"interactive"===t.readyState||"complete"===t.readyState?e():t.addEventListener("DOMContentLoaded",e)}();
          `}
        </Script>
        {/* --- Endorsal Script Start --- */}
        <EndorsalScript />
        {/* --- Endorsal Script End --- */}
      </body>
    </html>
  );
}
