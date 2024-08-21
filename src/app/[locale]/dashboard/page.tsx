import { getUserProfileWithProfileTypes } from "@/queries/profile";
import { redirect } from "@/libs/navigation";
import { ProfileWithProfileTypes } from "@/libs/types";
import { PROFILE_TYPES } from "@/libs/constants";
import BusinessDashboard from "@/components/dashboards/BusinessDashboard";
import InstructorDashboard from "@/components/dashboards/InstructorDashboard";
import StudentDashboard from "@/components/dashboards/StudentDashboard";

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

  const getDefaultDashboard = () => {
    let DashboardComponent;
    if (profile?.defaultDashboard === PROFILE_TYPES.BUSINESS_TYPE) {
      DashboardComponent = BusinessDashboard;
    } else if (profile?.defaultDashboard === PROFILE_TYPES.INSTRUCTOR_TYPE) {
      DashboardComponent = InstructorDashboard;
    } else if (profile?.defaultDashboard === PROFILE_TYPES.STUDENT_TYPE) {
      DashboardComponent = StudentDashboard;
    } else {
      return null;
    }
    return <DashboardComponent profile={profile} />;
  };

  // There could be an explicit router here that lets user select what profile
  // they want to navigate to, for example, if there is no default DashboardComponent stored.

  return <>{getDefaultDashboard()}</>;
}
