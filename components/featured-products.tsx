"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const products = [
  {
    id: 1,
    brand: "SHISEIDO",
    brandZh: "資生堂",
    name: "Vital Perfection 全效抗痕乳霜",
    tagline: "無齡光感的藝術。",
    image: "/images/home/04.jpg",
    link: "https://www.momoshop.com.tw",
  },
  {
    id: 2,
    brand: "IPSA",
    brandZh: "茵芙莎",
    name: "水循環保濕精華液",
    tagline: "肌膚與水的全新對話。",
    image: "/images/home/05.jpg",
    link: "https://www.momoshop.com.tw",
  },
  {
    id: 3,
    brand: "CLÉ DE PEAU BEAUTÉ",
    brandZh: "肌膚之鑰",
    name: "光燦精萃 Le Sérum",
    tagline: "光彩，無所不在。",
    image: "/images/home/06.jpg",
    link: "https://shopee.tw",
  },
];

export default function FeaturedProducts() {
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
              精選商品 · SELECTED PRODUCTS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="section-title"
            >
              嚴選美妝精品
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-primary/55 text-sm font-normal italic mt-1"
            >
              Curated Beauty Picks
            </motion.p>
          </div>
          <motion.a
            href="/brands"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="group flex items-center gap-1.5 text-[13px] tracking-[0.22em] uppercase
                       text-secondary hover:text-primary transition-colors duration-300"
          >
            查看全部
            <ArrowUpRight size={12}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </motion.a>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {/* Large card — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2"
          >
            <ProductCard product={products[0]} tall />
          </motion.div>

          {/* Two smaller cards stacked */}
          <div className="flex flex-col gap-4">
            {products.slice(1).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.22 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  tall = false,
}: {
  product: (typeof products)[0];
  tall?: boolean;
}) {
  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden"
    >
      <div className={`relative overflow-hidden ${tall ? "aspect-[3/4] md:aspect-[4/5]" : "aspect-[4/3]"}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes={tall ? "66vw" : "33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
        <span className="absolute top-4 left-4 text-xs tracking-[0.28em] uppercase text-white/65">
          {product.brand}
        </span>
        <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/0
                        group-hover:bg-white/88 flex items-center justify-center transition-all duration-400">
          <ArrowUpRight size={13}
            className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/16 transition-colors duration-500" />
      </div>

      <div className="pt-4">
        <p className="section-label mb-1">{product.brandZh} · {product.brand}</p>
        <h3 className="text-base font-normal text-primary leading-snug mb-1
                       group-hover:text-primary/65 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-primary/60 font-normal italic">{product.tagline}</p>
        <span className="inline-block mt-3 text-xs tracking-[0.22em] uppercase
                         text-primary/55 border-b border-primary/20 pb-px
                         group-hover:text-primary group-hover:border-primary/55
                         transition-all duration-300">
          了解更多
        </span>
      </div>
    </a>
  );
}
