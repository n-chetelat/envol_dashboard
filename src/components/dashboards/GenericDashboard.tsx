"use client";

import { useState } from "react";
import useProfileType from "@/hooks/useProfileType";

import { useTranslations } from "next-intl";

export default function GenericDashboard({ profile, locale }) {
  const { profileType, setProfileType } = useProfileType(profile);
  const [businessProfileFormOpen, setBusinessProfileFormOpen] =
    useState<"boolean">(false);
  const [instructorProfileFormOpen, setInstructorProfileFormOpen] =
    useState<"boolean">(false);
  const t = useTranslations("common");
  const td = useTranslations("dashboard");

  const handleCreateStudentProfile = () => {};

  return (
    <div className="flex flex-col p-4">
      <h1 className="m-4 text-2xl font-bold uppercase">
        {t("welcome")}, {profile.preferredName || profile.firstName}
      </h1>
      {!profileType && (
        <div className="my-8 flex flex-col items-center">
          <p>{td("why")}</p>
          <button
            className="bg-babyblue hover:bg-babyblue-dark my-4 w-2/4 rounded p-6 font-bold lg:w-[32rem]"
            onClick={handleCreateStudentProfile}
          >
            {td("amStudent")}
          </button>
          <button
            className="bg-babyblue hover:bg-babyblue-dark my-4 w-2/4 rounded p-6 font-bold lg:w-[32rem]"
            onClick={() => {
              setInstructorProfileFormOpen(!instructorProfileFormOpen);
            }}
          >
            {td("amInstructor")}
          </button>
          <button
            className="bg-babyblue hover:bg-babyblue-dark my-4 w-2/4 rounded p-6 font-bold lg:w-[32rem]"
            onClick={() => {
              setBusinessProfileFormOpen(!businessProfileFormOpen);
            }}
          >
            {td("amBusiness")}
          </button>
        </div>
      )}
      {profileType === "business" && <div>The business dashboard</div>}
      {profileType === "instructor" && <div>The instructor dashboard</div>}
      {profileType === "student" && <div>The student dashboard</div>}
    </div>
  );
}
