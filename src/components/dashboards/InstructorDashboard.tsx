import { ProfileWithProfileTypes } from "@/libs/types";

interface InstructorDashboardProps {
  profile: ProfileWithProfileTypes;
}

export default async function InstructorDashboard({
  profile,
}: InstructorDashboardProps) {
  return <div>The instructor dashboard embedded page</div>;
}
