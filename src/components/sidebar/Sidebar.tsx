"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/libs/navigation";
import useProfileType from "@/hooks/useProfileType";
import { Profile } from "@prisma/client";

export default function Sidebar({ profile }: { profile: Profile }) {
  const { profileType, setProfileType } = useProfileType(profile);
  const t = useTranslations("dashboard");
  const router = useRouter();

  return (
    <nav className="h-full bg-slate-100 p-4 pr-0">
      {profile && (
        <div
          className="sidebar-item"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          {t("dashboard")}
        </div>
      )}
      {profileType === "business" && (
        <div>
          <div
            className="sidebar-item"
            onClick={() => {
              router.push("/dashboard/business/courses");
            }}
          >
            {t("classes")}
          </div>
          <div
            className="sidebar-item"
            onClick={() => {
              router.push("/dashboard/business/settings");
            }}
          >
            {t("settings")}
          </div>
        </div>
      )}
      {profileType === "instructor" && (
        <div>
          <div
            className="sidebar-item"
            onClick={() => {
              router.push("/dashboard/instructor/courses");
            }}
          >
            {t("classes")}
          </div>
        </div>
      )}
      {profileType === "student" && (
        <div>
          <div
            className="sidebar-item"
            onClick={() => {
              router.push("/dashboard/student/courses");
            }}
          >
            {t("classes")}
          </div>
        </div>
      )}
    </nav>
  );
}
