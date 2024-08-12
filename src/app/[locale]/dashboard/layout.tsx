import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import SidebarWrapper from "@/components/sidebar/SidebarWrapper";
import PageTransition from "@/components/transitions/PageTransition";
import Navbar from "@/components/navbar/navbar/Navbar";

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

export default function DashboardLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <div className="h-screen">
        <div className="fixed h-full w-[--sidebar-width]">
          <SidebarWrapper />
        </div>
        <div className="mt-[--navbar-height] pl-[--sidebar-width] pt-8">
          <PageTransition>{children}</PageTransition>
        </div>
      </div>
    </>
  );
}
