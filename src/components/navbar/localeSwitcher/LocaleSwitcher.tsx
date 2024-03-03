import { useLocale, useTranslations } from "next-intl";
import { locales, defaultLocale } from "@/libs/i18n";
import LocaleSwitcherButton from "./LocaleSwitcherButton";

export default function LocaleSwitcher() {
  const t = useTranslations("locales");
  const locale = useLocale();
  const otherLocaleValue =
    locales.find((loc) => {
      return loc !== locale;
    }) || defaultLocale;

  return (
    <div className="flex">
      <LocaleSwitcherButton
        otherLocaleLabel={t("localeOther")}
        otherLocaleValue={otherLocaleValue}
      ></LocaleSwitcherButton>
    </div>
  );
}
