"use client";

import { useState } from "react";
import useProfileType from "@/hooks/useProfileType";
import { useTranslations } from "next-intl";
import { Prisma, Profile } from "@prisma/client";
import TokenForm from "@/components/forms/TokenForm";

export default function GenericDashboard({ profile }: GenericDashboardProps) {
  const { profileType, setProfileType } = useProfileType(profile);
  const [tokenFormOpen, setTokenFormOpen] = useState<boolean>(false);
  const t = useTranslations("common");
  const td = useTranslations("dashboard");

  const handleCreateStudent = async () => {
    try {
      await fetch("/api/students", {
        method: "POST",
        body: JSON.stringify({ id: profile.id }),
      });
      window.location.reload();
    } catch (errors) {
      console.error(errors);
    }
  };

  const handleTokenSubmit = async (formData: FormData) => {
    try {
      console.log(formData);
      // TODO: Validate token here
      if (formData.tokenType === "business") {
        handleCreateBusiness();
      } else if (formData.tokenType === "instructor") {
        handleCreateInstructor();
      } else {
        console.error("Invalid token type");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateInstructor = async () => {
    try {
      await fetch("/api/instructors", {
        method: "POST",
        body: JSON.stringify({ id: profile.id }),
      });
      window.location.reload();
    } catch (errors) {
      console.error(errors);
    }
  };

  const handleCreateBusiness = async () => {
    try {
      await fetch("/api/businesses", {
        method: "POST",
        body: JSON.stringify({ id: profile.id }),
      });
      window.location.reload();
    } catch (errors) {
      console.error(errors);
    }
  };

  return (
    <div className="flex flex-col p-4">
      <h1 className="m-4 font-serif text-2xl font-bold uppercase">
        {t("welcome")}, {profile.preferredName || profile.firstName}
      </h1>
      {!profileType && <p>Loading...</p>}
      {profileType === "none" && (
        <div className="my-8 flex flex-col items-center">
          <p>{td("why")}</p>
          <button
            className="my-4 w-2/4 rounded bg-lilac p-6 font-bold hover:bg-lilac-dark lg:w-[32rem]"
            onClick={handleCreateStudent}
          >
            {td("amStudent")}
          </button>
          <button
            className="my-4 w-2/4 rounded bg-lilac p-6 font-bold hover:bg-lilac-dark lg:w-[32rem]"
            onClick={() => {
              setTokenFormOpen(!tokenFormOpen);
            }}
          >
            {td("haveToken")}
          </button>
          {tokenFormOpen && (
            <div className="flex w-2/4 justify-center rounded bg-slate-100 p-6">
              <TokenForm onSubmit={handleTokenSubmit} />
            </div>
          )}
        </div>
      )}
      {profileType === "business" && <div>The business dashboard</div>}
      {profileType === "instructor" && <div>The instructor dashboard</div>}
      {profileType === "student" && <div>The student dashboard</div>}
    </div>
  );
}

type GenericDashboardProps = {
  profile: Profile & Prisma.ProfileInclude;
};
