"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/libs/navigation";
import useProfileType from "@/hooks/useProfileType";

export default function Sidebar({ profile }) {
  const { profileType, setProfileType } = useProfileType(profile);
  const t = useTranslations("dashboard");
  const router = useRouter();

  return (
    <nav className="h-full bg-slate-100 p-4 pr-0">
      <div
        className="border-l-gold hover:border-l-gold-dark m-0.5 cursor-pointer border-l-4 p-4 hover:bg-slate-200"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        {t("dashboard")}
      </div>
      {profileType && (
        <div>
          <div className="border-l-gold hover:border-l-gold-dark m-0.5 cursor-pointer border-l-4 p-4 hover:bg-slate-200">
            {t("classes")}
          </div>
        </div>
      )}
      <div
        className="border-l-gold hover:border-l-gold-dark cursor m-0.5 cursor-pointer border-l-4 p-4 hover:bg-slate-200"
        onClick={() => {
          router.push("/dashboard/settings");
        }}
      >
        {t("settings")}
      </div>
    </nav>
  );
}
