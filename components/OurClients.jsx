"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import FadeIn from "./MotionWrapper";

const clients = [
  {
    name: "Guardnwatch",
    logo: "/guardnwatch.png",
    alt: "Guardnwatch | BizGrow Client",
  },
  {
    name: "Guarding Professionals",
    logo: "/guarding-professionals-removebg.png",
    alt: "Guarding Professionals | BizGrow Client",
  },
  {
    name: "MBS Security FM",
    logo: "/mbs-security.png",
    alt: "MBS Security FM | BizGrow Client",
  },
  {
    name: "Blue Nine",
    logo: "/Blue_Nine.png",
    alt: "Blue Nine | BizGrow Client",
  },
  {
    name: "BNK Services",
    logo: "/bnk-services.png",
    alt: "BNK Services | BizGrow Client",
  },
  {
    name: "Cerberus Security",
    logo: "/cerberus.png",
    alt: "Cerberus Security | BizGrow Client",
  },
  {
    name: "Vigilant Business Solutions",
    logo: "/vigilant.png",
    alt: "Vigilant Business Solutions | BizGrow Client",
  },
  {
    name: "Z.A.M FM LTD",
    logo: "/zam-fm.png",
    alt: "Z.A.M FM LTD | BizGrow Client",
  },
  {
    name: "Krypton Group",
    logo: "/krypton.png",
    alt: "Krypton Group | BizGrow Client",
  },
  {
    name: "Marshall Security Services",
    logo: "/marshall.png",
    alt: "Marshall Security Services | BizGrow Client",
  },
  {
    name: "Rawal Veritas LTD",
    logo: "/rawal.png",
    alt: "Rawal Veritas LTD | BizGrow Client",
  },
  {
    name: "ZSS Security",
    logo: "/zss-removebg.png",
    alt: "ZSS Security | BizGrow Client",
  },
  {
    name: "Pacific",
    logo: "/pacific-removebg.png",
    alt: "Pacific | BizGrow Client",
  },
  {
    name: "G4D",
    logo: "/g4d.png",
    alt: "G4D | BizGrow Client",
  },
  {
    name: "MTK Group",
    logo: "/patriot-removebg.png",
    alt: "MTK Group | BizGrow Client",
  },
  {
    name: "Comprehensive Security",
    logo: "/Comprehensive-removebg.png",
    alt: "Comprehensive Security | BizGrow Client",
  },
  {
    name: "Supreme Security",
    logo: "/supreme.png",
    alt: "Supreme Security | BizGrow Client",
  },
  {
    name: "Elma",
    logo: "/elma02-removebg.png",
    alt: "Elma | BizGrow Client",
  },
  {
    name: "Akita",
    logo: "/akita.png",
    alt: "Akita | BizGrow Client",
  },
  {
    name: "Mountain",
    logo: "/mountain.png",
    alt: "Mountain | BizGrow Client",
  },
  {
    name: "Jehova",
    logo: "/jehova-bg.png",
    alt: "Jehova | BizGrow Client",
  },
  {
    name: "Security Jobs",
    logo: "/security-jobs-removebg.png",
    alt: "Security Jobs | BizGrow Client",
  },
  {
    name: "Great Guard",
    logo: "/aamir-apex-removebg.png",
    alt: "Great Guard | BizGrow Client",
  },
];

// Infinite wrap helpers
function wrap(min, max, v) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

function ClientsMarquee({ clients, baseVelocity = 2 }) {
  const baseX = useMotionValue(0);
  const hoveredCard = useRef(false);
  const directionFactor = useRef(1);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 80,
    stiffness: 300,
    mass: 0.5,
  });

  const velocityFactor = useTransform(smoothVelocity, [-1000, 1000], [-2, 2], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    if (hoveredCard.current) return;

    const velocity = velocityFactor.get();
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (Math.abs(velocity) > 0.05) {
      directionFactor.current = velocity < 0 ? -1 : 1;
    }

    const scrollInfluence = Math.min(Math.abs(velocity), 1.5);
    moveBy += directionFactor.current * moveBy * scrollInfluence * 0.35;

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <motion.div className="flex w-max gap-6" style={{ x }}>
        {[...clients, ...clients, ...clients, ...clients].map((client, idx) => (
          <div
            key={idx}
            onMouseEnter={() => {
              hoveredCard.current = true;
            }}
            onMouseLeave={() => {
              hoveredCard.current = false;
            }}
            className="group relative flex items-center justify-center
                       h-28 w-48 shrink-0 rounded-2xl bg-white border border-white/20
                       shadow-[0_4px_20px_rgba(0,0,0,0.15)]
                       hover:shadow-[0_8px_30px_rgba(153,120,25,0.3)]
                       hover:border-[#997819] hover:-translate-y-1
                       transition-all duration-300"
          >
            <div className="relative w-full h-full p-6">
              <Image
                src={client.logo}
                alt={client.alt}
                fill
                className="object-contain p-4
                           transition-transform duration-300
                           group-hover:scale-[1.08]"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ClientsSection() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-[#12066a] via-[#170880] to-[#12066a] border-y border-[#997819]/30 overflow-hidden shadow-2xl">
      {/* Decorative Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#997819]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto text-center z-10">
        <FadeIn>
          <span className="inline-flex items-center gap-2 text-[#997819] font-black uppercase tracking-[0.3em] text-xs">
            <span className="h-px w-8 bg-[#997819]" />
            Experts in Growing Private Security Businesses
            <span className="h-px w-8 bg-[#997819]" />
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 mb-3 tracking-tight">
            OUR VALUABLE <span className="text-[#997819]">CLIENTS</span>
          </h2>

          <p className="text-blue-200/80 font-medium mb-16 max-w-xl mx-auto text-sm sm:text-base">
            Proudly partnering with leading private security companies across the UK
          </p>
        </FadeIn>
      </div>

      <FadeIn direction="up" className="relative z-10">
        <ClientsMarquee clients={clients} baseVelocity={1} />
      </FadeIn>
    </section>
  );
}