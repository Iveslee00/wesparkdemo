"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "關於 WIS", href: "/about" },
  { label: "品牌專區", href: "/brands" },
  { label: "最新消息", href: "/news" },
  { label: "聯絡我們", href: "/contact" },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <footer ref={ref} style={{ backgroundColor: "#140810" }}>
      <div className="section-container py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="md:col-span-5"
          >
            <div className="mb-5">
              <Image
                src="/images/home/logo.svg"
                alt="WIS"
                width={140}
                height={50}
                className="w-[110px] h-auto"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.85 }}
              />
            </div>
            <p className="text-[9px] tracking-[0.38em] uppercase mb-5"
               style={{ color: "rgba(255,255,255,0.2)" }}>
              WE SPARK BEAUTY
            </p>
            <p className="text-sm font-light leading-relaxed max-w-xs"
               style={{ color: "rgba(255,255,255,0.32)" }}>
              我們點燃創意、品牌，
              <br />與下一個美妝新浪潮。
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="md:col-span-3"
          >
            <p className="text-[9px] tracking-[0.3em] uppercase mb-5"
               style={{ color: "rgba(255,255,255,0.16)" }}>
              頁面導覽
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-light transition-colors duration-300"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="md:col-span-4"
          >
            <p className="text-[9px] tracking-[0.3em] uppercase mb-5"
               style={{ color: "rgba(255,255,255,0.16)" }}>
              聯絡資訊
            </p>
            <address className="not-italic space-y-3.5 text-sm font-light leading-relaxed"
                     style={{ color: "rgba(255,255,255,0.35)" }}>
              <div>
                <p style={{ color: "rgba(255,255,255,0.55)" }}>華資粧業股份有限公司</p>
                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.22)" }}>
                  HWA TSU COSMETICS CO., LTD.
                </p>
              </div>
              <div className="text-xs leading-5">
                <p>100 台北市中正區寶慶路37號5樓</p>
                <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.2)" }}>
                  5F, No 37, Baoqing Rd, Zhongzheng Dist,
                  Taipei City 100, Taiwan (ROC)
                </p>
              </div>
              <a href="tel:+886223613585"
                 className="block transition-colors duration-300"
                 style={{ color: "rgba(255,255,255,0.35)" }}
                 onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                 onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
                +886 2 23613585 分機 1200
              </a>
            </address>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="section-container py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[9px] tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.16)" }}>
            © {new Date().getFullYear()} 華資粧業股份有限公司 · All rights reserved.
          </p>
          <p className="text-[9px] tracking-[0.28em] uppercase" style={{ color: "rgba(255,255,255,0.1)" }}>
            WE SPARK BEAUTY
          </p>
        </div>
      </div>
    </footer>
  );
}
