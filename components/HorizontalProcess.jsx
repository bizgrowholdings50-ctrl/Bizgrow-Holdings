"use client";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import FadeIn from "./MotionWrapper";

const HorizontalProcess = () => {
  const targetRef = useRef(null);
  const [isVertical, setIsVertical] = useState(false);

  // Tablet (1024px) aur mobile dono ke liye vertical layout activate karega
  useEffect(() => {
    const handleResize = () => setIsVertical(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001,
  });

  // Desktop horizontal movement logic
  const x = useTransform(
    smoothProgress,
    [0, 0.05, 0.2, 0.4, 0.55, 0.75, 0.85, 1],
    ["0vw", "0vw", "-100vw", "-100vw", "-200vw", "-200vw", "-300vw", "-300vw"]
  );

  const sections = [
    {
      id: "Support",
      title: "SIA ACS",
   
      img: "sia-home.jpg",
      altText: "BizGrow Digital Planning strategy process", // <-- Added this
      description:
        "Achieve and maintain Approved Contractor Scheme status with expert guidance.",
    },
    {
      id: "Certification",
      title: "ISO",
      
      img: "/iso-home.jpg",
      altText: "BizGrow Digital marketing digital process", // <-- Added this
      description:
        "Streamline your business with ISO 9001, 14001, and 45001 certifications.",
    },
    {
      id: "Consultancy",
      title: "Business",
    
      img: "/consultancy-home.jpg",
      altText: "BizGrow Digital creative design process", // <-- Added this
      description:
        "Strategic planning to help your company scale and improve efficiency.",
    },
    {
      id: "Development",
      title: "Training ",
     
      img: "/business.jpg",
      altText: "BizGrow Digital web development process", // <-- Added this
      description:
        "Equipping your team with professional, industry-approved training for lasting performance.",
    },
  ];

  const sectionHeightVh = isVertical ? "auto" : (sections.length + 1) * 100;

  return (
    <section
      ref={targetRef}
      style={{ height: isVertical ? "auto" : `${sectionHeightVh}vh` }}
      className="relative bg-white  overflow-visible py-16 lg:py-0"
    >
      {/* Sticky sirf Laptop (lg: 1024px+) screens par chalega */}
      <div
        className={`${
          isVertical
            ? "relative"
            : "sticky top-0 h-screen w-full flex items-center  overflow-hidden"
        }`}
      >
        {/* --- MAIN HEADING --- */}
        <div
          className={`${
            isVertical
              ? "relative mb-16"
              : "absolute top-20 left-0 w-full z-20 pointer-events-none"
          }`}
        >
          <div className="text-center px-4">
            <FadeIn direction="up">
              <h3 className="text-[#997819] font-extrabold tracking-[0.2em] text-xs md:text-lg mb-2">
                Comprehensive Solutions
              </h3>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-[#12066a] uppercase">
                Tailored consultancy services
              </h2>
            </FadeIn>
            <div className="w-12 h-1 bg-[#997819] mx-auto mt-4 rounded-full" />
          </div>
        </div>

        {/* --- CONTENT WRAPPER --- */}
        <motion.div
          style={{ x: isVertical ? 0 : x }}
          className={`flex ${
            isVertical
              ? "flex-col px-6 gap-24 sm:gap-32"
              : "will-change-transform"
          }`}
        >
          {sections.map((item) => (
            <div
              key={item.id}
              className={`relative flex-shrink-0 mt-20 flex flex-col lg:flex-row items-center justify-between 
              ${
                isVertical
                  ? "w-full max-w-4xl mx-auto"
                  : "h-screen w-screen p-10 lg:pt-40"
              }`}
            >
              {/* Text Side */}
              <div className="z-10 w-full lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
                <FadeIn direction={isVertical ? "up" : "right"}>
                  <span
                    className="text-[#997819] font-bold tracking-[0.3em] uppercase
                   text-sm md:text-base"
                  >
                    {item.id} {item.tag}
                  </span>
                </FadeIn>
                <FadeIn direction={isVertical ? "up" : "right"} delay={0.2}>
                  {/* Font sizes optimized for all screens */}
                  <h3 className="text-5xl sm:text-7xl lg:text-[6.5rem]  font-black  text-[#12066a] leading-none mt-4">
                    {item.title}
                  </h3>
                </FadeIn>
                {/* Naya Paragraph Section yahan aayega */}
                <FadeIn direction={isVertical ? "up" : "right"} delay={0.4}>
                  <p className="mt-6 text-lg md:text-lg  text-black max-w-md mx-auto lg:mx-0 leading-relaxed">
                    {item.description}
                  </p>
                </FadeIn>
              </div>

              {/* Image Side */}
              <div className="w-full lg:w-1/2 h-[35vh] sm:h-[45vh] lg:h-[60vh]  relative group">
                <img
                  src={item.img}
                  alt={item.altText}
                  className="w-full h-full object-cover rounded-[2rem] shadow-2xl relative z-10  transition-all duration-500"
                />
                {/* Background Shadow Number */}
                <div className="absolute -bottom-6 -left-4 sm:-bottom-10 sm:-left-10 text-[6rem] sm:text-[9rem] lg:text-[11rem] font-black text-slate-200 dark:text-white/5 z-0 opacity-50">
                  {item.id}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalProcess;