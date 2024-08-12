import SidebarItem from "@/components/sidebar/SidebarItem";
import { type TFunction } from "next-intl";

export default function StudentSidebarItems({
  t,
  isExpanded,
}: {
  t: TFunction;
  isExpanded: boolean;
}) {
  return (
    <>
      <SidebarItem
        href="/dashboard/student/courses"
        text={t("classes")}
        icon={<Shapes />}
        isExpanded={isExpanded}
      />
    </>
  );
}
