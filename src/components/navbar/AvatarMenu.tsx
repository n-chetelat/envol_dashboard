"use client";

import { UserButton } from "@clerk/nextjs";
import { ProfileWithProfileTypes } from "@/libs/types";

interface AvatarMenuProps {
  profile: ProfileWithProfileTypes;
}

export default function AvatarMenu({ profile }: AvatarMenuProps) {
  return (
    <UserButton
      appearance={{
        variables: {
          borderRadius: "2px",
        },
      }}
      userProfileMode="navigation"
      userProfileUrl={
        profile ? `/dashboard/${profile.defaultDashboard}/settings` : ""
      }
      afterSignOutUrl="/"
    />
  );
}
