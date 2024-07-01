import { unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import BusinessCourses from "@/components/dashboards/business/BusinessCourses";
import { Prisma, Profile, Business, CourseListing } from "@prisma/client";

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

  type ProfileWithBusinesses = Prisma.ProfileGetPayload<{
    include: {
      businesses: true;
    };
  }>;

  const profile: Profile | null = await prisma.profile.findFirst({
    where: { userId },
  });

  const business: Business | null = await prisma.business.findFirst({
    where: { profileId: profile?.id },
  });

  const courseListings: CourseListing[] = await prisma.courseListing.findMany({
    where: { businessId: business?.id },
  });

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
