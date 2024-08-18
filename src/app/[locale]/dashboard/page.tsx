import { getUserProfileWithProfileTypes } from "@/actions/profile";
import { PROFILE_TYPES } from "@/libs/constants";
import { redirect } from "@/libs/navigation";
import { ProfileWithProfileTypes } from "@/libs/types";

interface DashboardPageParams {
  params: { locale: string };
}

export default async function DashboardPage({
  params: { locale },
}: DashboardPageParams) {
  const profile: ProfileWithProfileTypes | null =
    await getUserProfileWithProfileTypes();

  if (!profile) {
    redirect("/profile_setup");
  }

  return (
    <div>
      {profile.defaultDashboard === PROFILE_TYPES.BUSINESS_TYPE && (
        <div>The business dashboard</div>
      )}
      {profile.defaultDashboard === PROFILE_TYPES.INSTRUCTOR_TYPE && (
        <div>The instructor dashboard</div>
      )}
      {profile.defaultDashboard === PROFILE_TYPES.STUDENT_TYPE && (
        <div>The student dashboard</div>
      )}
    </div>
  );
}
