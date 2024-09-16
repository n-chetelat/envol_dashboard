import createIntlMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "@/libs/i18n";
import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const PUBLIC_PAGES = [
  "/",
  "/:locale",
  "/:locale/sign-in(.*)",
  "/:locale/sign-up(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
];

const i18nMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

const isPublicRoute = createRouteMatcher(PUBLIC_PAGES);

export default clerkMiddleware((auth, request) => {
  if (!auth().userId && !isPublicRoute(request)) {
    auth().protect();
  }

  if (request.url.includes("/api/")) return NextResponse.next();
  return i18nMiddleware(request);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|api/webhooks|api/inngest).*)", "/"],
};
