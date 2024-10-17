import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { getProfile } from "@/queries/profile";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { Profile } from "@/libs/types";
import { ProfileProvider } from "@/store/ProfileProvider";
import DashboardContent from "@/components/dashboards/DashboardContent";
import DashboardOverlay from "@/components/dashboards/DashboardOverlay";
import SpinnerLoader from "@/components/loaders/SpinnerLoader";
import Navbar from "@/components/navbar/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

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
  const profile: Profile | null = await getProfile();
  if (!profile) {
    redirect("/profile_setup");
  }

  return (
    <DashboardProvider>
      <div className="flex h-screen flex-col">
        <Navbar isDashboard={true} />
        <ProfileProvider profile={profile}>
          <div className="flex flex-1 overflow-hidden">
            <Sidebar className="fixed top-0 z-50 lg:top-[var(--navbar-height-lg)]" />
            <DashboardOverlay />
            <Suspense fallback={<SpinnerLoader />}>
              <DashboardContent className="mt-[--navbar-height] flex-1 overflow-auto bg-gray-100 lg:mt-[--navbar-height-lg] ">
                {children}
              </DashboardContent>
            </Suspense>
          </div>
        </ProfileProvider>
      </div>
    </DashboardProvider>
  );
}
