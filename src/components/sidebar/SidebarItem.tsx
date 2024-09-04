"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "react-tooltip";
import { useDashboardContext } from "@/contexts/DashboardContext";
import useBreakpoint from "@/hooks/useBreakpoint";

interface SidebarItemProps {
  href: string;
  text: string;
  icon: React.ReactElement;
}

export default function SidebarItem({ href, text, icon }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname.endsWith(href);
  const tooltipId = `tooltip-${href.replace("/", "-")}`;

  const { currentBreakpoint, getBreakpointValue } = useBreakpoint();
  const { closeSidebar, effectiveExpanded } = useDashboardContext();

  const handleItemClick = () => {
    if (getBreakpointValue(currentBreakpoint) < getBreakpointValue("lg")) {
      closeSidebar();
    }
  };

  return (
    <>
      <Link
        href={href}
        data-tooltip-id={!effectiveExpanded ? tooltipId : undefined}
        data-tooltip-content={text}
        className={`flex cursor-pointer items-center p-4 font-serif ${
          effectiveExpanded ? "justify-start" : "justify-center"
        } uppercase transition-all duration-200 ease-in-out ${
          isActive ? "bg-violet text-white" : "hover:bg-slate-200"
        }`}
        role="link"
        aria-label={text}
        aria-current={isActive ? "page" : undefined}
        onClick={handleItemClick}
      >
        {icon && (
          <span
            className={`${effectiveExpanded ? "mr-2" : ""} transition-all duration-200 ${
              isActive ? "scale-110" : ""
            }`}
          >
            {icon}
          </span>
        )}
        {effectiveExpanded && text}
      </Link>

      {!effectiveExpanded && (
        <Tooltip
          id={tooltipId}
          place="right"
          delayShow={400}
          delayHide={200}
          className="z-60"
        />
      )}
    </>
  );
}
