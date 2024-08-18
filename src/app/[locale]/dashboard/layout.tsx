import { getUserProfileWithProfileTypes } from "@/actions/profile";
import DashboardWrapper from "@/components/dashboards/DashboardWrapper";
import { ProfileWithProfileTypes } from "@/libs/types";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

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
  const profile: ProfileWithProfileTypes | null =
    await getUserProfileWithProfileTypes();

  if (!profile) {
    redirect("/profile_setup");
  }

  return <DashboardWrapper profile={profile}>{children}</DashboardWrapper>;
}
