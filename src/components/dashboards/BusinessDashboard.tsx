import { Profile } from "@/libs/types";

interface BusinessDashboardProps {
  profile: Profile;
}

export default async function BusinessDashboard({
  profile,
}: BusinessDashboardProps) {
  return <div>The business dashboard embedded page</div>;
}
