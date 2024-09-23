import { Profile } from "@/libs/types";

interface InstructorDashboardProps {
  profile: Profile;
}

export default async function InstructorDashboard({
  profile,
}: InstructorDashboardProps) {
  return <div>The instructor dashboard embedded page</div>;
}
