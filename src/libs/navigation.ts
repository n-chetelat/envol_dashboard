import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales, localePrefix } from "@/libs/i18n";

export const { Link, redirect, permanentRedirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales,
    localePrefix,
  });
