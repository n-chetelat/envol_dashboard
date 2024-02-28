import { locales } from "@/libs/i18n";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import "./globals.css";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("mainLayout.title"),
    description: t("mainLayout.description"),
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
