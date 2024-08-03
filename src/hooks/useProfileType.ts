import { useState, useEffect } from "react";
import { Profile, Prisma } from "@prisma/client";

export default function useProfileType(
  profile: Profile & Prisma.ProfileInclude,
) {
  const [profileType, setProfileType] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      if (profile.businesses?.length) setProfileType("business");
      else if (profile.instructors?.length) setProfileType("instructor");
      else if (profile.students?.length) setProfileType("student");
      else setProfileType("none");
    } else {
      setProfileType(null);
    }
  }, [profile, profile?.students, profile?.instructors, profile?.businesses]);

  return { profileType, setProfileType };
}
