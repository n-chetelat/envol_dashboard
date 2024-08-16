import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales, localePrefix } from "@/libs/i18n";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales,
    localePrefix,
  });
