import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4B2438",
          light: "#6b3450",
          dark: "#2d1424",
        },
        secondary: {
          DEFAULT: "#8C6A78",
          light: "#a88a98",
          dark: "#6c4a58",
        },
        "brand-bg": "#F5EFE8",
        "brand-cream": "#EDE6DC",
        "brand-dark": "#1a0c12",
      },
      fontFamily: {
        sans: [
          "Helvetica Neue",
          "Helvetica",
          "-apple-system",
          "BlinkMacSystemFont",
          "Arial",
          "sans-serif",
        ],
      },
      letterSpacing: {
        "ultra-wide": "0.35em",
        brand: "0.18em",
        tight: "-0.02em",
      },
      lineHeight: {
        tighter: "0.9",
        hero: "0.95",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        elegant: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
