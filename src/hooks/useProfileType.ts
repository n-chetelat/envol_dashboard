import { useState, useEffect } from "react";
import { Profile, Prisma } from "@prisma/client";

export default function useProfileType(
  profile: Profile & Prisma.ProfileInclude,
) {
  const [profileType, setProfileType] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      if (profile.businessProfile) setProfileType("business");
      else if (profile.instructorProfile) setProfileType("instructor");
      else if (profile.studentProfile) setProfileType("student");
      else setProfileType("none");
    } else {
      setProfile(null);
    }
  }, [
    profile?.studentProfile,
    profile?.instructorProfile,
    profile?.businessProfile,
  ]);

  return { profileType, setProfileType };
}
