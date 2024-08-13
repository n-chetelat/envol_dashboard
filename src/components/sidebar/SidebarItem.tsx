"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <Link
      href={href}
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
  );
}
