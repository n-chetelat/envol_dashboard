"use client";

import useProfileType from "@/hooks/useProfileType";
import { useTranslations } from "next-intl";
import { ProfileWithProfileTypes } from "@/types";
import { PROFILE_TYPES } from "@/constants";

export default function GenericDashboard({ profile }: GenericDashboardProps) {
  const { profileType } = useProfileType(profile);
  const t = useTranslations("common");
  const td = useTranslations("dashboard");

  return (
    <div>
      {profileType === PROFILE_TYPES.BUSINESS_TYPE && (
        <div>The business dashboard</div>
      )}
      {profileType === PROFILE_TYPES.INSTRUCTOR_TYPE && (
        <div>The instructor dashboard</div>
      )}
      {profileType === PROFILE_TYPES.STUDENT_TYPE && (
        <div>The student dashboard</div>
      )}
    </div>
  );
}

type GenericDashboardProps = {
  profile: ProfileWithProfileTypes;
};
