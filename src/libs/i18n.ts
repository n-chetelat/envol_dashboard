import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const defaultLocale = "en";
export const locales = [defaultLocale, "fr"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`@/translations/${locale}.json`)).default,
  };
});
