"use client";
import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    name: "Keyur Kachhadiya",
    role: "Immaculate & Co. Ltd",
    logo: "/IMMACULATE & CO. LTD Logo.jpg", // Update path as per your public folder structure
    text: "We had an excellent experience with BIZGrow Holding during our COP119 audit. Their team was professional, efficient, and highly knowledgeable, making the entire process smooth and well-structured. The guidance provided was invaluable, and their attention to detail ensured a thorough assessment. We highly recommend their services to any business looking for reliable audit and accreditation support.",
  },
  {
    name: "Shehzad Nazir",
    role: "Director, Progressive Group Services Ltd",
    logo: "/PGS logo.jpg", // Update path as per your public folder structure
    text: "We've worked with Bizgrow Holdings Ltd for over two years and their support has been outstanding. They have successfully guided us through two ACS audits and COP119 compliance, providing expert advice and practical solutions throughout.Professional, knowledgeable, and always responsive. I would highly recommend Bizgrow Holdings Ltd to any security company looking for compliance and business support",
  },
  {
    name: "Denzil Fernandes",
    role: "Director, Jehovah Jireh Security Services Ltd",
    logo: "/jehovah-logo.jpg", // Update path as per your public folder structure
    text: "Bizgrow has been helpful since day one until the last They did their level best in completing my process going out of limit I'm very thankful and grateful for their support and hard work It looked so difficult in beginning but because of their excellent service I was able to",
  },
];

export default function HomeTestimonial() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = reviews.length;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, total]);

  const getCardStyle = (offset) => {
    if (offset === 0)
      return {
        transform: "translateX(0%) scale(1) rotate(0deg)",
        opacity: 1,
        zIndex: 30,
        filter: "blur(0px)",
      };
    if (offset === 1)
      return {
        transform: "translateX(58%) scale(0.82) rotate(8deg)",
        opacity: 0.55,
        zIndex: 10,
        filter: "blur(1.5px)",
      };
    return {
      transform: "translateX(-58%) scale(0.82) rotate(-8deg)",
      opacity: 0.55,
      zIndex: 10,
      filter: "blur(1.5px)",
    };
  };

  return (
    <div
      className="relative py-32 px-6 overflow-hidden -mx-6 bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-black text-[#12066a]">
          What our clients say
        </h2>
        <div className="w-16 h-px bg-[#997819] mx-auto mt-6" />
      </div>

      <div className="relative h-[440px] max-w-lg mx-auto">
        {reviews.map((rev, i) => {
          let offset = (i - active + total) % total;
          if (offset === total - 1) offset = -1;
          if (Math.abs(offset) > 1) return null;

          const style = getCardStyle(offset);
          const isActive = offset === 0;

          return (
            <div
              key={i}
              onClick={() => !isActive && setActive(i)}
              className={`absolute inset-x-0 top-0 mx-auto w-[300px] md:w-[360px] transition-all duration-700 ease-out ${
                isActive ? "cursor-default" : "cursor-pointer"
              }`}
              style={style}
            >
              <div
                className={`rounded-[2rem] p-7 md:p-8 border ${
                  isActive
                    ? "bg-white border-zinc-200 shadow-[0_30px_60px_-15px_rgba(18,6,106,0.18)]"
                    : "bg-zinc-50 border-zinc-100"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-200 relative flex items-center justify-center bg-zinc-50">
                    <Image
                      src={rev.logo}
                      alt={rev.role}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Quote className="w-5 h-5 text-[#997819]" />
                </div>

                <p
                  className="text-zinc-600 text-sm leading-relaxed mb-8"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {rev.text}
                </p>

                <h4 className="font-bold text-[#12066a] text-base">
                  {rev.name}
                </h4>
                <p className="text-zinc-500 text-sm mt-0.5">{rev.role}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 -mt-12">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-8 bg-[#997819]" : "w-1.5 bg-zinc-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}