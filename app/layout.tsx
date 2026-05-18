import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "WIS — WE SPARK BEAUTY",
  description:
    "WIS is a premium beauty brand agency. We spark ideas between creativity and market. 華資粧業股份有限公司 | HWA TSU COSMETICS CO., LTD.",
  keywords: [
    "WIS",
    "beauty",
    "cosmetics",
    "brand",
    "Taiwan",
    "premium",
    "WE SPARK BEAUTY",
    "華資粧業",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className={notoSansTC.variable}>
      <body className="antialiased bg-brand-bg font-sans">{children}</body>
    </html>
  );
}
