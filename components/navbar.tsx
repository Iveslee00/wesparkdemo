"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/language-context";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggle, t } = useLang();

  const navLinks = [
    { label: t.nav.about, href: "/about" },
    { label: t.nav.brands, href: "/brands" },
    { label: t.nav.news, href: "/news" },
    { label: t.nav.contact, href: "/contact" },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
        style={{ backgroundColor: "#4B2438" }}
      >
        <div className="section-container flex items-center justify-between py-3.5">
          {/* Logo */}
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image
              src="/images/home/logo.svg"
              alt="WIS"
              width={140}
              height={50}
              priority
              className="w-[88px] md:w-[128px] h-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-[0.2em] text-white hover:text-white/70 transition-colors duration-300 hover-line"
              >
                {link.label}
              </Link>
            ))}

            {/* Language toggle */}
            <button
              onClick={toggle}
              className="text-xs tracking-[0.25em] font-medium transition-colors duration-300 border border-white/25 rounded-sm px-2.5 py-1 hover:border-white/60 hover:text-white text-white/70"
              aria-label="Switch language"
            >
              {lang === "zh" ? "EN" : "中文"}
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggle}
              className="text-[10px] tracking-[0.22em] font-medium border border-white/25 rounded-sm px-2 py-0.5 text-white/65 hover:text-white hover:border-white/50 transition-colors"
            >
              {lang === "zh" ? "EN" : "中"}
            </button>
            <button
              className="text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="開啟選單"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ backgroundColor: "#4B2438" }}
          >
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10">
              <Image
                src="/images/home/logo.svg"
                alt="WIS"
                width={80}
                height={28}
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-10 gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-normal text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-10 pb-10 flex items-center justify-between">
              <p className="text-[9px] tracking-[0.35em] uppercase text-white/25">
                WE SPARK BEAUTY
              </p>
              <button
                onClick={toggle}
                className="text-xs tracking-[0.22em] border border-white/25 rounded-sm px-3 py-1 text-white/55 hover:text-white hover:border-white/50 transition-colors"
              >
                {lang === "zh" ? "ENGLISH" : "中文"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
