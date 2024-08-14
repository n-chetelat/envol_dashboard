"use client";

import { useState, useCallback } from "react";
import DashboardNavbar from "@/components/navbar/navbar/DashboardNavbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { Profile } from "@prisma/client";
import { Suspense } from "react";
import PageTransition from "@/components/transitions/PageTransition";
import SpinnerLoader from "@/components/loaders/SpinnerLoader";

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
    <div className="flex h-screen flex-col">
      <DashboardNavbar profile={profile} toggleMobileSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
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
        <main className="mt-[--navbar-height] flex-1 overflow-auto lg:pl-[--sidebar-width]">
          <Suspense fallback={<SpinnerLoader />}>
            <PageTransition>{children}</PageTransition>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
