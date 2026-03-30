"use client";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import FadeIn from "./MotionWrapper";
import Link from "@node_modules/next/link";

const HorizontalProcess = () => {
  const targetRef = useRef(null);
  const [isVertical, setIsVertical] = useState(false);

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
    stiffness: 70, // Aapka original stiffness
    damping: 30,
    restDelta: 0.001,
  });

  // 🚀 Aapka Original Step-by-Step Flow
  const x = useTransform(
    smoothProgress,
    [0, 0.05, 0.2, 0.4, 0.55, 0.75, 0.85, 1],
    ["0vw", "0vw", "-100vw", "-100vw", "-200vw", "-200vw", "-300vw", "-300vw"]
  );

 const sections = [
  {
    id: "01",
    tag: "Support",
    title: "SIA ACS",
    img: "/sia-home.jpg",
    alt: "SIA ACS - BizGrow Holdings Ltd", // 👈 SEO Friendly Alt
    description:
      <>Achieve and maintain <Link href="https://bizgrow-holdings.vercel.app/our-services/sia-acs/" className="text-[#997819] font-bold">Approved Contractor Scheme</Link> status with expert guidance.</>
  },
  {
    id: "02",
    tag: "Certification",
    title: "ISO",
    img: "/iso-home.jpg",
    alt: "ISO Certification - BizGrow Holdings Ltd", // 👈 Key-words include kiye
    description:
      <>Streamline your business with <Link href="https://bizgrow-holdings.vercel.app/our-services/iso-9001/" className="text-[#997819] font-bold">ISO 9001</Link>, <Link href="https://bizgrow-holdings.vercel.app/our-services/iso-14001/" className="text-[#997819] font-bold">14001</Link>, and <Link href="https://bizgrow-holdings.vercel.app/our-services/iso-45001/" className="text-[#997819] font-bold">45001 </Link>certifications.</>,
  },
  {
    id: "03",
    tag: "Consultancy",
    title: "Business",
    img: "/consultancy-home.jpg",
    alt: "Business Consultancy - BizGrow Holdings Ltd",
    description:
      "Strategic planning to help your company scale and improve efficiency.",
  },
  {
    id: "04",
    tag: "Development",
    title: "Training",
    img: "/business.jpg",
    alt: "Development Training - BizGrow Holdings Ltd",
    description:
      "Equipping your team with professional, industry-approved training for lasting performance.",
  },
];
  // Height logic to ensure smooth pinning
  const sectionHeightVh = isVertical ? "auto" : (sections.length + 1) * 100;

  return (
    <section
      ref={targetRef}
      style={{ height: isVertical ? "auto" : `${sectionHeightVh}vh` }}
      className="relative bg-white overflow-visible py-16 lg:py-0"
    >
      <div
        className={`${
          isVertical
            ? "relative"
            : "sticky top-10 h-screen w-full flex items-center overflow-hidden"
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
              <h2 className="text-[#997819] font-extrabold tracking-[0.2em] text-xs md:text-lg mb-2 uppercase">
                Comprehensive Solutions
              </h2>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-[#12066a] uppercase italic">
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
              className={`relative flex-shrink-0 flex flex-col lg:flex-row items-center justify-between 
              ${
                isVertical
                  ? "w-full max-w-4xl mx-auto"
                  : "h-screen w-screen px-20 lg:pt-32"
              }`}
            >
              {/* Text Side */}
              <div className="z-10 w-full lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
                <FadeIn direction={isVertical ? "up" : "right"}>
                  <span className="text-[#997819] font-bold tracking-[0.3em] uppercase text-sm">
                    {item.tag}
                  </span>
                </FadeIn>
                <FadeIn direction={isVertical ? "up" : "right"} delay={0.2}>
                  <h3 className="text-5xl sm:text-7xl lg:text-[7rem] font-black text-[#12066a] leading-none mt-4 uppercase italic">
                    {item.title}
                  </h3>
                </FadeIn>
                <FadeIn direction={isVertical ? "up" : "right"} delay={0.4}>
                  <p className="mt-6 text-lg text-zinc-600 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </FadeIn>
              </div>

              {/* Image Side */}
              <div className="w-full lg:w-[45%] h-[40vh] lg:h-[55vh] relative">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-cover rounded-[3rem] shadow-2xl relative z-10 border-2 border-zinc-50"
                />
                <div className="absolute -bottom-10 -left-10 text-[10rem] lg:text-[14rem] font-black text-[#12066a]/5 z-0 select-none italic">
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
