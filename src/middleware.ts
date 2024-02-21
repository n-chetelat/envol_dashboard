import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "@/libs/i18n";

// How to integrate with oter middlewares:
// https://next-intl-docs.vercel.app/docs/routing/middleware#example-auth-js
export default createMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", `/(fr|en)/:path*`],
};
