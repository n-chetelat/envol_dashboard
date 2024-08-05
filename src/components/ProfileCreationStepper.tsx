"use client";

import Stepper from "@/components/stepper/Stepper";
import ProfileForm from "@/components/forms/ProfileForm";
import ProfileTypeForm from "@/components/forms/ProfileTypeForm";
import { Prisma } from "@prisma/client";
import { ProfileTypeFormInput } from "@/validations/profileTypeForm";
import { PROFILE_TYPES } from "@/constants";
import { useRouter } from "@/libs/navigation";

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
      ...profileData,
    };
    if (profileTypeData["tokenIsValid"] === true) {
      try {
        await createProfile(profileTypeData.profileType, profileCreateInput);
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

  // - If the profile is not created, redirect to a 500 error page
  // - If the profile is created, redirect to dashboard for the correct profile type
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
