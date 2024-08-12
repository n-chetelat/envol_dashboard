import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import DefaultNavbar from "@/components/navbar/navbar/DefaultNavbar";

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

export default function DefaultLayout({
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
      <DefaultNavbar />
      <div className="mt-[--navbar-height]">{children}</div>
    </>
  );
}
