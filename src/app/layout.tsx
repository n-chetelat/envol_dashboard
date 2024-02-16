import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import kollageTheme from "@/libs/theme";

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
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={kollageTheme}> {children} </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
