import SidebarItem from "@/components/sidebar/SidebarItem";
import { type TFunction } from "next-intl";
import { Shapes, Settings } from "@/libs/icons";

export default function BusinessSidebarItems({
  t,
  isExpanded,
  onClick,
}: {
  t: TFunction;
  isExpanded: boolean;
  onClick: () => void;
}) {
  return (
    <>
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
