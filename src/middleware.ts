import createIntlMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "@/libs/i18n";
import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

const PUBLIC_PAGES = [
  "/:locale",
  "/:locale/sign-in",
  "/:locale/sign-up",
  "/sing-in",
];

const i18nMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

// Details of auth middleware:
// https://clerk.com/docs/references/nextjs/auth-middleware
export default authMiddleware({
  publicRoutes: PUBLIC_PAGES,
  beforeAuth: (request) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return i18nMiddleware(request);
  },
  afterAuth(auth, request, event) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: request.url });
    }
    // TODO: Handle redirecting users by profile type here
    // Store profile metadata on user's side:
    // https://clerk.com/docs/users/metadata
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
