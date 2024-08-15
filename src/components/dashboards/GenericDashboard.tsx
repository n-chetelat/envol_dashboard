"use client";

import useProfileType from "@/hooks/useProfileType";
import { useTranslations } from "next-intl";
import { ProfileWithProfileTypes } from "@/types";

export default function GenericDashboard({ profile }: GenericDashboardProps) {
  const { profileType } = useProfileType(profile);
  const t = useTranslations("common");
  const td = useTranslations("dashboard");

  return (
    <div>
      {profileType === "business" && <div>The business dashboard</div>}
      {profileType === "instructor" && <div>The instructor dashboard</div>}
      {profileType === "student" && <div>The student dashboard</div>}
    </div>
  );
}

type GenericDashboardProps = {
  profile: ProfileWithProfileTypes;
};
