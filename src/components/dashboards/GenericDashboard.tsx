"use client";

import { useTranslations } from "next-intl";
import { ProfileWithProfileTypes } from "@/libs/types";
import { PROFILE_TYPES } from "@/libs/constants";

export default function GenericDashboard({ profile }: GenericDashboardProps) {
  const t = useTranslations("common");
  const td = useTranslations("dashboard");

  return (
    <div>
      {profile.defaultDashboard === PROFILE_TYPES.BUSINESS_TYPE && (
        <div>The business dashboard</div>
      )}
      {profile.defaultDashboard === PROFILE_TYPES.INSTRUCTOR_TYPE && (
        <div>The instructor dashboard</div>
      )}
      {profile.defaultDashboard === PROFILE_TYPES.STUDENT_TYPE && (
        <div>The student dashboard</div>
      )}
    </div>
  );
}

type GenericDashboardProps = {
  profile: ProfileWithProfileTypes;
};
