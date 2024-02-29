import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { enUS, frFR } from "@clerk/localizations";

export const defaultLocale = "en";
export const locales = [defaultLocale, "fr"];
export const localePrefix = "always";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`@/translations/${locale}.json`)).default,
  };
});

// Clerk auth localization
export const getClerkLocale = (locale: string) => {
  const authLocales: any = {
    en: enUS,
    fr: frFR,
  };
  return authLocales[locale];
};
