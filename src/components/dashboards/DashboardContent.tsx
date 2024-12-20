"use client";

import { cn } from "@/libs/utils";
import { useDashboardContext } from "@/contexts/DashboardContext";

interface DashboardContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function DashboardContent({
  children,
  className,
}: DashboardContentProps) {
  const { isExpanded } = useDashboardContext();

  return (
    <main
      className={cn(
        `transition-all duration-300 ease-in-out ${
          isExpanded
            ? "lg:pl-[--sidebar-width-expanded]"
            : "lg:pl-[--sidebar-width-collapsed]"
        }`,
        className,
      )}
    >
      {children}
    </main>
  );
}
