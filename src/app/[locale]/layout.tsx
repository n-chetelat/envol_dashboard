import { clerkTheme } from "@/libs/clerk";
import { getClerkLocale, locales } from "@/libs/i18n";
import { ClerkProvider } from "@clerk/nextjs";
import { Lato, Baskervville } from "next/font/google";
import CustomToastContainer from "@/components/toast/CustomToastContainer";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css"; // Keep it last so it overrides other CSS styles

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

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
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
          {children}
          <CustomToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
