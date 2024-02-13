import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ weight: "400", subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Air Kollage | Home",
  description:
    "Did you ever want to join the circus? Welcome to your hub for circus classes in Montréal. Hoop, silks, pole, burlesque - Oh my!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
