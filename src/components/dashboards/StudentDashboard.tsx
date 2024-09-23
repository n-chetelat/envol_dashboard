import { Profile } from "@/libs/types";

interface StudentDashboardProps {
  profile: Profile;
}

export default async function StudentDashboard({
  profile,
}: StudentDashboardProps) {
  return <div>The student dashboard embedded page</div>;
}
