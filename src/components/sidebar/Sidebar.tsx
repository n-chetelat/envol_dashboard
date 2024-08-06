"use client";

import { useTranslations } from "next-intl";
import useProfileType from "@/hooks/useProfileType";
import { Profile } from "@prisma/client";
import SidebarItem from "@/components/sidebar/SidebarItem";
import BusinessSidebarItems from "@/components/sidebar/BusinessSidebarItems";
import InstructorSidebarItems from "@/components/sidebar/InstructorSidebarItems";
import StudentSidebarItems from "@/components/sidebar/StudentSidebarItems";
import { Gauge } from "@/libs/icons";

export default function Sidebar({ profile }: { profile: Profile }) {
  const { profileType } = useProfileType(profile);
  const t = useTranslations("dashboard");
  const ta = useTranslations("aria");

  const getProfileSidebar = () => {
    switch (profileType) {
      case "business":
        return <BusinessSidebarItems t={t} />;
      case "instructor":
        return <InstructorSidebarItems t={t} />;
      case "student":
        return <StudentSidebarItems t={t} />;
      default:
        return null;
    }
  };

  return (
    <nav
      className="flex h-full flex-col bg-slate-100"
      aria-label={ta("dashboardNavigation")}
      role="navigation"
    >
      {profile && (
        <SidebarItem href="/dashboard" text={t("dashboard")} icon={<Gauge />} />
      )}
      {getProfileSidebar()}
    </nav>
  );
}
