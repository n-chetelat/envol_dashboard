"use client";

import { useState, useCallback } from "react";
import DashboardNavbar from "@/components/navbar/navbar/DashboardNavbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { Suspense } from "react";
import PageTransition from "@/components/transitions/PageTransition";
import SpinnerLoader from "@/components/loaders/SpinnerLoader";
import { ProfileWithProfileTypes } from "@/types";

interface DashboardWrapperProps {
  profile: ProfileWithProfileTypes;
  children: React.ReactNode;
}

export default function DashboardWrapper({
  profile,
  children,
}: DashboardWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);
  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <DashboardNavbar profile={profile} toggleMobileSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          profile={profile}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          isExpanded={isExpanded}
          toggleExpanded={toggleExpanded}
        />
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}
        <main
          className={`mt-[--navbar-height] flex-1 overflow-auto transition-all duration-300 ease-in-out ${isExpanded ? "lg:pl-[--sidebar-width-expanded]" : "lg:pl-[--sidebar-width-collapsed]"}`}
        >
          <Suspense fallback={<SpinnerLoader />}>
            <PageTransition>{children}</PageTransition>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
