import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CustomCursor from "@/components/Cursor";
import EndorsalScript from "@/components/EndorsalScript";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ReferralTracker from "@/components/ReferralTracker";
// 🚀 Next.js ka built-in Script tag import kiya
import Script from "next/script";
import ComplianceChat from "@/components/ComplianceChat";
import AlertAnnouncementBar from "@/components/AlertPopup";

const isProduction = process.env.NODE_ENV === "production";

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
        {/* Pure HTML Script Method - Browser isay lazmi execute karega */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FFG6DVXKQX"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FFG6DVXKQX');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isProduction && <Analytics />}
        {isProduction && <SpeedInsights />}
        {isProduction && <EndorsalScript />}
        
        {/* 🚀 Microsoft Clarity Bulletproof Script - Sirf production par load hoga */}
        {isProduction && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xlrg4ssjci");
            `}
          </Script>
        )}

        <ReferralTracker />
        <AlertAnnouncementBar />
        <CustomCursor />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
        <Footer />
        {/* <ComplianceChat /> */}
        <WhatsAppWidget /> 
       
      </body>
    </html>
  );
}