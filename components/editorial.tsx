"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const articles = [
  {
    id: 1,
    category: "趨勢洞察",
    title: "2026 美妝趨勢全解析",
    excerpt: "下一波美妝浪潮以情感、感官與個性為核心，肌膚保養正與文化深度交融。",
    image: "/images/home/07.jpg",
    date: "MAY 2026",
  },
  {
    id: 2,
    category: "品牌策略",
    title: "情感行銷：美妝品牌的新語言",
    excerpt: "最具影響力的美妝品牌，早已不再只是販售產品，而是販售一種感受。",
    image: "/images/home/08.jpg",
    date: "APR 2026",
  },
  {
    id: 3,
    category: "產業觀察",
    title: "現代奢美的下一代定義",
    excerpt: "頂奢美妝正為新世代挑剔消費者，重新定義「奢華」的意義與體驗。",
    image: "/images/home/09.jpg",
    date: "MAR 2026",
  },
  {
    id: 4,
    category: "品牌故事",
    title: "超越商品的美麗哲學",
    excerpt: "藝術、哲學與美妝科學的匯流，正在催生一場深刻的文化運動。",
    image: "/images/home/10.jpg",
    date: "FEB 2026",
  },
];

export default function Editorial() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="py-16 md:py-20 bg-brand-cream">
      <div className="section-container">
        {/* Header */}
        <div
          ref={ref}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label mb-2"
            >
              KOL 分享 · KOL SHOWCASE
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="section-title"
            >
              KOL 分享區
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="text-primary/55 text-sm font-normal italic mt-1"
            >
              KOL Showcase &amp; Insights
            </motion.p>
          </div>
          <motion.a
            href="/news"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group flex items-center gap-1.5 text-xs tracking-[0.22em] uppercase
                       text-secondary hover:text-primary transition-colors duration-300"
          >
            查看更多
            <ArrowUpRight size={12}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </motion.a>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Large article — 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2"
          >
            <ArticleCard article={articles[0]} tall />
          </motion.div>

          {/* Two small articles stacked */}
          <div className="flex flex-col gap-3.5">
            {articles.slice(1, 3).map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.22 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <ArticleCard article={a} />
              </motion.div>
            ))}
          </div>

          {/* Wide bottom article */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3"
          >
            <ArticleCard article={articles[3]} wide />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({
  article,
  tall = false,
  wide = false,
}: {
  article: (typeof articles)[0];
  tall?: boolean;
  wide?: boolean;
}) {
  return (
    <a href="/news" className="group block overflow-hidden">
      <div
        className={`relative overflow-hidden ${
          tall
            ? "aspect-[4/5] md:aspect-auto md:h-[440px]"
            : wide
              ? "aspect-[21/6]"
              : "aspect-[4/3]"
        }`}
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes={tall ? "66vw" : wide ? "100vw" : "33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 transition-colors duration-500" />

        {/* Overlay text for large / wide cards */}
        {(tall || wide) && (
          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
            <p className="text-xs tracking-[0.3em] uppercase text-white/65 mb-2">
              {article.category} · {article.date}
            </p>
            <h3 className={`font-normal text-white leading-tight ${tall ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>
              {article.title}
            </h3>
            {tall && (
              <p className="text-sm text-white/72 mt-2 font-normal leading-relaxed max-w-sm hidden md:block">
                {article.excerpt}
              </p>
            )}
          </div>
        )}

        {/* Arrow */}
        <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/0
                        group-hover:bg-white/90 flex items-center justify-center transition-all duration-400">
          <ArrowUpRight size={13}
            className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Info for small cards */}
      {!tall && !wide && (
        <div className="pt-4">
          <p className="section-label mb-1.5">{article.category} · {article.date}</p>
          <h3 className="text-base font-normal text-primary leading-snug mb-1.5
                         group-hover:text-primary/65 transition-colors duration-300">
            {article.title}
          </h3>
          <p className="text-sm text-primary/62 font-normal leading-relaxed">{article.excerpt}</p>
        </div>
      )}
    </a>
  );
}
