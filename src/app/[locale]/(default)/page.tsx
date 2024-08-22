import { Link } from "@/libs/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@clerk/nextjs/server";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("home");
  const { userId } = auth();
  return (
    <main className="flex h-[calc(100vh-var(--navbar-height))] w-full flex-col items-center">
      <div className="flex w-3/6 flex-col">
        <div className="m-4 mt-16">
          <Image
            src={`/landing.png`}
            alt="Envol booking system"
            width={900}
            height={408}
          />
        </div>

        {userId ? (
          <div className="m-4 flex-1 bg-lilac p-4 text-center font-sans text-white hover:bg-lilac-dark">
            <Link href="/dashboard">{t("dashboardCta")}</Link>
          </div>
        ) : (
          <div className="flex">
            <Link
              className="m-4 flex-1 bg-lilac p-4 text-center font-sans text-white hover:bg-lilac-dark"
              href="/sign-up"
            >
              {t("join")}
            </Link>
            <Link
              className="m-4 flex-1 bg-lilac p-4 text-center font-sans text-white hover:bg-lilac-dark"
              href="/sign-in"
            >
              {t("signIn")}
            </Link>
          </div>
        )}
        <h2 className="p-8 text-center font-sans text-lg font-light text-violet lg:text-4xl">
          {t("subtitle")}
        </h2>
      </div>
    </main>
  );
}
