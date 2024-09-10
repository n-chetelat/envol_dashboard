"use client";

import ProfileCreationForm from "@/components/forms/ProfileCreationForm";
import ProfileTypeForm from "@/components/forms/ProfileTypeForm";
import Stepper from "@/components/stepper/Stepper";
import { PROFILE_TYPES } from "@/libs/constants";
import { useRouter } from "@/libs/navigation";
import { createProfile as createProfileAction } from "@/queries/profile";
import { ProfileFormSchemaType } from "@/validations/profileForm";

export default function ProfileCreationStepper() {
  const router = useRouter();
  const handleProfileStepperComplete = async (data: any) => {
    const [profileData, profileTypeData] = data;
    if (profileTypeData.profileType === PROFILE_TYPES.STUDENT_TYPE) {
      profileTypeData["tokenIsValid"] = true;
    }
    const profileCreateInput: ProfileFormSchemaType = {
      defaultDashboard: profileTypeData.profileType,
      ...profileData,
    };
    if (profileTypeData["tokenIsValid"] === true) {
      try {
        await createProfile(profileTypeData.profileType, profileCreateInput);
        router.replace("/dashboard");
      } catch (error) {
        console.error("Error while creating profile:");
        console.error(error);
      }
    } else {
      console.error("This profile cannot be created due to an invalid token.");
    }
  };

  const createProfile = async (
    profileType: string,
    profileCreateData: ProfileFormSchemaType,
  ) => {
    const { email: _, ...rest } = profileCreateData;
    const profile = await createProfileAction(rest);
    if (profile) {
      if (profileType === PROFILE_TYPES.STUDENT_TYPE) {
        await createStudent(profile.id);
      } else if (profileType === PROFILE_TYPES.INSTRUCTOR_TYPE) {
        await createInstructor(profile.id);
      } else if (profileType === PROFILE_TYPES.BUSINESS_TYPE) {
        await createBusiness(profile.id);
      } else {
        throw new Error(`Invalid profile type ${profileType}`);
      }
    } else {
      throw new Error("Failed to create profile");
    }
  };

  const createStudent = async (profileId: string) => {
    await fetch("/api/students", {
      method: "POST",
      body: JSON.stringify({ profileId }),
      next: { tags: ["student"] },
    });
  };

  const createInstructor = async (profileId: string) => {
    await fetch("/api/instructors", {
      method: "POST",
      body: JSON.stringify({ profileId }),
      next: { tags: ["instructor"] },
    });
  };

  const createBusiness = async (profileId: string) => {
    await fetch("/api/businesses", {
      method: "POST",
      body: JSON.stringify({ profileId }),
      next: { tags: ["business"] },
    });
  };

  return (
    <Stepper onComplete={handleProfileStepperComplete}>
      {
        // @ts-ignore: Ignore missing props. They are added in Stepper component.
        <ProfileCreationForm />
      }
      {
        // @ts-ignore: Ignore missing props. They are added in Stepper component.
        <ProfileTypeForm />
      }
    </Stepper>
  );
}
