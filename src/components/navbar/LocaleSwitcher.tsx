"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/libs/navigation";
import { locales, defaultLocale } from "@/libs/i18n";

export default function LocaleSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const otherLocaleValue =
    locales.find((loc) => loc !== locale) || defaultLocale;
  const otherLocaleLabel = t("locales.localeOther");

  function handleOnClick() {
    router.replace(pathname, { locale: otherLocaleValue });
  }

  return (
    <nav
      aria-label={t("aria.languageNavLabel")}
      className="flex font-serif text-xl text-white"
    >
      <button
        onClick={handleOnClick}
        aria-label={`${t("aria.switchTo")}: ${otherLocaleLabel}`}
        lang={otherLocaleValue}
        title={`${t("aria.switchTo")}: ${otherLocaleLabel}`}
      >
        <span aria-hidden="true">{otherLocaleLabel}</span>
        <span className="sr-only">
          {`${t("aria.currentLocale")}: ${locale}. ${t("aria.switchTo")}: ${otherLocaleLabel}`}
        </span>
      </button>
    </nav>
  );
}
