"use client";

import Stepper from "@/components/stepper/Stepper";
import ProfileForm from "@/components/forms/ProfileForm";
import ProfileTypeForm from "@/components/forms/ProfileTypeForm";
import { Prisma } from "@prisma/client";

export default function ProfileCreationStepper({
  userId,
}: ProfileCreationStepperProps) {
  const handleProfileStepperComplete = (data: any) => {
    console.log(data);
  };

  const verifyToken = (token: string) => {
    return true;
  };

  const createProfile = (data: Prisma.ProfileCreateInput) => {};

  /*
  - Check if there is a token and check for its validity
  - If the token is invalid, set it as invalid on the form
  - If the token is valid, or if there is no token, create a profile
  - If the profile is not created, redirect to a 500 error page
  - If the profile is created, redirect to dashboard for the correct profile type
  */
  const handleCreateProfile = async (formData: FormData) => {
    try {
      const profileData: Prisma.ProfileCreateInput = {
        userId,
        firstName: `${formData.firstName}`,
        lastName: `${formData.lastName}`,
        preferredName: `${formData.preferredName}`,
        pronouns: formData.pronouns,
        phoneNumber: `${formData.phoneNumber}`,
      };
      await fetch("/api/profiles", {
        method: "POST",
        body: JSON.stringify(profileData),
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // const handleCreateStudent = async () => {
  //   try {
  //     await fetch("/api/students", {
  //       method: "POST",
  //       body: JSON.stringify({ id: profile.id }),
  //     });
  //     window.location.reload();
  //   } catch (errors) {
  //     console.error(errors);
  //   }
  // };

  // const handleTokenSubmit = async (formData: FormData) => {
  //   try {
  //     console.log(formData);
  //     // TODO: Validate token here
  //     if (formData.profileType === "business") {
  //       handleCreateBusiness();
  //     } else if (formData.profileType === "instructor") {
  //       handleCreateInstructor();
  //     } else {
  //       console.error("Invalid token type");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleCreateInstructor = async () => {
  //   try {
  //     await fetch("/api/instructors", {
  //       method: "POST",
  //       body: JSON.stringify({ id: profile.id }),
  //     });
  //     window.location.reload();
  //   } catch (errors) {
  //     console.error(errors);
  //   }
  // };

  // const handleCreateBusiness = async () => {
  //   try {
  //     await fetch("/api/businesses", {
  //       method: "POST",
  //       body: JSON.stringify({ id: profile.id }),
  //     });
  //     window.location.reload();
  //   } catch (errors) {
  //     console.error(errors);
  //   }
  // };

  return (
    <Stepper onComplete={handleProfileStepperComplete}>
      {
        // @ts-ignore: Ignore missing props. They are added in Stepper component.
        <ProfileForm userId={userId} />
      }
      {
        // @ts-ignore: Ignore missing props. They are added in Stepper component.
        <ProfileTypeForm userId={userId} />
      }
    </Stepper>
  );
}

type ProfileCreationStepperProps = {
  userId: string;
};
