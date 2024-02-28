import { Link } from "@/libs/navigation";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("home");
  const ta = useTranslations("auth");
  return (
    <main>
      <h1>Kollage</h1>
      <h2>{t("subtitle")}</h2>
      <div>
        <Link href="/signup">{ta("signup")}</Link>
        <Link href="/login">{ta("login")}</Link>
      </div>
    </main>
  );
}
