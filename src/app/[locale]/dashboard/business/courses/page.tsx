import { getUserProfileWithProfileTypes } from "@/queries/profile";
import { getBusiness, getBusnessCourseListings } from "@/queries/business";
import { ProfileWithProfileTypes, Business, CourseListing } from "@/libs/types";
import { unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "@/libs/navigation";

export default async function BusinessCoursesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  let profile: ProfileWithProfileTypes | null = null;
  let business: Business | null = null;
  let courseListings: CourseListing[] = [];

  try {
    if (userId) profile = await getUserProfileWithProfileTypes(userId);

    if (profile) {
      business = await getBusiness(profile.id);

      if (business)
        courseListings = await getBusnessCourseListings(business.id);
    }
  } catch (error) {
    console.error(error);
    profile = null;
    business = null;
  }

  return (
    <div className="flex">
      {business && business.name ? (
        <div>{JSON.stringify(courseListings)}</div>
      ) : (
        <p>
          Please fill out your business profile under Settings before creating
          your classes
        </p>
      )}
    </div>
  );
}
