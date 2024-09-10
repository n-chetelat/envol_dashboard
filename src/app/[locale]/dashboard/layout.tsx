import { getProfile } from "@/queries/profile";
import Navbar from "@/components/navbar/navbar/Navbar";
import { Suspense } from "react";
import SpinnerLoader from "@/components/loaders/SpinnerLoader";
import Sidebar from "@/components/sidebar/Sidebar";
import DashboardContent from "@/components/dashboards/DashboardContent";
import DashboardOverlay from "@/components/dashboards/DashboardOverlay";
import { ProfileWithProfileTypes } from "@/libs/types";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { ProfileProvider } from "@/store/ProfileProvider";

export const revalidate = 3600; // revalidate cached data at most every hour

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("dashboardLayout.title"),
    description: t("dashboardLayout.description"),
  };
}

export default async function DashboardLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  const profile: ProfileWithProfileTypes | null = await getProfile();
  if (!profile) {
    redirect("/profile_setup");
  }

  return (
    <DashboardProvider>
      <div className="flex h-screen flex-col">
        <Navbar isDashboard={true} />
        <ProfileProvider profile={profile}>
          <div className="flex flex-1 overflow-hidden">
            <Sidebar className="fixed top-0 z-50 lg:top-[var(--navbar-height)]" />
            <DashboardOverlay />
            <Suspense fallback={<SpinnerLoader />}>
              <DashboardContent className="mt-[--navbar-height] flex-1 overflow-auto ">
                {children}
              </DashboardContent>
            </Suspense>
          </div>
        </ProfileProvider>
      </div>
    </DashboardProvider>
  );
}
