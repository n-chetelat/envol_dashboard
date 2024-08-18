import { getUserProfileWithProfileTypes } from "@/actions/profile";
import { redirect } from "@/libs/navigation";
import { ProfileWithProfileTypes } from "@/libs/types";
import { PROFILE_TYPES } from "@/libs/constants";

interface InstructorDashboardPageParams {
  params: { locale: string };
}

export default async function InstructorDashboardPage({
  params: { locale },
}: InstructorDashboardPageParams) {
  const profile: ProfileWithProfileTypes | null =
    await getUserProfileWithProfileTypes();

  // Ensure this is the user's current preferred dashboard
  if (profile?.defaultDashboard !== PROFILE_TYPES.INSTRUCTOR_TYPE) {
    redirect(`/dashboard/${profile?.defaultDashboard}`.toLocaleLowerCase());
  }

  return <div>The instructor dashboard page</div>;
}
