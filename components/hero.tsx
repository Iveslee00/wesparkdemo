"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const slides = [
  { id: 0, image: "/images/home/01.jpg" },
  { id: 1, image: "/images/home/02.jpg" },
  { id: 2, image: "/images/home/03.jpg" },
];

const SLIDE_MS = 5500;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { next(); return 0; }
        return p + 100 / (SLIDE_MS / 50);
      });
    }, 50);
    return () => clearInterval(t);
  }, [next]);

  const goTo = (i: number) => { setCurrent(i); setProgress(0); };

  return (
    /* Mobile: image on top (flex-col-reverse) → text below
       Desktop: text left 44% | image right 56% (flex-row), full viewport */
    <section className="flex flex-col-reverse md:flex-row md:h-screen">

      {/* ── LEFT: Brand text + Philosophy ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="md:w-[44%] md:flex-shrink-0 md:overflow-y-auto flex flex-col justify-center
                   px-7 md:px-12 lg:px-16 py-12 md:py-0"
        style={{ backgroundColor: "#140810" }}
      >
        <div className="max-w-xs lg:max-w-sm">
          {/* Brand tag */}
          <p className="text-[9px] tracking-[0.42em] uppercase mb-8"
             style={{ color: "rgba(255,255,255,0.28)" }}>
            品牌主張 · BEAUTY MANIFESTO
          </p>

          {/* Slogan */}
          <h1 className="font-light text-white tracking-tight leading-tight"
              style={{ fontSize: "clamp(26px, 3.8vw, 46px)" }}>
            WE SPARK
          </h1>
          <h1 className="font-light tracking-tight leading-tight italic mb-5"
              style={{ fontSize: "clamp(26px, 3.8vw, 46px)", color: "rgba(140,106,120,0.55)" }}>
            BEAUTY.
          </h1>
          <p className="text-xs font-light tracking-wider mb-10"
             style={{ color: "rgba(255,255,255,0.32)" }}>
            我們點燃美麗時刻
          </p>

          {/* Divider */}
          <div className="w-5 h-px mb-10"
               style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

          {/* Philosophy */}
          <p className="text-[9px] tracking-[0.35em] uppercase mb-5"
             style={{ color: "#8C6A78" }}>
            我們的理念 · OUR PHILOSOPHY
          </p>
          <p className="font-light leading-snug mb-1"
             style={{ fontSize: "clamp(15px, 1.8vw, 19px)", color: "rgba(255,255,255,0.78)" }}>
            美不是等待，
          </p>
          <p className="font-light leading-snug mb-5"
             style={{ fontSize: "clamp(15px, 1.8vw, 19px)", color: "rgba(140,106,120,0.85)" }}>
            而是點燃。
          </p>
          <p className="text-[11px] font-light italic mb-7"
             style={{ color: "rgba(255,255,255,0.2)" }}>
            Beauty is not something to wait for.
            <br />It is something to ignite.
          </p>
          <p className="text-xs font-light leading-relaxed mb-10"
             style={{ color: "rgba(255,255,255,0.4)" }}>
            在 WIS，我們點燃創意與市場之間的火花。
            <br />在概念與成長之間，創造驅動美麗前行的動能。
          </p>

          {/* CTA */}
          <a href="/brands" className="group inline-flex items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] uppercase border-b pb-0.5
                             text-white/45 border-white/18
                             hover:text-white/90 hover:border-white/70
                             transition-all duration-300">
              探索 WIS
            </span>
            <ArrowRight size={11}
              className="text-white/35 group-hover:text-white/75 group-hover:translate-x-1.5 transition-all duration-300" />
          </a>
        </div>
      </motion.div>

      {/* ── RIGHT: KV Image Carousel ───────────────────────── */}
      {/* Mobile: h-[65vw] fixed (section has no defined height on mobile)
          Desktop: md:h-full fills the md:h-screen parent */}
      <div className="relative overflow-hidden w-full h-[100vw] md:w-[56%] md:h-full md:flex-shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[current].image}
              alt=""
              fill
              className="object-cover object-center"
              priority={current === 0}
              sizes="(max-width: 768px) 100vw, 56vw"
            />
            {/* Left-edge fade → blends into dark panel on desktop */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#140810]/30 via-transparent to-transparent" />
            {/* Bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            {/* Film grain */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
          </motion.div>
        </AnimatePresence>

        {/* Progress indicators */}
        <div className="absolute bottom-5 right-5 z-10 flex gap-3">
          {slides.map((s, i) => (
            <button key={s.id} onClick={() => goTo(i)} aria-label={`第 ${i + 1} 張`}>
              <div className="w-8 h-px overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                {i === current && (
                  <motion.div
                    className="h-full bg-white origin-left"
                    animate={{ scaleX: progress / 100 }}
                    transition={{ duration: 0 }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
