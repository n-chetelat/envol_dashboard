import { useState, useCallback, useMemo } from "react";
import useBreakpoint from "@/hooks/useBreakpoint";

export function useDashboardState() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((prev) => !prev),
    [],
  );
  const toggleExpanded = useCallback(() => setIsExpanded((prev) => !prev), []);

  const { currentBreakpoint, getBreakpointValue } = useBreakpoint();

  const effectiveExpanded = useMemo(() => {
    return (
      getBreakpointValue(currentBreakpoint) < getBreakpointValue("lg") ||
      isExpanded
    );
  }, [currentBreakpoint, isExpanded, getBreakpointValue, getBreakpointValue]);

  return {
    isSidebarOpen,
    isExpanded,
    closeSidebar,
    toggleSidebar,
    toggleExpanded,
    effectiveExpanded,
  };
}
