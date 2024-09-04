import SidebarItem from "@/components/sidebar/SidebarItem";
import { Shapes, Settings, Gauge, CircleUserRound } from "@/libs/icons";
import { useTranslations } from "next-intl";

export default function BusinessSidebarItems() {
  const t = useTranslations("dashboard");
  return (
    <>
      <SidebarItem href="/dashboard" text={t("dashboard")} icon={<Gauge />} />
      <SidebarItem
        href="/dashboard/profile"
        text={t("profile")}
        icon={<CircleUserRound />}
      />
      <SidebarItem
        href="/dashboard/business/courses"
        text={t("classes")}
        icon={<Shapes />}
      />
      <SidebarItem
        href="/dashboard/business/settings"
        text={t("settings")}
        icon={<Settings />}
      />
    </>
  );
}
