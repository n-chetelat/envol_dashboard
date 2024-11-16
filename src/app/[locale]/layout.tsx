import { clerkTheme } from "@/libs/clerk";
import { getClerkLocale } from "@/libs/i18n";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { Lato, Baskervville } from "next/font/google";
import CustomToastContainer from "@/components/toast/CustomToastContainer";
import "./globals.css";

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

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <ClerkProvider
      appearance={clerkTheme}
      localization={getClerkLocale(locale)}
    >
      <NextIntlClientProvider messages={messages}>
        <html
          lang={locale}
          className={`${lato.variable} ${baskervville.variable} mono`}
        >
          <body>
            {children}
            <CustomToastContainer />
          </body>
        </html>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
