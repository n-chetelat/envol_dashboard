"use client";

import { useTranslations } from "next-intl";
import { ProfileWithProfileTypes } from "@/libs/types";
import BusinessSidebarItems from "@/components/sidebar/BusinessSidebarItems";
import InstructorSidebarItems from "@/components/sidebar/InstructorSidebarItems";
import StudentSidebarItems from "@/components/sidebar/StudentSidebarItems";
import SidebarToggle from "@/components/sidebar/SidebarToggle";
import useBreakpoint from "@/hooks/useBreakpoint";

interface SidebarProps {
  profile: ProfileWithProfileTypes | null;
  isOpen: boolean;
  isExpanded: boolean;
  onClose: () => void;
  toggleExpanded: () => void;
}

export default function Sidebar({
  profile,
  isOpen,
  onClose,
  isExpanded,
  toggleExpanded,
}: SidebarProps) {
  const t = useTranslations("dashboard");
  const ta = useTranslations("aria");
  const { currentBreakpoint, getBreakpointValue } = useBreakpoint();

  const effectiveExpanded =
    getBreakpointValue(currentBreakpoint) < getBreakpointValue("lg") ||
    isExpanded;

  const getProfileSidebar = () => {
    if (profile?.defaultDashboard) {
      const Component = profileSidebarMap[profile.defaultDashboard];
      return (
        Component && (
          <Component
            t={t}
            isExpanded={effectiveExpanded}
            onClick={handleItemClick}
          />
        )
      );
    }
    return null;
  };

  const profileSidebarMap = {
    BUSINESS: BusinessSidebarItems,
    INSTRUCTOR: InstructorSidebarItems,
    STUDENT: StudentSidebarItems,
  };

  const handleItemClick = () => {
    if (getBreakpointValue(currentBreakpoint) < getBreakpointValue("lg")) {
      onClose();
    }
  };

  return (
    <nav
      className={`fixed top-0 w-72 bg-gray-200 transition-all duration-300 ease-in-out
          ${effectiveExpanded ? "lg:w-[--sidebar-width-expanded]" : "lg:w-[--sidebar-width-collapsed]"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          z-50
          h-full lg:top-[var(--navbar-height)] lg:translate-x-0`}
      aria-label={ta("dashboardNavigation")}
      role="navigation"
    >
      <div>
        {getProfileSidebar()}
        <div className="absolute -right-4 bottom-48 hidden lg:block ">
          <SidebarToggle
            isExpanded={effectiveExpanded}
            onClick={toggleExpanded}
          />
        </div>
      </div>
    </nav>
  );
}
