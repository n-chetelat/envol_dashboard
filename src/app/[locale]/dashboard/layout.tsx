import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import SidebarWrapper from "@/components/sidebar/SidebarWrapper";

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
      <div className="fixed h-full w-48">
        <SidebarWrapper />
      </div>
      <div className="mt-20 pl-[14rem]">{children}</div>
    </div>
  );
}
