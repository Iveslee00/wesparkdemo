"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useLang } from "@/lib/language-context";
import { brandsData } from "@/lib/i18n";

export default function BrandsPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      {brandsData.map((brand, i) => (
        <BrandSection key={brand.id} brand={brand} index={i} />
      ))}
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
      <div className="absolute inset-0">
        <Image
          src="/images/home/06.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-20"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#140810] via-[#140810]/50 to-[#140810]/20" />
      </div>

      <div className="relative z-10 section-container pb-16 md:pb-24 w-full">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[11px] tracking-[0.42em] uppercase mb-5"
          style={{ color: "rgba(168,128,144,0.85)" }}
        >
          {t.brands.heroLabel}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="font-normal text-white leading-none mb-4"
          style={{ fontSize: "clamp(48px, 8vw, 110px)", letterSpacing: "-0.02em" }}
        >
          {t.brands.heroTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-sm italic font-normal max-w-lg"
          style={{ color: "rgba(255,255,255,0.52)" }}
        >
          {t.brands.heroTagline}
        </motion.p>
      </div>
    </section>
  );
}

function BrandSection({
  brand,
  index,
}: {
  brand: (typeof brandsData)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const { lang, t } = useLang();

  const isDark = index % 2 === 1;
  const isReverse = index % 2 === 1;

  const bg = isDark ? "#140810" : "#F5EFE8";
  const textPrimary = isDark ? "rgba(255,255,255,0.92)" : "#4B2438";
  const textMuted = isDark ? "rgba(255,255,255,0.55)" : "rgba(75,36,56,0.58)";
  const textSub = isDark ? "rgba(168,128,144,0.8)" : "rgba(140,106,120,0.9)";
  const dividerColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(75,36,56,0.1)";

  return (
    <section
      ref={ref}
      className="py-0"
      style={{ backgroundColor: bg }}
    >
      <div className="section-container">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch ${
            isReverse ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: isReverse ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative overflow-hidden ${isReverse ? "md:order-2" : "md:order-1"}`}
            style={{ minHeight: "520px" }}
          >
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-cover object-center transition-transform duration-1000 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: isReverse
                  ? "linear-gradient(to right, transparent 60%, " + bg + "20)"
                  : "linear-gradient(to left, transparent 60%, " + bg + "20)",
              }}
            />
            {/* Brand number */}
            <div className="absolute top-6 left-6 z-10">
              <span
                className="text-[11px] tracking-[0.4em] uppercase font-medium"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: isReverse ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col justify-center px-8 py-16 md:px-12 lg:px-16 ${
              isReverse ? "md:order-1" : "md:order-2"
            }`}
          >
            {/* Origin + Founded */}
            <div className="flex items-center gap-4 mb-7">
              <span
                className="text-[10px] tracking-[0.38em] uppercase"
                style={{ color: textSub }}
              >
                {lang === "zh" ? brand.origin.zh : brand.origin.en}
              </span>
              <span
                className="text-[10px]"
                style={{ color: dividerColor }}
              >
                ·
              </span>
              <span
                className="text-[10px] tracking-[0.28em]"
                style={{ color: textMuted }}
              >
                {t.brands.founded} {brand.founded}
              </span>
            </div>

            {/* Brand name */}
            <h2
              className="font-normal leading-none mb-2"
              style={{
                fontSize: "clamp(28px, 4vw, 52px)",
                letterSpacing: "-0.01em",
                color: textPrimary,
              }}
            >
              {brand.name}
            </h2>
            <p
              className="text-base font-normal mb-1"
              style={{ color: textMuted }}
            >
              {brand.zhName}
            </p>

            {/* Divider */}
            <div className="w-10 h-px my-7" style={{ backgroundColor: dividerColor }} />

            {/* Tagline */}
            <p
              className="text-lg font-normal italic mb-5 leading-snug"
              style={{ color: isDark ? "rgba(168,128,144,0.9)" : "#8C6A78" }}
            >
              {lang === "zh" ? brand.tagline.zh : brand.tagline.en}
            </p>

            {/* Description */}
            <p
              className="text-sm font-normal leading-relaxed mb-10"
              style={{ color: textMuted }}
            >
              {lang === "zh" ? brand.desc.zh : brand.desc.en}
            </p>

            {/* CTA */}
            <div className="group inline-flex items-center gap-3 cursor-default w-fit">
              <span
                className="text-[11px] tracking-[0.3em] uppercase border-b pb-0.5 transition-all duration-300"
                style={{
                  color: isDark ? "rgba(255,255,255,0.6)" : "rgba(75,36,56,0.6)",
                  borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(75,36,56,0.2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = isDark ? "rgba(255,255,255,0.9)" : "#4B2438";
                  (e.currentTarget as HTMLElement).style.borderColor = isDark ? "rgba(255,255,255,0.6)" : "#4B2438";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = isDark ? "rgba(255,255,255,0.6)" : "rgba(75,36,56,0.6)";
                  (e.currentTarget as HTMLElement).style.borderColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(75,36,56,0.2)";
                }}
              >
                {t.brands.exploreBrand}
              </span>
              <ArrowRight
                size={12}
                style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(75,36,56,0.5)" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section divider */}
      <div style={{ borderBottom: `1px solid ${dividerColor}` }} />
    </section>
  );
}
