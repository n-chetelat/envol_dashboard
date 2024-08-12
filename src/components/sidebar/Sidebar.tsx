"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import useProfileType from "@/hooks/useProfileType";
import { Profile } from "@prisma/client";
import SidebarItem from "@/components/sidebar/SidebarItem";
import BusinessSidebarItems from "@/components/sidebar/BusinessSidebarItems";
import InstructorSidebarItems from "@/components/sidebar/InstructorSidebarItems";
import StudentSidebarItems from "@/components/sidebar/StudentSidebarItems";
import { Gauge } from "@/libs/icons";
import SidebarToggle from "@/components/sidebar/SidebarToggle";

export default function Sidebar({ profile }: { profile: Profile }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { profileType } = useProfileType(profile);
  const t = useTranslations("dashboard");
  const ta = useTranslations("aria");

  const getProfileSidebar = () => {
    const Component = profileSidebarMap[profileType] || null;
    return Component && <Component t={t} isExpanded={isExpanded} />;
  };

  const profileSidebarMap = {
    business: BusinessSidebarItems,
    instructor: InstructorSidebarItems,
    student: StudentSidebarItems,
  };

  return (
    <>
      <nav
        className={`fixed top-0 bg-slate-100 transition-all duration-300 ease-in-out
          ${isExpanded ? "w-64" : "w-16"}
          z-50 h-full lg:relative lg:left-0`}
        aria-label={ta("dashboardNavigation")}
        role="navigation"
      >
        <div className="relative h-full">
          {profile && (
            <SidebarItem
              href="/dashboard"
              text={t("dashboard")}
              icon={<Gauge />}
              isExpanded={isExpanded}
            />
          )}
          {getProfileSidebar()}
          <div className="hidden lg:block">
            <SidebarToggle
              isExpanded={isExpanded}
              onClick={() => setIsExpanded(!isExpanded)}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
