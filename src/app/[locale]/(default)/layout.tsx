import { getTranslations } from "next-intl/server";
import Navbar from "@/components/navbar/navbar/Navbar";

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
  return (
    <>
      <Navbar />
      <div className="mt-[--navbar-height]">{children}</div>
    </>
  );
}
