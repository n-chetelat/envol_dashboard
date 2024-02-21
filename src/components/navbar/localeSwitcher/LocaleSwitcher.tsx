import { useLocale, useTranslations } from "next-intl";
import { locales } from "@/libs/i18n";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export default function LocaleSwitcher() {
  const t = useTranslations("locales");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("localeLabel")}>
      {locales.map((current) => (
        <option key={current} value={current}>
          {t(`${current}`, { locale: current })}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
