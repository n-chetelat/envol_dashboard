"use client";

import { UserButton } from "@clerk/nextjs";
import useProfileType from "@/hooks/useProfileType";

export default function AvatarMenu({ profile }) {
  const { profileType } = useProfileType(profile);

  return (
    <UserButton
      appearance={{
        variables: {
          borderRadius: "2px",
        },
      }}
      userProfileMode="navigation"
      userProfileUrl={`/dashboard/${profileType}/settings`}
      afterSignOutUrl="/"
    />
  );
}
