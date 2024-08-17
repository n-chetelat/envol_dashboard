import { getUserProfileWithProfileTypes } from "@/actions/profile";
import { ProfileWithProfileTypes, Student } from "@/libs/types";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { getStudent } from "@/actions/student";
import StudentCourses from "@/components/dashboards/student/StudentCourses";

export default async function StudentCoursesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  let profile: ProfileWithProfileTypes | null = null;
  let student: Student | null = null;

  try {
    profile = await getUserProfileWithProfileTypes();

    if (profile) {
      student = await getStudent(profile.id);
    }
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
