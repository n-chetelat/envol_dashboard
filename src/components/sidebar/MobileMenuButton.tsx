"use client";
import { Menu } from "@/libs/icons";
import { useDashboardContext } from "@/contexts/DashboardContext";

export default function MobileMenuButton() {
  const { toggleSidebar } = useDashboardContext();
  return (
    <button
      className="text-slate-700 hover:bg-slate-200"
      onClick={toggleSidebar}
      aria-label="Toggle Mobile Menu"
    >
      <Menu />
    </button>
  );
}
