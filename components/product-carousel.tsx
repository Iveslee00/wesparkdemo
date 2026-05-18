"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    id: 1,
    brand: "SHISEIDO",
    brandZh: "資生堂",
    name: "完美意境水乳霜",
    image: "/images/home/04.jpg",
    link: "https://www.momoshop.com.tw",
  },
  {
    id: 2,
    brand: "IPSA",
    brandZh: "茵芙莎",
    name: "水循環保濕精華",
    image: "/images/home/05.jpg",
    link: "https://www.momoshop.com.tw",
  },
  {
    id: 3,
    brand: "CLÉ DE PEAU",
    brandZh: "肌膚之鑰",
    name: "超輝映精萃",
    image: "/images/home/06.jpg",
    link: "https://shopee.tw",
  },
  {
    id: 4,
    brand: "NARS",
    brandZh: "納斯",
    name: "裸光奇蹟粉底液",
    image: "/images/home/07.jpg",
    link: "https://www.momoshop.com.tw",
  },
  {
    id: 5,
    brand: "LAURA MERCIER",
    brandZh: "蘿拉蜜思",
    name: "完美柔焦蜜粉餅",
    image: "/images/home/08.jpg",
    link: "https://shopee.tw",
  },
  {
    id: 6,
    brand: "bareMinerals",
    brandZh: "裸礦",
    name: "裸光精華粉底",
    image: "/images/home/09.jpg",
    link: "https://www.momoshop.com.tw",
  },
];

export default function ProductCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const scroll = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const firstCard = el.children[0] as HTMLElement;
    if (!firstCard) return;
    /* step = card width + gap (12px) */
    const step = firstCard.offsetWidth + 12;
    el.scrollBy({ left: dir === "right" ? step : -step, behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-18 border-t border-primary/8 bg-brand-bg">
      <div className="section-container">

        {/* Header row */}
        <div ref={ref} className="flex items-end justify-between mb-7">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label mb-1.5"
            >
              商品總覽 · ALL PRODUCTS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="section-title"
            >
              精選商品一覽
            </motion.h2>
          </div>

          {/* Arrow buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex gap-1.5"
          >
            {(["left", "right"] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                className="w-8 h-8 border border-primary/20 flex items-center justify-center
                           hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                aria-label={dir === "left" ? "上一個" : "下一個"}
              >
                {dir === "left"
                  ? <ChevronLeft size={14} className="text-primary/45" />
                  : <ChevronRight size={14} className="text-primary/45" />
                }
              </button>
            ))}
          </motion.div>
        </div>

        {/* Carousel track
            Mobile: 2 cards visible  (w = calc(50% - 6px))
            Desktop: 3 cards visible (w = calc(33.333% - 8px))
            gap-3 = 12px */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.18 }}
        >
          <div
            ref={trackRef}
            className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
          >
            {products.map((product) => (
              <a
                key={product.id}
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                /* Mobile: 2 visible | Desktop: 3 visible */
                className="group flex-none snap-start
                           w-[calc(50%-6px)] md:w-[calc(33.333%-8px)]"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-700
                               group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  {/* Brand badge */}
                  <span className="absolute top-3 left-3 text-[8px] tracking-[0.25em] uppercase text-white/55">
                    {product.brand}
                  </span>
                </div>

                {/* Text */}
                <p className="section-label mb-1">
                  {product.brandZh} · {product.brand}
                </p>
                <p className="text-sm font-light text-primary leading-snug
                              group-hover:text-primary/60 transition-colors duration-300">
                  {product.name}
                </p>
                <span className="inline-block mt-2.5 text-[9px] tracking-[0.2em] uppercase
                                 text-primary/35 border-b border-primary/12 pb-px
                                 group-hover:text-primary/65 group-hover:border-primary/40
                                 transition-all duration-300">
                  了解更多
                </span>
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
