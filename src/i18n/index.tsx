import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as Localization from "expo-localization";
import { en, TranslationKeys } from "./en";
import { ne } from "./ne";
import { Language } from "../types";
import { getLanguage, setLanguage as persistLanguage } from "../storage/settingsStorage";

const dictionaries: Record<Language, TranslationKeys> = { en, ne };

interface LanguageContextValue {
  language: Language;
  t: TranslationKeys;
  setLanguage: (lang: Language) => Promise<void>;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function detectDefaultLanguage(): Language {
  try {
    const locales = Localization.getLocales();
    const code = locales?.[0]?.languageCode;
    if (code === "ne") return "ne";
  } catch (e) {
    return "en";
  }
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await getLanguage();
      setLanguageState(stored ?? detectDefaultLanguage());
      setIsLoading(false);
    })();
  }, []);

  const setLanguage = useCallback(async (lang: Language) => {
    setLanguageState(lang);
    await persistLanguage(lang);
  }, []);

  const value = useMemo(
    () => ({ language, t: dictionaries[language], setLanguage, isLoading }),
    [language, isLoading, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return ctx;
}
