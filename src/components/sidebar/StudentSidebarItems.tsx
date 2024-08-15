import SidebarItem from "@/components/sidebar/SidebarItem";
import { Shapes } from "lucide-react";

export default function StudentSidebarItems({
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
        href="/dashboard/student/courses"
        text={t("classes")}
        icon={<Shapes />}
        isExpanded={isExpanded}
        onClick={onClick}
      />
    </>
  );
}
