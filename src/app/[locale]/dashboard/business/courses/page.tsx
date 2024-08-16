import { getUserProfileWithProfileTypes } from "@/actions/profile";
import BusinessCourses from "@/components/dashboards/business/BusinessCourses";
import prisma from "@/libs/prisma";
import { ProfileWithProfileTypes } from "@/types";
import { Business, CourseListing } from "@prisma/client";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

export default async function BusinessCoursesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  let profile: ProfileWithProfileTypes | null;
  let business: Business | null;
  let courseListings: CourseListing[] = [];

  try {
    profile = await getUserProfileWithProfileTypes();

    business = await prisma.business.findFirst({
      where: { profileId: profile?.id },
    });

    courseListings = await prisma.courseListing.findMany({
      where: { businessId: business?.id },
    });
  } catch {
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
          Please fill out your business profile under Settings before crating
          your classes
        </p>
      )}
    </div>
  );
}
