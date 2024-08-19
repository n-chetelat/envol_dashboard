import { useState, useCallback } from "react";

export function useDashboardState() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((prev) => !prev),
    [],
  );
  const toggleExpanded = useCallback(() => setIsExpanded((prev) => !prev), []);

  return {
    isSidebarOpen,
    isExpanded,
    closeSidebar,
    toggleSidebar,
    toggleExpanded,
  };
}
