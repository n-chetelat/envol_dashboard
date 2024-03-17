import { unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import InstructorCourses from "@/components/dashboards/instructor/InstructorCourses";
import { Prisma, Instructor } from "@prisma/client";

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

  type ProfileWithInstructorProfile = Prisma.ProfileGetPayload<{
    include: {
      instructorProfile: true;
    };
  }>;

  const profile: ProfileWithInstructorProfile | null =
    await prisma.profile.findFirst({
      where: { userId },
      include: {
        instructorProfile: true,
      },
    });

  const instructor: Instructor | null = await prisma.instructor.findFirst({
    where: { instructorProfileId: profile?.instructorProfile?.id },
  });

  return (
    <div className="flex">
      The list of instructor courses
      <NextIntlClientProvider messages={messages}>
        <InstructorCourses profile={profile} instructor={instructor} />
      </NextIntlClientProvider>
    </div>
  );
}
