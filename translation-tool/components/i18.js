import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./en.json";
import { hi } from "./hi.json";
import { gu } from "./gu.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORE_LANGUAGE_KEY = "settings.lang";

// Language detector plugin
const languageDetectorPlugin = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async function (callback) {
    try {
      const language = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
      if (language) {
        return callback(language); // Return stored language if available
      } else {
        return callback("en"); // Default to English if no language is stored
      }
    } catch (error) {
      console.log("Error reading language", error);
      return callback("en"); // Default to English if error occurs
    }
  },
  cacheUserLanguage: async function (language) {
    try {
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language); // Save the selected language in AsyncStorage
    } catch (error) {
      console.error("Error saving language", error);
    }
  },
};

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  gu: { translation: gu },
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin) // Use the custom language detector
  .init({
    resources,
    fallbackLng: "en", // Default language if detected language is not available
    interpolation: {
      escapeValue: false, // No need for escaping in React
    },
    detection: {
      order: ["custom"], // Use the custom language detection plugin only
      caches: ["localStorage"], // Cache user language in localStorage or cookies if necessary
    },
  });

export default i18n;
