import { useState, useEffect } from "react";

export default function useProfileType(profile) {
  const [profileType, setProfileType] = useState<"string" | null>(null);

  useEffect(() => {
    if (profile.businessProfile) setProfileType("business");
    else if (profile.instructorProfile) setProfileType("instructor");
    else if (profile.studentProfile) setProfileType("student");
    else setProfileType(null);
  }, []);

  return { profileType, setProfileType };
}
