import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en.json";
import ar from "./ar.json";
import es from "./es.json";

const options = {
  order: ["localStorage", "navigator"],
  lookupLocalStorage: "i18nextLng",
  caches: ["localStorage"],
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: options,

    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
      es: {
        translation: es,
      },
    },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export const changeLanguage = (lng: "ar" | "en" | "es") => {
  i18n.changeLanguage(lng);
};

export default i18n;
