"use client";
import { Menu } from "@/libs/icons";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useTranslations } from "next-intl";

export default function MobileMenuButton() {
  const { toggleSidebar } = useDashboardContext();
  const t = useTranslations("aria");
  return (
    <button
      className="text-gray-700 hover:bg-gray-200"
      onClick={toggleSidebar}
      aria-label={t("toggleMobileMenu")}
    >
      <Menu />
    </button>
  );
}
