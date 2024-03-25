import { unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import BusinessCourses from "@/components/dashboards/business/BusinessCourses";
import { Prisma, Business, Course } from "@prisma/client";

export default async function StudentCoursesPage({
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

  const profile: ProfileWithBusinesses | null = await prisma.profile.findFirst({
    where: { userId },
    include: {
      businesses: true,
    },
  });

  const business: Business | null = await prisma.business.findFirst({
    where: { id: profile?.businesses[0]?.id },
  });

  const courses: Course[] = await prisma.course.findMany({
    where: { businessId: business?.id },
  });

  return (
    <div className="flex">
      <NextIntlClientProvider messages={messages}>
        <BusinessCourses
          profile={profile}
          business={business}
          courses={courses}
        />
      </NextIntlClientProvider>
    </div>
  );
}
