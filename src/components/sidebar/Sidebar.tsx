"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import BusinessSidebarItems from "@/components/sidebar/BusinessSidebarItems";
import InstructorSidebarItems from "@/components/sidebar/InstructorSidebarItems";
import StudentSidebarItems from "@/components/sidebar/StudentSidebarItems";
import SidebarToggle from "@/components/sidebar/SidebarToggle";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useDashboardContext } from "@/contexts/DashboardContext";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const t = useTranslations("dashboard");
  const ta = useTranslations("aria");
  const { currentBreakpoint, getBreakpointValue } = useBreakpoint();
  const { profile, isSidebarOpen, closeSidebar, isExpanded, toggleExpanded } =
    useDashboardContext();

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
      closeSidebar();
    }
  };

  return (
    <nav
      className={clsx(
        ` h-full w-72 bg-gray-200 transition-all duration-300 ease-in-out 
          ${effectiveExpanded ? "lg:w-[--sidebar-width-expanded]" : "lg:w-[--sidebar-width-collapsed]"}
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`,
        className,
      )}
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
