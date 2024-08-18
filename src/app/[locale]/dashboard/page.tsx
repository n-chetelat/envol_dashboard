import { getUserProfileWithProfileTypes } from "@/actions/profile";
import { redirect } from "@/libs/navigation";
import { ProfileWithProfileTypes } from "@/libs/types";
import SpinnerLoader from "@/components/loaders/SpinnerLoader";

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

  redirect(`/dashboard/${profile?.defaultDashboard}`.toLocaleLowerCase());

  // There could be an explicit router here that lets user select what profile
  // they want to navigate to, for example, if there is no default dashboard stored.
  return <SpinnerLoader />;
}
