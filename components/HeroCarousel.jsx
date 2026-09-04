"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    image: "/crousel1.webp",
    alt: "Business meeting in a modern office",
    eyebrow: "UK PRIVATE SECURITY COMPLIANCE",
    heading: "UK Security Compliance Experts",
    subheading:
      "Specialist consultancy for private security companies seeking SIA ACS, ISO certification and industry accreditation with practical systems designed for successful audits and long-term compliance.",
    buttonText: "Explore Security Compliance",
    buttonLink: "/contact-us/",
  },
  {
    image: "/home-compliance.jpg",
    alt: "Team collaboration around a whiteboard",
    eyebrow: "SIA ACS • ISO • INDUSTRY ACCREDITATIONS",
    heading: "SIA ACS & ISO Certification Specialists",
    subheading:
      "Supporting UK security businesses with ACS preparation, ISO 9001, ISO 14001, ISO 45001, COP 119, BS 7858, SafeContractor and wider compliance requirements.",
    buttonText: "Explore Our Certification",
    buttonLink: "/our-services/",
  },
  {
    image: "/coursel2-og.webp",
    alt: "Laptop showing business analytics",
    eyebrow: "AUDIT READINESS • COMPLIANCE • BUSINESS GROWTH",
    heading: "13+ Years of Security Compliance Experience",
    subheading:
      "Helping security companies build audit-ready systems, strengthen compliance and meet the standards required to compete for bigger contracts.",
    buttonText: "Explore Our Insights",
    buttonLink: "/blogs",
  },
];

const SLIDE_DURATION = 7000;

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [currentSlide, isPaused]);

  return (
    <section
      className="relative w-full h-[100vh] xl:h-screen overflow-hidden bg-zinc-900"
      aria-label="Hero Carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out
            ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 invisible z-0"}`}
          aria-hidden={index !== currentSlide}
        >
          {/* Background Image with Ken Burns zoom */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`absolute inset-0 transition-transform ease-out
                ${
                  index === currentSlide
                    ? "scale-110 duration-[9000ms]"
                    : "scale-100 duration-0"
                }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index <= 1}
                fetchPriority={index === 0 ? "high" : "low"}
                quality={75}
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {/* Layered premium overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)] z-10" />
          </div>

          {/* Content Section */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6 md:px-12">
            {/* Decorative accent line */}
            <div
              className={`mb-6 px-4 py-2 border border-[#D4AF37]/60 rounded-full
    text-[#D4AF37] text-xs md:text-sm font-bold tracking-[2px]
    bg-black/20 backdrop-blur-sm
    transition-all duration-700 delay-100
    ${
      index === currentSlide
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-4"
    }`}
            >
              {slide.eyebrow}
            </div>

            <span
              className={`text-3xl md:text-6xl lg:text-6xl font-serif font-extrabold leading-tight mb-4 max-w-5xl tracking-tight
                drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]
                transition-[transform,opacity] duration-700 ease-out will-change-[transform,opacity]
                ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            >
              {slide.heading}
            </span>

            <p
              className={`text-lg md:text-xl lg:text-lg font-medium mb-8 max-w-3xl leading-relaxed text-white/90
                transition-[transform,opacity] duration-700 delay-150 ease-out
                ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            >
              {slide.subheading}
            </p>

            <div
              className={`transition-[transform,opacity] duration-700 delay-300 ease-out
                ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              <Link
                href={slide.buttonLink}
                className="group relative inline-flex items-center gap-2 overflow-hidden bg-[#12066a] hover:bg-[#D4AF37] text-white font-bold py-3 px-8 rounded-full text-lg md:text-xl transition-all duration-300 shadow-xl active:scale-95 hover:shadow-2xl hover:shadow-[#D4AF37]/30"
              >
                <span className="relative z-10">{slide.buttonText}</span>
                <ChevronRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                {/* Shine sweep on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 hover:opacity-100 hover:bg-white/20 transition-all duration-300 group-hover:opacity-100"
        style={{ opacity: undefined }}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Navigation Dots with progress fill */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="relative h-1.5 rounded-full bg-white/30 overflow-hidden transition-all duration-500"
            style={{
              width: index === currentSlide ? "40px" : "10px",
            }}
          >
            {index === currentSlide && (
              <span
                key={`${currentSlide}-${isPaused}`}
                className="absolute inset-0 bg-[#D4AF37] rounded-full origin-left"
                style={{
                  animation: isPaused
                    ? "none"
                    : `heroCarouselFill ${SLIDE_DURATION}ms linear forwards`,
                }}
              />
            )}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes heroCarouselFill {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
}
