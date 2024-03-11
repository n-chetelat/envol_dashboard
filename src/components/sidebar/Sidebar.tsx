"use client";

import { useTranslations } from "next-intl";
import useProfileType from "@/hooks/useProfileType";

export default function Sidebar({ profile, locale }) {
  const { profileType, setProfileType } = useProfileType(profile);
  const t = useTranslations("dashboard");

  return (
    <nav className="h-full bg-slate-100 p-4 pr-0">
      <div className="border-l-gold hover:border-l-gold-dark m-0.5 border-l-4 p-4 hover:bg-slate-200">
        {t("dashboard")}
      </div>
      {profileType && (
        <div>
          <div className="border-l-gold hover:border-l-gold-dark m-0.5 border-l-4 p-4 hover:bg-slate-200">
            {t("classes")}
          </div>
        </div>
      )}
      <div className="border-l-gold hover:border-l-gold-dark m-0.5 border-l-4 p-4 hover:bg-slate-200">
        {t("settings")}
      </div>
    </nav>
  );
}
