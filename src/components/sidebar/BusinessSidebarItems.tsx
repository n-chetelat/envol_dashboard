import SidebarItem from "@/components/sidebar/SidebarItem";
import { type TFunction } from "next-intl";
import { Shapes, Settings } from "@/libs/icons";

export default function BusinessSidebarItems({
  t,
  isExpanded,
}: {
  t: TFunction;
  isExpanded: boolean;
}) {
  return (
    <>
      <SidebarItem
        href="/dashboard/business/courses"
        text={t("classes")}
        icon={<Shapes />}
        isExpanded={isExpanded}
      />
      <SidebarItem
        href="/dashboard/business/settings"
        text={t("settings")}
        icon={<Settings />}
        isExpanded={isExpanded}
      />
    </>
  );
}
