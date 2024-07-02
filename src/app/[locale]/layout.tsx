import { clerkTheme } from "@/libs/clerk";
import { getClerkLocale, locales } from "@/libs/i18n";
import { ClerkProvider } from "@clerk/nextjs";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Navbar from "@/components/navbar/navbar/Navbar";
import "./globals.css";
import { Lato, Baskervville } from "next/font/google";

const lato = Lato({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});

const baskervville = Baskervville({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-serif",
});

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
      <html
        lang={locale}
        className={`${lato.variable} ${baskervville.variable} mono`}
      >
        <body>
          <Navbar />
          <div className="mt-[--navbar-height]">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
