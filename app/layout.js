import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "BizGrow Holdings | UK's Leading Compliance & ISO Consultancy",
       },
  description: "Premier consultancy for SIA ACS, ISO Certifications (9001, 14001, 45001), and Cyber Essentials in the UK. Empowering business growth through compliance.",
  
  // 🔹 Icons & Favicon
  icons: {
    icon: "/site-icon.png", // Browser tab icon
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // iPhone home screen icon
  },

  // 🔹 Social Media Preview
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://bizgrow-holdings.com",
    siteName: "BizGrow Holdings",
    images: [
      {
        url: "/site-icon.png", // Jab link share karen to ye bari image dikhe
        width: 1200,
        height: 630,
        alt: "BizGrow Holdings - Business Excellence",
      },
    ],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics/>
        <SpeedInsights/>
        <Navbar/>
       <SmoothScroll>
          {children}
        </SmoothScroll>
        <Footer/>
      </body>
    </html>
  );
}