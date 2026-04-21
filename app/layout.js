import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next";
import CustomCursor from "@/components/Cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // 🔹 MetadataBase zaroori hai taake absolute URLs sahi banain
  metadataBase: new URL("https://bizgrow-holdings.com"),
  
  title: {
    default: "BizGrow Holdings | UK's Leading Compliance & ISO Consultancy",
  },
  description: "Premier consultancy for SIA ACS, ISO Certifications (9001, 14001, 45001), and Cyber Essentials in the UK. Empowering business growth through compliance.",
  
  // 🔹 Icons & Favicon
  icons: {
    icon: "/site-icon.png", 
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // 🔹 Social Media Preview (Updated with about-hero.webp)
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://bizgrow-holdings.com",
    siteName: "BizGrow Holdings",
    images: [
      {
        url: "/about-hero.webp", // Ab share karne par ye image dikhegi
        width: 1200,
        height: 630,
        alt: "BizGrow Holdings - Business Excellence",
      },
    ],
  },
  
  // 🔹 Twitter card for better reach
  twitter: {
    card: "summary_large_image",
    title: "BizGrow Holdings | UK's Leading Compliance & ISO Consultancy",
    description: "Premier consultancy for SIA ACS, ISO Certifications and Cyber Essentials.",
    images: ["/about-hero.webp"],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* 🚀 LCP Optimization: Pehli image ko foran load karwane ke liye */}
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
        <Analytics/>
        <SpeedInsights/>
        <CustomCursor />
        <Navbar/>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Footer/>
      </body>
    </html>
  );
}