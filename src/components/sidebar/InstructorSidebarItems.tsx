import SidebarItem from "@/components/sidebar/SidebarItem";
import { type TFunction } from "next-intl";

export default function InstructorSidebarItems({
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
        href="/dashboard/instructor/courses"
        text={t("classes")}
        icon={<Shapes />}
        isExpanded={isExpanded}
        onClick={onClick}
      />
    </>
  );
}
