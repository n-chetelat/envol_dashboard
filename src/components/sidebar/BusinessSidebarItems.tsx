import SidebarItem from "@/components/sidebar/SidebarItem";
import { Shapes, Settings, Gauge } from "@/libs/icons";

export default function BusinessSidebarItems({
  t,
  isExpanded,
  onClick,
}: {
  t: Function;
  isExpanded: boolean;
  onClick: () => void;
}) {
  return (
    <>
      <SidebarItem
        href="/dashboard/business"
        text={t("dashboard")}
        icon={<Gauge />}
        isExpanded={isExpanded}
        onClick={onClick}
      />
      <SidebarItem
        href="/dashboard/business/courses"
        text={t("classes")}
        icon={<Shapes />}
        isExpanded={isExpanded}
        onClick={onClick}
      />
      <SidebarItem
        href="/dashboard/business/settings"
        text={t("settings")}
        icon={<Settings />}
        isExpanded={isExpanded}
        onClick={onClick}
      />
    </>
  );
}
