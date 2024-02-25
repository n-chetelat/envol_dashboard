import createIntlMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "@/libs/i18n";
import { NextRequest } from "next/server";

const i18nMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

export function middleware(request: NextRequest) {
  return i18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
