import { useState, useEffect } from "react";
import { ProfileType, ProfileWithProfileTypes } from "@/types";

// Bad assumptions: the profile will only have one type at a time,
// and the order here is the "preferred" order.
const computeProfileType = (
  profile: ProfileWithProfileTypes | null,
): ProfileType | null => {
  if (profile?.businesses?.length) return "BUSINESS";
  if (profile?.instructors?.length) return "INSTRUCTOR";
  if (profile?.students?.length) return "STUDENT";
  return null;
};

export default function useProfileType(
  profile: ProfileWithProfileTypes | null,
) {
  const [profileType, setProfileType] = useState<ProfileType | null>(
    computeProfileType(profile),
  );

  useEffect(() => {
    const newType = computeProfileType(profile);
    if (newType !== profileType) {
      setProfileType(newType);
    }
  }, [profile]);

  return { profileType, setProfileType };
}
