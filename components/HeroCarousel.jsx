"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image'; // 👈 Next.js Image import kiya
import Link from 'next/link';   // 👈 Performance ke liye Link use karein

const slides = [
  {
    image: '/crousel1.webp',
    alt: 'Business meeting in a modern office',
    heading: 'Smarter Strategy. Stronger Systems. Real Results.',
    subheading: 'BizGrow Holdings delivers compliance-driven consultancy that helps UK businesses pass audits, win contracts, and grow with certainty.',
    buttonText: 'Start Your Growth Journey',
    buttonLink: '/contact-us/'
  },
  {
    image: '/home-compliance.jpg',
    alt: 'Team collaboration around a whiteboard',
    heading: 'Compliance Clear. Certification Achievable.',
    subheading: 'Helping UK businesses achieve ISO certification, regulatory approval, and audit-ready systems with clarity, confidence, and control.',
    buttonText: 'Explore Our Certification',
    buttonLink: '/our-services/'
  },
  {
    image: '/coursel2 og.webp',
    alt: 'Laptop showing business analytics',
    heading: 'Clarity in Strategy. Confidence in Compliance.',
    subheading: 'Supporting UK organisations with innovative yet practical solutions that improve performance and future-proof operations.',
    buttonText: 'Explore Our Insights',
    buttonLink: '/blogs'
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-zinc-900" aria-label="Hero Carousel">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 invisible z-0'}`}
          aria-hidden={index !== currentSlide}
        >
          {/* FIX 1: Next.js Image for LCP Optimization */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0} // 👈 Sabse pehli image foran load hogi
              quality={85}
              sizes="100vw"
              className="object-cover"
              loading={index === 0 ? "eager" : "lazy"} // 👈 Critical for LCP
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10"></div>
          </div>

          {/* Content */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6 md:px-12">
            {/* SEO Optimization: H1 hamesha DOM mein rahe lekin transition smooth ho */}
            <h1 className={`text-3xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-4 drop-shadow-lg max-w-5xl transition-transform duration-700 ${index === currentSlide ? 'translate-y-0' : 'translate-y-4'}`}>
              {slide.heading}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-medium mb-8 max-w-3xl leading-relaxed drop-shadow-md">
              {slide.subheading}
            </p>
            <Link
              href={slide.buttonLink}
              className="bg-[#12066a] hover:bg-[#D4AF37] text-white font-bold py-3 px-8 rounded-full text-lg md:text-xl transition-all duration-300 shadow-xl active:scale-95"
            >
              {slide.buttonText}
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation & Dots Logic (No change needed here) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full bg-white transition-all duration-300
              ${index === currentSlide ? 'scale-150 bg-opacity-100' : 'bg-opacity-50 hover:bg-opacity-75'}`}
          ></button>
        ))}
      </div>
    </section>
  );
}