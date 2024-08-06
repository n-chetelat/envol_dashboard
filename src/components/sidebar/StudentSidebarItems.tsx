import SidebarItem from "@/components/sidebar/SidebarItem";
import { type TFunction } from "next-intl";

export default function StudentSidebarItems({ t }: { t: TFunction }) {
  return (
    <>
      <SidebarItem href="/dashboard/student/courses" text={t("classes")} />
    </>
  );
}
