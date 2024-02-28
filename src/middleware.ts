import createIntlMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "@/libs/i18n";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/libs/auth";

const PUBLIC_PAGES = ["/", "/login", "/signup", "forgot-password"];

const i18nMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

const authMiddleware = auth((request) => {
  const pathSections = request.nextUrl.pathname.split("/").slice(1); // remove extra empty string
  const unlocalizedUrl = pathSections.slice(1).join("/");
  if (PUBLIC_PAGES.includes(`/${unlocalizedUrl}`)) {
    return i18nMiddleware(request);
  }
  if (request.auth && request.auth.user) {
    return i18nMiddleware(request);
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
});

export function middleware(request: NextRequest) {
  return authMiddleware(request, {});
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
