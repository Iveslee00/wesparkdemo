"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { type Lang, translations } from "./i18n";

type LanguageContextType = {
  lang: Lang;
  toggle: () => void;
  t: (typeof translations)["zh"];
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "zh",
  toggle: () => {},
  t: translations.zh,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");
  const toggle = () => setLang((l) => (l === "zh" ? "en" : "zh"));

  return (
    <LanguageContext.Provider value={{ lang, toggle, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
