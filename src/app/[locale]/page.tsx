import { Link } from "@/libs/navigation";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@clerk/nextjs";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("home");
  const { userId } = auth();
  return (
    <main className="flex flex-col w-full justify-center items-center">
      <h1 className="md:text-9xl sm:text-7xl text-6xl">Kollage</h1>
      <h2 className="text-lg">{t("subtitle")}</h2>
      {userId ? (
        <div className="text-white bg-blue-500 hover:bg-blue-700 p-4 m-4 rounded">
          <Link href="/dashboard">{t("dashboardCta")}</Link>
        </div>
      ) : (
        <div>
          <Link href="/sign-in">{t("join")}</Link>
        </div>
      )}
    </main>
  );
}
