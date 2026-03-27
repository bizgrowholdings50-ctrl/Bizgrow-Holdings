"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";

const videoData = [
  {
    id: 1,
    name: "James Dalton",
    role: "CEO",
    company: "SafeGuard Logistics",
    videoUrl: "/video/ts-1.mp4",
  },

  {
    id: 2,
    name: "Alaiba",
    role: "Speaker",
    company: "BizGrow Partner",
    videoUrl: "/video/Alaiba.mp4",
  },
  {
    id: 3,
    name: "Workshop Team",
    role: "Strategic Team",
    company: "BizGrow Holdings",
    videoUrl: "/video/Workshop-video-2.mp4",
  },
];

const VideoTestimonials = () => {
  const [index, setIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);

  const next = () => setIndex((prev) => (prev + 1) % videoData.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + videoData.length) % videoData.length);

  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden">
      {/* 🚀 PERFORMANCE TRICK: Preload all videos in background */}
      <div className="hidden">
        {videoData.map((vid) => (
          <video key={`preload-${vid.id}`} preload="auto" muted playsInline>
            <source src={vid.videoUrl} type="video/mp4" />
          </video>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* --- HEADING SECTION --- */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-[#0c054e] mb-4"
          >
            Real <span className="text-[#997819]">Results</span>, Real Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg md:text-xl font-medium"
          >
            Watch how BizGrow Holdings is transforming industries through
            innovation and dedicated partnership.
          </motion.p>
        </div>

        {/* --- MAIN CONTAINER --- */}
        <div className="relative w-full aspect-video min-h-[450px] md:min-h-[650px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-[#0c054e] shadow-2xl isolate">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }} // Fastened for better feel
              className="absolute inset-0 w-full h-full"
            >
              {/* 1. BACKDROP VIDEO (Optimized with preload) */}
              <video
                key={`bg-${videoData[index].videoUrl}`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[50px] scale-110 pointer-events-none"
              >
                <source src={videoData[index].videoUrl} type="video/mp4" />
              </video>

              {/* 2. CENTER PORTRAIT VIDEO (Optimized with preload) */}
              <div className="relative z-10 h-full w-full flex items-center justify-center">
                <video
                  key={`main-${videoData[index].videoUrl}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="h-full w-auto max-w-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                  <source src={videoData[index].videoUrl} type="video/mp4" />
                </video>
              </div>

              {/* 3. GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20 pointer-events-none" />

              {/* 4. CONTENT LAYER */}
              <div className="absolute inset-0 p-6 md:p-16 flex flex-col justify-between z-30 pointer-events-none">
                <div className="bg-white/10 backdrop-blur-md self-start px-4 py-1 rounded-full border border-white/20 pointer-events-auto">
                  <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                    Success Story
                  </span>
                </div>

                <div className="flex flex-col md:flex-row items-end justify-between gap-6 pointer-events-auto">
                  <div className="text-white drop-shadow-lg">
                    <h3 className="text-4xl md:text-8xl font-black uppercase leading-[0.9] mb-3">
                      {videoData[index].name}
                    </h3>
                    <p className="text-[#997819] font-bold text-xs md:text-xl uppercase tracking-wider">
                      {videoData[index].role}{" "}
                      <span className="mx-2 opacity-50">|</span>{" "}
                      {videoData[index].company}
                    </p>
                  </div>

                  <button
                    onClick={() => setPlayingVideo(videoData[index].videoUrl)}
                    className="w-16 h-16 md:w-28 md:h-28 bg-[#997819] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl shrink-0"
                  >
                    <Play className="text-white fill-white w-6 h-6 md:w-10 md:h-10 ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 md:px-8 z-40 pointer-events-none">
            <button
              onClick={prev}
              className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#997819] transition-all pointer-events-auto border border-white/10 group"
            >
              <ChevronLeft className="group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#997819] transition-all pointer-events-auto border border-white/10 group"
            >
              <ChevronRight className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Video Modal */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4"
          >
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute top-6 right-6 text-white hover:text-[#997819] transition-colors z-[110]"
            >
              <X size={40} />
            </button>
            <div className="w-full max-w-5xl aspect-video">
              <video
                autoPlay
                controls
                className="w-full h-full object-contain shadow-2xl"
              >
                <source src={playingVideo} type="video/mp4" />
              </video>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoTestimonials;
