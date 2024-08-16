import { getUserProfileWithProfileTypes } from "@/actions/profile";
import StudentCourses from "@/components/dashboards/student/StudentCourses";
import prisma from "@/libs/prisma";
import { ProfileWithProfileTypes } from "@/types";
import { Student } from "@prisma/client";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

export default async function StudentCoursesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  let profile: ProfileWithProfileTypes | null;
  let student: Student | null;

  try {
    profile = await getUserProfileWithProfileTypes();

    student = await prisma.student.findFirst({
      where: { profileId: profile?.id },
    });
  } catch {
    profile = null;
    student = null;
  }

  return (
    <div className="flex">
      The list of student courses
      <NextIntlClientProvider messages={messages}>
        <StudentCourses profile={profile} student={student} />
      </NextIntlClientProvider>
    </div>
  );
}
