"use client";

import Stepper from "@/components/stepper/Stepper";
import ProfileForm from "@/components/forms/ProfileForm";
import ProfileTypeForm from "@/components/forms/ProfileTypeForm";

export default function ProfileCreationStepper({
  userId,
}: ProfileCreationStepperProps) {
  const handleProfileStepperComplete = (data: any) => {
    console.log(data);
  };

  // const handleCreateProfile = async (formData: FormData) => {
  //   try {
  //     const profileData: Prisma.ProfileCreateInput = {
  //       userId,
  //       firstName: `${formData.firstName}`,
  //       lastName: `${formData.lastName}`,
  //       preferredName: `${formData.preferredName}`,
  //       pronouns: formData.pronouns,
  //       phoneNumber: `${formData.phoneNumber}`,
  //     };
  //     await fetch("/api/profiles", {
  //       method: "POST",
  //       body: JSON.stringify(profileData),
  //     });
  //     window.location.reload();
  //   } catch (error) {
  //     console.error(error);
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
