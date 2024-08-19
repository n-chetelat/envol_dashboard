import SidebarItem from "@/components/sidebar/SidebarItem";
import { Shapes, Gauge } from "lucide-react";

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
        href="/dashboard"
        text={t("dashboard")}
        icon={<Gauge />}
        isExpanded={isExpanded}
        onClick={onClick}
      />
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
