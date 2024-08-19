"use client";

import { createContext, useContext } from "react";
import { useDashboardState } from "@/hooks/useDashboardState";
import { ProfileWithProfileTypes } from "@/libs/types";

type DashboardContextType = ReturnType<typeof useDashboardState> & {
  profile: ProfileWithProfileTypes | null;
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export function DashboardProvider({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: ProfileWithProfileTypes | null;
}) {
  const dashboardState = useDashboardState();

  return (
    <DashboardContext.Provider value={{ ...dashboardState, profile }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
