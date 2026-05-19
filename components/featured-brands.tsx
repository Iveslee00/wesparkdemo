"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const brands = [
  { name: "SHISEIDO", zh: "資生堂", origin: "日本 Japan" },
  { name: "IPSA", zh: "茵芙莎", origin: "日本 Japan" },
  { name: "CLÉ DE PEAU", zh: "肌膚之鑰", origin: "日本 · 法國" },
  { name: "NARS", zh: "納斯", origin: "法國 France" },
  { name: "LAURA MERCIER", zh: "蘿拉蜜思", origin: "法國 France" },
  { name: "bareMinerals", zh: "裸礦", origin: "美國 U.S.A." },
];

export default function FeaturedBrands() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="py-16 md:py-20 bg-brand-bg">
      <div className="section-container">
        {/* Header */}
        <div ref={ref} className="max-w-xl mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label mb-2"
          >
            代理品牌 · FEATURED BRANDS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="section-title mb-2"
          >
            引領趨勢的美妝品牌
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="text-primary/55 text-sm font-normal italic mb-5"
          >
            Brands That Spark Influence
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-primary/72 font-normal text-base leading-relaxed"
          >
            嚴選能引領趨勢、塑造文化，
            並定義現代美麗生活方式的代理品牌。
          </motion.p>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <BrandItem brand={brand} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandItem({ brand }: { brand: { name: string; zh: string; origin: string } }) {
  return (
    <div className="group border-t border-primary/15 py-6 md:py-7 md:pr-8 cursor-default">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-normal text-primary/72 tracking-wide
                         group-hover:text-primary transition-colors duration-500">
            {brand.name}
          </h3>
          <p className="text-base text-primary/55 mt-0.5 font-normal">{brand.zh}</p>
        </div>
        <span className="text-[11px] tracking-[0.2em] uppercase text-primary/45 mt-1.5
                         group-hover:text-secondary transition-colors duration-500">
          {brand.origin}
        </span>
      </div>
      <div className="mt-3 h-px bg-secondary/0 group-hover:bg-secondary/35 w-0 group-hover:w-full transition-all duration-500" />
    </div>
  );
}
