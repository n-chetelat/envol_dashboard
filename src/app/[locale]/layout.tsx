import { clerkTheme } from "@/libs/clerk";
import { getClerkLocale, locales } from "@/libs/i18n";
import { ClerkProvider } from "@clerk/nextjs";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Navbar from "@/components/navbar/navbar/Navbar";
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
    <ClerkProvider
      appearance={clerkTheme}
      localization={getClerkLocale(locale)}
    >
      <html lang={locale}>
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
