"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useLang } from "@/lib/language-context";

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StorySection />
      <PhilosophySection />
      <HeritageSection />
      <Footer />
    </main>
  );
}

function HeroSection() {
  const { t } = useLang();

  return (
    <section
      className="relative flex items-end min-h-[68vh] pt-[72px]"
      style={{ backgroundColor: "#140810" }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/02.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-25"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#140810] via-[#140810]/60 to-[#140810]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#140810]/70 to-transparent" />
      </div>

      <div className="relative z-10 section-container pb-16 md:pb-24 w-full">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[11px] tracking-[0.42em] uppercase mb-6"
          style={{ color: "rgba(168,128,144,0.85)" }}
        >
          {t.about.heroLabel}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="font-normal text-white leading-none mb-4"
          style={{ fontSize: "clamp(52px, 9vw, 120px)", letterSpacing: "-0.02em" }}
        >
          {t.about.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-sm tracking-[0.15em] mb-2"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {t.about.heroSub}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="text-base font-normal italic"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          {t.about.heroTagline}
        </motion.p>

      </div>
    </section>
  );
}

function StorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { t } = useLang();

  return (
    <section className="py-20 md:py-32 bg-brand-bg" ref={ref}>
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label mb-4"
            >
              {t.about.storyLabel}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="section-title mb-8"
            >
              {t.about.storyTitle}
            </motion.h2>

            {[t.about.storyP1, t.about.storyP2, t.about.storyP3].map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.2 + i * 0.1 }}
                className="text-primary/72 font-normal leading-relaxed mb-5 text-[15px]"
              >
                {p}
              </motion.p>
            ))}

            {/* Decorative divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-px w-16 mt-8 bg-secondary/40"
            />
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/home/03.jpg"
                alt="Brand Story"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            {/* Year badge */}
            <div
              className="absolute -bottom-5 -left-5 w-24 h-24 flex flex-col items-center justify-center"
              style={{ backgroundColor: "#4B2438" }}
            >
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/50 block">Est.</span>
              <span className="text-2xl font-normal text-white/90 tracking-tight">1985</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { t, lang } = useLang();

  return (
    <section
      ref={ref}
      className="py-20 md:py-32"
      style={{ backgroundColor: "#140810" }}
    >
      <div className="section-container">
        <div className="mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.4em] uppercase mb-4"
            style={{ color: "rgba(168,128,144,0.8)" }}
          >
            {t.about.philosophyLabel}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-normal text-white leading-snug mb-2"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            {t.about.philosophyTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm italic"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            {t.about.philosophySub}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
          {t.about.values.map((val, i) => (
            <motion.div
              key={val.en}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group p-8 md:p-12 relative overflow-hidden"
              style={{ backgroundColor: "#140810" }}
            >
              {/* Hover bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ backgroundColor: "rgba(75,36,56,0.25)" }}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="text-[10px] tracking-[0.4em] uppercase"
                    style={{ color: "rgba(168,128,144,0.7)" }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="text-xs tracking-[0.35em] uppercase"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    {val.en}
                  </span>
                </div>
                <h3
                  className="font-normal text-white mb-4 leading-none"
                  style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.01em" }}
                >
                  {lang === "zh" ? val.zh : val.en}
                </h3>
                <p
                  className="text-sm font-normal leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.58)" }}
                >
                  {val.desc}
                </p>
              </div>
              {/* Bottom line expand */}
              <div
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
                style={{ backgroundColor: "rgba(168,128,144,0.5)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeritageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { t } = useLang();

  return (
    <section ref={ref} className="py-20 md:py-28 bg-brand-cream">
      <div className="section-container">
        <div className="text-center mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label mb-3"
          >
            {t.about.heritageLabel}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="section-title"
          >
            {t.about.heritageTitle}
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {t.about.stats.map((stat, i) => (
            <motion.div
              key={stat.num}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p
                className="font-normal text-primary leading-none mb-3"
                style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.02em" }}
              >
                {stat.num}
              </p>
              <div className="w-5 h-px mx-auto mb-3 bg-secondary/40" />
              <p className="text-xs tracking-[0.22em] uppercase text-primary/55 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
