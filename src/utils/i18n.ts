import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationPl from "../translations/pl/translations.json";
import translationEn from "../translations/en/translations.json";

export const resources = {
  en: {
    translation: translationEn,
  },
  pl: {
    translation: translationPl,
  },
} as const;

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: "pl",
});
