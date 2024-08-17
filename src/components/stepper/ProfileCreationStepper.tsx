"use client";

import ProfileForm from "@/components/forms/ProfileForm";
import ProfileTypeForm from "@/components/forms/ProfileTypeForm";
import Stepper from "@/components/stepper/Stepper";
import { PROFILE_TYPES } from "@/libs/constants";
import { useRouter } from "@/libs/navigation";
import { Prisma } from "@prisma/client";

export default function ProfileCreationStepper({
  userId,
  userEmail,
}: ProfileCreationStepperProps) {
  const router = useRouter();
  const handleProfileStepperComplete = async (data: any) => {
    const [profileData, profileTypeData] = data;
    if (profileTypeData.profileType === PROFILE_TYPES.STUDENT_TYPE) {
      profileTypeData["tokenIsValid"] = true;
    }
    const profileCreateInput: Prisma.ProfileCreateInput = {
      userId,
      defaultDashboard: profileTypeData.profileType,
      ...profileData,
    };
    if (profileTypeData["tokenIsValid"] === true) {
      try {
        await createProfile(profileTypeData.profileType, profileCreateInput);
        // TODO: Redirect to whatever specific dashboard for the profile type chosen
        router.replace("/dashboard");
      } catch (error) {
        // redirect to 500 error page
        console.error("Error while creating profile:");
        console.error(error);
      }
    } else {
      console.error("This profile cannot be created due to an invalid token.");
    }
  };

  const createProfile = async (
    profileType: string,
    profileCreateData: Prisma.ProfileCreateInput,
  ) => {
    const response = await fetch("/api/profiles", {
      method: "POST",
      body: JSON.stringify(profileCreateData),
    });
    const profile = await response.json();
    if (profileType === PROFILE_TYPES.STUDENT_TYPE) {
      await createStudent(profile.id);
    } else if (profileType === PROFILE_TYPES.INSTRUCTOR_TYPE) {
      await createInstructor(profile.id);
    } else if (profileType === PROFILE_TYPES.BUSINESS_TYPE) {
      await createBusiness(profile.id);
    } else {
      throw new Error(`Invalid profile type ${profileType}`);
    }
  };

  const createStudent = async (profileId: string) => {
    await fetch("/api/students", {
      method: "POST",
      body: JSON.stringify({ profileId }),
    });
  };

  const createInstructor = async (profileId: string) => {
    await fetch("/api/instructors", {
      method: "POST",
      body: JSON.stringify({ profileId }),
    });
  };

  const createBusiness = async (profileId: string) => {
    await fetch("/api/businesses", {
      method: "POST",
      body: JSON.stringify({ profileId }),
    });
  };

  return (
    <Stepper onComplete={handleProfileStepperComplete}>
      {
        // @ts-ignore: Ignore missing props. They are added in Stepper component.
        <ProfileForm />
      }
      {
        // @ts-ignore: Ignore missing props. They are added in Stepper component.
        <ProfileTypeForm userEmail={userEmail} />
      }
    </Stepper>
  );
}

type ProfileCreationStepperProps = {
  userId: string;
  userEmail: string;
};
