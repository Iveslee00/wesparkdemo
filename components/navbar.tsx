"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "關於 WIS", href: "/about" },
  { label: "品牌專區", href: "/brands" },
  { label: "最新消息", href: "/news" },
  { label: "聯絡我們", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
                className="text-[11px] tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300 hover-line"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile trigger */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="開啟選單"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
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
                    className="text-2xl font-light text-white/75 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <p className="px-10 pb-10 text-[9px] tracking-[0.35em] uppercase text-white/25">
              WE SPARK BEAUTY
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
