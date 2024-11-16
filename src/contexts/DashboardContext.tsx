"use client";

import { createContext, useContext } from "react";
import { useDashboardState } from "@/hooks/useDashboardState";

type DashboardContextType = ReturnType<typeof useDashboardState>;

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const dashboardState = useDashboardState();

  return (
    <DashboardContext.Provider value={{ ...dashboardState }}>
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
