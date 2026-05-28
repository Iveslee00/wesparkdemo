"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CampaignBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-15%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ minHeight: "56vh" }}>
      {/* Parallax BG */}
      <motion.div style={{ y }} className="absolute inset-[-8%] z-0">
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(107,52,80,0.92) 0%, rgba(75,36,56,1) 40%, rgba(20,8,16,1) 100%)",
          }}
        />
        <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full blur-[90px]"
             style={{ background: "rgba(200,150,130,0.09)" }} />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
      </motion.div>

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center text-center
                   px-6 py-20 md:py-28 min-h-[56vh]"
      >
        {/* Top line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-px h-10 bg-white/18 mb-9 origin-top"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="text-xs tracking-[0.42em] uppercase text-white/58 mb-8"
        >
          CAMPAIGN 2026
        </motion.p>

        {/* English headline */}
        <div className="overflow-hidden mb-2">
          <motion.h2
            initial={{ y: 60, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-normal tracking-tight leading-none"
            style={{ fontSize: "clamp(22px, 4.2vw, 52px)" }}
          >
            WE DON&apos;T FOLLOW BEAUTY.
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h2
            initial={{ y: 60, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="font-normal tracking-tight leading-none italic"
            style={{ fontSize: "clamp(22px, 4.2vw, 52px)", color: "rgba(255,255,255,1)" }}
          >
            WE IGNITE IT.
          </motion.h2>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a
            href="/brands"
            className="group inline-flex items-center gap-4 px-8 py-3.5 border border-white/20
                       hover:border-white/50 text-white text-xs tracking-[0.28em] uppercase
                       transition-all duration-500 hover:bg-white/5"
          >
            立即探索
            <ArrowRight size={12}
              className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
