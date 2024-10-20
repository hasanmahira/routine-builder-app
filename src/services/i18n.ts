import { getString, setString } from "@nativescript/core/application-settings";

const DEFAULT_LANGUAGE = "en";
const LANGUAGE_KEY = "app_language";

export const setLanguage = (languageCode: string) => {
  setString(LANGUAGE_KEY, languageCode);
};

export const getLanguage = (): string => {
  return getString(LANGUAGE_KEY, DEFAULT_LANGUAGE);
};

export const translate = (key: string): string => {
  const language = getLanguage();
  const translations = require(`../i18n/${language}.json`);
  const keys = key.split(".");
  let value = translations;
  for (const k of keys) {
    value = value[k];
    if (!value) break;
  }
  return value || key;
};