import SidebarItem from "@/components/sidebar/SidebarItem";
import { Shapes, Gauge, CircleUserRound } from "lucide-react";
import { useTranslations } from "next-intl";

export default function InstructorSidebarItems() {
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
        href="/dashboard/instructor/courses"
        text={t("classes")}
        icon={<Shapes />}
      />
    </>
  );
}
