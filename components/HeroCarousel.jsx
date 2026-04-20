"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/crousel1.jpg',
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
    image: '/crousel2.webp',
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
    <section className="relative w-full h-screen overflow-hidden" aria-label="Hero Carousel">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${index === currentSlide ? 'opacity-100' : 'opacity-0 invisible'}`}
          aria-hidden={index !== currentSlide}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
            role="img"
            aria-label={slide.alt}
          >
            <div className="absolute inset-0 bg-black opacity-60"></div>
          </div>

          {/* Content - H1 used for SEO (only visible for active slide) */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6 md:px-12">
            {index === currentSlide && (
              <>
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-4 drop-shadow-lg max-w-5xl">
                  {slide.heading}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl font-medium mb-8 max-w-3xl leading-relaxed drop-shadow-md">
                  {slide.subheading}
                </p>
                <a
                  href={slide.buttonLink}
                  className="bg-[#12066a] hover:bg-[#997819] text-white font-bold py-3 px-8 rounded-full text-lg md:text-xl transition-all duration-300 shadow-xl active:scale-95"
                >
                  {slide.buttonText}
                </a>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Accessibility Fix: aria-label added */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full z-20 transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full z-20 transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight size={30} />
      </button>

      {/* Dot Indicators - Accessibility Fix: aria-label added */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
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