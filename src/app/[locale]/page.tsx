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
    <main className="flex w-full flex-col items-center justify-center">
      <h1 className="font-serif text-6xl font-bold sm:text-7xl md:text-9xl">
        Envol
      </h1>
      <h2 className="text-lg">{t("subtitle")}</h2>
      {userId ? (
        <div className="m-4 rounded bg-blue-500 p-4 text-white hover:bg-blue-700">
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
