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
        className=" font-serif m-0.5 cursor-pointer p-4  uppercase hover:bg-slate-200"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        {t("dashboard")}
      </div>
      {profileType === "business" && (
        <div>
          <div
            className=" font-serif m-0.5 cursor-pointer p-4 uppercase hover:bg-slate-200"
            onClick={() => {
              router.push("/dashboard/business/courses");
            }}
          >
            {t("classes")}
          </div>
        </div>
      )}
      {profileType === "instructor" && (
        <div>
          <div
            className=" font-serif m-0.5 cursor-pointer p-4  uppercase hover:bg-slate-200"
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
            className=" font-serif m-0.5 cursor-pointer p-4  uppercase hover:bg-slate-200"
            onClick={() => {
              router.push("/dashboard/student/courses");
            }}
          >
            {t("classes")}
          </div>
        </div>
      )}
      <div
        className="cursor  font-serif m-0.5 cursor-pointer p-4  uppercase hover:bg-slate-200"
        onClick={() => {
          router.push("/dashboard/settings");
        }}
      >
        {t("settings")}
      </div>
    </nav>
  );
}