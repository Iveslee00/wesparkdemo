"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} className="py-32 md:py-48 lg:py-56 bg-brand-bg">
      <div className="section-container">
        <div className="max-w-5xl">
          {/* Label */}
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="section-label mb-12 md:mb-16"
          >
            我們的理念 · OUR PHILOSOPHY
          </motion.p>

          {/* 中文主標 */}
          <div className="mb-6 overflow-hidden">
            <motion.h2
              custom={0.12}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-4xl md:text-6xl lg:text-7xl font-normal text-primary leading-[1.15] tracking-tight"
            >
              美不是等待，
              <br />
              <em className="not-italic text-secondary">而是點燃。</em>
            </motion.h2>
          </div>

          {/* 英文副標 */}
          <motion.p
            custom={0.28}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-primary/60 text-lg md:text-xl font-normal italic tracking-wide mb-16 md:mb-20"
          >
            Beauty is not something to wait for. It is something to ignite.
          </motion.p>

          {/* Divider */}
          <motion.div
            custom={0.35}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-10 h-px bg-secondary mb-16 md:mb-20"
          />

          {/* Body copy */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-20">
            <motion.div
              custom={0.45}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4"
            >
              <p className="text-primary/85 text-xl md:text-2xl font-normal leading-relaxed">
                在 WIS，
                <br />
                我們點燃創意與市場之間的火花。
              </p>
              <p className="text-primary/65 text-lg font-normal leading-relaxed">
                在概念與成長之間，
                <br />
                我們創造驅動美麗前行的動能。
              </p>
            </motion.div>

            <motion.div
              custom={0.58}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4"
            >
              <p className="text-primary/85 text-xl md:text-2xl font-normal leading-relaxed">
                WIS 不只是一個名稱，
                <br />
                而是一種行動。
              </p>
              <div className="pt-6">
                <p className="text-[10px] tracking-[0.38em] uppercase text-secondary">
                  WE SPARK BEAUTY
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
