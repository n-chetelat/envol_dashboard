import { getUserProfileWithProfileTypes } from "@/queries/profile";
import { getBusiness, getBusnessCourseListings } from "@/queries/business";
import { ProfileWithProfileTypes, Business, CourseListing } from "@/libs/types";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@clerk/nextjs";
import { redirect } from "@/libs/navigation";

export default async function BusinessCoursesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

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
        <NextIntlClientProvider messages={messages}>
          <div>{JSON.stringify(courseListings)}</div>
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
