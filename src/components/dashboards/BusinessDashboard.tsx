import { ProfileWithProfileTypes } from "@/libs/types";

interface BusinessDashboardProps {
  profile: ProfileWithProfileTypes;
}

export default async function BusinessDashboard({
  profile,
}: BusinessDashboardProps) {
  return <div>The business dashboard embedded page</div>;
}
