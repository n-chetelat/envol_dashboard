import { getUserProfileWithProfileTypes } from "@/actions/profile";
import { redirect } from "@/libs/navigation";
import { ProfileWithProfileTypes } from "@/libs/types";
import { PROFILE_TYPES } from "@/libs/constants";

interface StudentDashboardPageParams {
  params: { locale: string };
}

export default async function StudentDashboardPage({
  params: { locale },
}: StudentDashboardPageParams) {
  const profile: ProfileWithProfileTypes | null =
    await getUserProfileWithProfileTypes();

  // Ensure this is the user's current preferred dashboard
  if (profile?.defaultDashboard !== PROFILE_TYPES.STUDENT_TYPE) {
    redirect(`/dashboard/${profile?.defaultDashboard}`.toLocaleLowerCase());
  }

  return <div>The student dashboard page</div>;
}
