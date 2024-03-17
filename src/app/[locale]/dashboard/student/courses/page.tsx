import { unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import StudentCourses from "@/components/dashboards/student/StudentCourses";
import { Prisma, Student } from "@prisma/client";

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

  type ProfileWithStudentProfile = Prisma.ProfileGetPayload<{
    include: {
      studentProfile: true;
    };
  }>;

  const profile: ProfileWithStudentProfile | null =
    await prisma.profile.findFirst({
      where: { userId },
      include: {
        studentProfile: true,
      },
    });

  const student: Student | null = await prisma.student.findFirst({
    where: { studentProfileId: profile?.studentProfile?.id },
  });

  return (
    <div className="flex">
      The list of student courses
      <NextIntlClientProvider messages={messages}>
        <StudentCourses profile={profile} student={student} />
      </NextIntlClientProvider>
    </div>
  );
}
