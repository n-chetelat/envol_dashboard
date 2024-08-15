import SidebarItem from "@/components/sidebar/SidebarItem";
import { Shapes } from "lucide-react";

export default function InstructorSidebarItems({
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
        href="/dashboard/instructor/courses"
        text={t("classes")}
        icon={<Shapes />}
        isExpanded={isExpanded}
        onClick={onClick}
      />
    </>
  );
}
