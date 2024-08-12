"use client";

import { useState, useCallback } from "react";
import DashboardNavbar from "@/components/navbar/navbar/DashboardNavbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { Profile } from "@prisma/client";

interface DashboardWrapperProps {
  profile: Profile;
  children: React.ReactNode;
}

export default function DashboardWrapper({
  profile,
  children,
}: DashboardWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((prev) => !prev),
    [],
  );
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  return (
    <>
      <DashboardNavbar profile={profile} toggleMobileSidebar={toggleSidebar} />
      <Sidebar
        profile={profile}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      <div className="h-screen">
        <div className="mt-[--navbar-height] pt-8 lg:pl-[--sidebar-width]">
          {children}
        </div>
      </div>
    </>
  );
}
