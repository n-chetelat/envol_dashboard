"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import useProfileType from "@/hooks/useProfileType";
import { Profile } from "@prisma/client";
import SidebarItem from "@/components/sidebar/SidebarItem";
import BusinessSidebarItems from "@/components/sidebar/BusinessSidebarItems";
import InstructorSidebarItems from "@/components/sidebar/InstructorSidebarItems";
import StudentSidebarItems from "@/components/sidebar/StudentSidebarItems";
import { Gauge } from "@/libs/icons";
import SidebarToggle from "@/components/sidebar/SidebarToggle";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./../../../tailwind.config.js";

interface SidebarProps {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ profile, isOpen, onClose }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { profileType } = useProfileType(profile);
  const t = useTranslations("dashboard");
  const ta = useTranslations("aria");
  const fullTailwindConfig = resolveConfig(tailwindConfig);
  const lgBreakpoint = parseInt(fullTailwindConfig.theme.screens.lg);

  const getProfileSidebar = () => {
    const Component = profileSidebarMap[profileType] || null;
    return (
      Component && (
        <Component t={t} isExpanded={isExpanded} onClick={handleItemClick} />
      )
    );
  };

  const profileSidebarMap = {
    business: BusinessSidebarItems,
    instructor: InstructorSidebarItems,
    student: StudentSidebarItems,
  };

  const handleItemClick = () => {
    if (window.innerWidth < lgBreakpoint) {
      onClose();
    }
  };

  return (
    <nav
      className={`fixed top-0 w-72 bg-slate-100 transition-all duration-300 ease-in-out
          ${isExpanded ? "lg:w-64" : "lg:w-16"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          z-50
          h-full lg:top-[var(--navbar-height)] lg:translate-x-0`}
      aria-label={ta("dashboardNavigation")}
      role="navigation"
    >
      <div>
        {profile && (
          <SidebarItem
            href="/dashboard"
            text={t("dashboard")}
            icon={<Gauge />}
            isExpanded={isExpanded}
            onClick={handleItemClick}
          />
        )}
        {getProfileSidebar()}
        <div className="absolute -right-4 bottom-48 hidden lg:block ">
          <SidebarToggle
            isExpanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>
    </nav>
  );
}
