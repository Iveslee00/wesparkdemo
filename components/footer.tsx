"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/language-context";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  const { t } = useLang();

  const navLinks = [
    { label: t.nav.about, href: "/about" },
    { label: t.nav.brands, href: "/brands" },
    { label: t.nav.news, href: "/news" },
    { label: t.nav.contact, href: "/contact" },
  ];

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
            <p className="text-xs tracking-[0.38em] uppercase mb-5"
               style={{ color: "#a88090" }}>
              WE SPARK BEAUTY
            </p>
            <p className="text-base font-normal leading-relaxed max-w-xs"
               style={{ color: "#ddd0cc" }}>
              {t.footer.tagline}
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="md:col-span-3"
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-5"
               style={{ color: "#a88090" }}>
              {t.footer.nav}
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base font-normal transition-colors duration-300"
                    style={{ color: "#ddd0cc" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#ddd0cc")}
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
            <p className="text-xs tracking-[0.3em] uppercase mb-5"
               style={{ color: "#a88090" }}>
              {t.footer.contactInfo}
            </p>
            <address className="not-italic space-y-3.5 text-base font-normal leading-relaxed"
                     style={{ color: "#ddd0cc" }}>
              <div>
                <p style={{ color: "#ffffff" }}>華資粧業股份有限公司</p>
                <p className="text-xs" style={{ color: "#ddd0cc" }}>
                  HWA TSU COSMETICS CO., LTD.
                </p>
              </div>
              <div className="text-xs leading-5">
                <p style={{ color: "#ddd0cc" }}>100 台北市中正區寶慶路37號5樓</p>
                <p className="text-xs mt-0.5" style={{ color: "#ddd0cc" }}>
                  5F, No 37, Baoqing Rd, Zhongzheng Dist,
                  Taipei City 100, Taiwan (ROC)
                </p>
              </div>
              <a href="tel:+886223613585"
                 className="block transition-colors duration-300"
                 style={{ color: "#ddd0cc" }}
                 onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                 onMouseLeave={(e) => (e.currentTarget.style.color = "#ddd0cc")}>
                +886 2 23613585
              </a>
            </address>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="section-container py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs tracking-[0.18em]" style={{ color: "rgba(221,208,204,0.5)" }}>
            © {new Date().getFullYear()} 華資粧業股份有限公司 · All rights reserved.
          </p>
          <p className="text-xs tracking-[0.28em] uppercase" style={{ color: "rgba(168,128,144,0.6)" }}>
            WE SPARK BEAUTY
          </p>
        </div>
      </div>
    </footer>
  );
}
