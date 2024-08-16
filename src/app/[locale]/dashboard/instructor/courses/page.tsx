import { getUserProfileWithProfileTypes } from "@/actions/profile";
import InstructorCourses from "@/components/dashboards/instructor/InstructorCourses";
import prisma from "@/libs/prisma";
import { ProfileWithProfileTypes } from "@/types";
import { Instructor } from "@prisma/client";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

export default async function InstructorCoursesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  let profile: ProfileWithProfileTypes | null;
  let instructor: Instructor | null;

  try {
    profile = await getUserProfileWithProfileTypes();

    instructor = await prisma.instructor.findFirst({
      where: { profileId: profile?.id },
    });
  } catch {
    profile = null;
    instructor = null;
  }

  return (
    <div className="flex">
      The list of instructor courses
      <NextIntlClientProvider messages={messages}>
        <InstructorCourses profile={profile} instructor={instructor} />
      </NextIntlClientProvider>
    </div>
  );
}
