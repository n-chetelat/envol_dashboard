import SidebarItem from "@/components/sidebar/SidebarItem";
import { type TFunction } from "next-intl";

export default function InstructorSidebarItems({ t }: { t: TFunction }) {
  return (
    <>
      <SidebarItem href="/dashboard/instructor/courses" text={t("classes")} />
    </>
  );
}
