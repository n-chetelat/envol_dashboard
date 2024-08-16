"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "react-tooltip";

interface SidebarItemProps {
  href: string;
  text: string;
  icon: React.ReactElement;
  isExpanded: boolean;
  onClick: () => void;
}

export default function SidebarItem({
  href,
  text,
  icon,
  isExpanded,
  onClick,
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname.endsWith(href);
  const tooltipId = `tooltip-${href.replace("/", "-")}`;

  return (
    <>
      <Link
        href={href}
        data-tooltip-id={!isExpanded ? tooltipId : undefined}
        data-tooltip-content={text}
        className={`flex cursor-pointer items-center p-4 font-serif ${
          isExpanded ? "justify-start" : "justify-center"
        } uppercase transition-all duration-200 ease-in-out ${
          isActive ? "bg-violet text-white" : "hover:bg-slate-200"
        }`}
        role="link"
        aria-label={text}
        aria-current={isActive ? "page" : undefined}
        onClick={onClick}
      >
        {icon && (
          <span
            className={`${isExpanded ? "mr-2" : ""} transition-all duration-200 ${
              isActive ? "scale-110" : ""
            }`}
          >
            {icon}
          </span>
        )}
        {isExpanded && text}
      </Link>

      {!isExpanded && (
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
