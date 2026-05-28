"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useLang } from "@/lib/language-context";
import { newsArticles } from "@/lib/i18n";

export default function NewsPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ArticleGrid />
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
          src="/images/home/10.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-18"
          priority
          sizes="100vw"
          style={{ opacity: 0.18 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#140810] via-[#140810]/55 to-transparent" />
      </div>

      <div className="relative z-10 section-container pb-16 md:pb-24 w-full">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[11px] tracking-[0.42em] uppercase mb-5"
          style={{ color: "rgba(168,128,144,0.85)" }}
        >
          {t.news.heroLabel}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="font-normal text-white leading-none mb-3"
          style={{ fontSize: "clamp(48px, 8vw, 110px)", letterSpacing: "-0.02em" }}
        >
          {t.news.heroTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-sm italic"
          style={{ color: "rgba(255,255,255,0.42)" }}
        >
          {t.news.heroSub}
        </motion.p>
      </div>
    </section>
  );
}

function ArticleGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  const { t, lang } = useLang();
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = t.news.categories;

  const filtered =
    activeCategory === 0
      ? newsArticles
      : newsArticles.filter((a) => {
          const cat = lang === "zh" ? a.category.zh : a.category.en;
          return cat === categories[activeCategory];
        });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-brand-bg">
      <div className="section-container">
        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-2 mb-12 md:mb-16"
        >
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(i)}
              className="text-[11px] tracking-[0.28em] uppercase px-4 py-2 border transition-all duration-300"
              style={{
                borderColor: activeCategory === i ? "#4B2438" : "rgba(75,36,56,0.2)",
                color: activeCategory === i ? "#F5EFE8" : "rgba(75,36,56,0.6)",
                backgroundColor: activeCategory === i ? "#4B2438" : "transparent",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Articles grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-14"
          >
            {filtered.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <ArticleCard article={article} lang={lang} readMore={t.news.readMore} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-primary/40 text-sm tracking-[0.2em]">— no articles —</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ArticleCard({
  article,
  lang,
  readMore,
}: {
  article: (typeof newsArticles)[0];
  lang: "zh" | "en";
  readMore: string;
}) {
  return (
    <article className="group cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] mb-5">
        <Image
          src={article.image}
          alt={lang === "zh" ? article.title.zh : article.title.en}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
        <div
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center
                     bg-white/0 group-hover:bg-white/90 transition-all duration-400"
        >
          <ArrowUpRight
            size={14}
            className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-3">
        <span className="section-label">
          {lang === "zh" ? article.category.zh : article.category.en}
        </span>
        <span className="text-primary/25 text-xs">·</span>
        <span className="text-[11px] tracking-[0.22em] text-primary/40">{article.date}</span>
      </div>

      {/* Title */}
      <h3
        className="text-lg font-normal text-primary leading-snug mb-3
                   group-hover:text-primary/65 transition-colors duration-300"
      >
        {lang === "zh" ? article.title.zh : article.title.en}
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-primary/58 font-normal leading-relaxed mb-4">
        {lang === "zh" ? article.excerpt.zh : article.excerpt.en}
      </p>

      {/* Read more */}
      <span
        className="text-[11px] tracking-[0.28em] uppercase text-secondary/70
                   group-hover:text-secondary transition-colors duration-300 inline-flex items-center gap-1.5"
      >
        {readMore}
        <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
      </span>

      {/* Bottom line */}
      <div className="mt-5 h-px bg-primary/10 w-full" />
    </article>
  );
}
