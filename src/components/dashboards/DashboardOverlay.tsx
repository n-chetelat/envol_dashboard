"use client";

import { useDashboardContext } from "@/contexts/DashboardContext";

export default function DashboardOverlay() {
  const { isSidebarOpen, closeSidebar } = useDashboardContext();

  if (!isSidebarOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
      onClick={closeSidebar}
      aria-hidden="true"
    />
  );
}
