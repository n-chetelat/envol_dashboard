import { ProfileWithProfileTypes } from "@/libs/types";

interface StudentDashboardProps {
  profile: ProfileWithProfileTypes;
}

export default async function StudentDashboard({
  profile,
}: StudentDashboardProps) {
  return <div>The student dashboard embedded page</div>;
}
