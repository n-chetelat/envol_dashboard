import SidebarItem from "@/components/sidebar/SidebarItem";
import { type TFunction } from "next-intl";

export default function InstructorSidebarItems({
  t,
  isExpanded,
}: {
  t: TFunction;
  isExpanded: boolean;
}) {
  return (
    <>
      <SidebarItem
        href="/dashboard/instructor/courses"
        text={t("classes")}
        icon={<Shapes />}
        isExpanded={isExpanded}
      />
    </>
  );
}
