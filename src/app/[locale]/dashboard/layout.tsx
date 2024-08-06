import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import SidebarWrapper from "@/components/sidebar/SidebarWrapper";
import PageTransition from "@/components/transitions/PageTransition";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("mainLayout.title"),
    description: t("mainLayout.description"),
  };
}

export default function RootLayout({
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
    <div className="h-screen">
      <div className="fixed h-full w-[--sidebar-width]">
        <SidebarWrapper />
      </div>
      <div className="mt-[--navbar-height] pl-[--sidebar-width] pt-8">
        <PageTransition>{children}</PageTransition>
      </div>
    </div>
  );
}
