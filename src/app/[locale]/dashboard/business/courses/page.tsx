import { getUserProfileWithProfileTypes } from "@/actions/profile";
import { getBusiness, getBusnessCourseListings } from "@/actions/business";
import { ProfileWithProfileTypes, Business, CourseListing } from "@/libs/types";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import BusinessCourses from "@/components/dashboards/business/BusinessCourses";

export default async function BusinessCoursesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  let profile: ProfileWithProfileTypes | null = null;
  let business: Business | null = null;
  let courseListings: CourseListing[] = [];

  try {
    profile = await getUserProfileWithProfileTypes();

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
        <NextIntlClientProvider messages={messages}>
          <BusinessCourses
            profile={profile}
            business={business}
            courseListings={courseListings}
          />
        </NextIntlClientProvider>
      ) : (
        <p>
          Please fill out your business profile under Settings before creating
          your classes
        </p>
      )}
    </div>
  );
}
