"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";

const videoData = [
  { id: 1, name: "Workshop Review", role: "", company: "SafeGuard Logistics", videoUrl: "/video/ts-2.mp4" },
  { id: 2, name: "Alaiba", role: "Compliance Mnager", company: "BizGrow Partner", videoUrl: "/video/Alaiba.mp4" },
  { id: 3, name: "Workshop Review", role: "", company: "BizGrow Holdings", videoUrl: "/video/Workshop-video-2.mp4" },
  { id: 4, name: "Usman Attique", role: "Operational Manager", company: "Zam Fm ltd", videoUrl: "/video/usman-attique.mp4" },
  { id: 5, name: "Shehzad Qureshi", role: "Director", company: "Blue Nine ltd", videoUrl: "/video/Sehzad Qureshi.mp4" },
];

const VideoTestimonials = () => {
  const [index, setIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);

  const next = () => setIndex((prev) => (prev + 1) % videoData.length);
  const prev = () => setIndex((prev) => (prev - 1 + videoData.length) % videoData.length);

  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* --- HEADING --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-[#0c054e]">
            Real <span className="text-[#997819]">Results</span>
          </h2>
        </div>

        {/* --- CYLINDER CAROUSEL CONTAINER --- */}
        {/* Perspective yahan bht zaroori hai 3D look k liye */}
        <div className="relative h-[450px] md:h-[550px] w-full flex items-center justify-center perspective-[2000px] isolate">
          
          <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
            <AnimatePresence mode="popLayout">
              {videoData.map((vid, i) => {
                const offset = (i - index + videoData.length) % videoData.length;
                
                // Hum 3 se zyada videos dikhayenge taake curve fill ho
                if (offset > 2 && offset < videoData.length - 2) return null;

                const isCenter = offset === 0;
                
                // Precise positioning for Cylinder effect
                const xPos = isCenter ? "0%" : offset === 1 ? "80%" : offset === 2 ? "130%" : offset === videoData.length - 1 ? "-80%" : "-130%";
                const rotation = isCenter ? 0 : offset === 1 ? -45 : offset === 2 ? -60 : offset === videoData.length - 1 ? 45 : 60;
                const zPos = isCenter ? 100 : -200;

                return (
                  <motion.div
                    key={vid.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: isCenter ? 1 : 0.3,
                      scale: isCenter ? 1 : 0.85,
                      x: xPos,
                      rotateY: rotation,
                      z: zPos,
                      filter: isCenter ? "blur(0px)" : "blur(2px)",
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute w-[260px] md:w-[320px] h-[400px] md:h-[500px] bg-[#0c054e] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(12,5,78,0.3)] cursor-pointer border border-white/10"
                    onClick={() => !isCenter && setIndex(i)}
                  >
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover opacity-50"
                    >
                      <source src={vid.videoUrl} type="video/mp4" />
                    </video>

                    {/* Content Overlay */}
                    <AnimatePresence>
                      {isCenter && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-[#0c054e] via-transparent to-transparent"
                        >
                          <h3 className="text-white text-3xl font-black uppercase leading-[0.9] mb-1">{vid.name}</h3>
                          <p className="text-[#997819] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">{vid.role}</p>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setPlayingVideo(vid.videoUrl); }}
                            className="w-16 h-16 bg-[#997819] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl active:scale-95"
                          >
                            <Play className="text-white fill-white w-6 h-6 ml-1" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Nav Controls */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 z-50 pointer-events-none">
            <button onClick={prev} className="w-12 h-12 rounded-full bg-white shadow-xl text-[#0c054e] flex items-center justify-center hover:bg-[#997819] hover:text-white transition-all pointer-events-auto border border-zinc-100 group">
              <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button onClick={next} className="w-12 h-12 rounded-full bg-white shadow-xl text-[#0c054e] flex items-center justify-center hover:bg-[#997819] hover:text-white transition-all pointer-events-auto border border-zinc-100 group">
              <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] bg-[#0c054e]/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button onClick={() => setPlayingVideo(null)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"><X size={40} /></button>
            <div className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
               <video autoPlay controls className="w-full h-full bg-black"><source src={playingVideo} type="video/mp4" /></video>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoTestimonials;