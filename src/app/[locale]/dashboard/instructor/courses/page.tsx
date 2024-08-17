import { getUserProfileWithProfileTypes } from "@/actions/profile";
import InstructorCourses from "@/components/dashboards/instructor/InstructorCourses";
import { ProfileWithProfileTypes, Instructor } from "@/libs/types";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { getInstructor } from "@/actions/instructor";

export default async function InstructorCoursesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  let profile: ProfileWithProfileTypes | null = null;
  let instructor: Instructor | null = null;

  try {
    profile = await getUserProfileWithProfileTypes();

    if (profile) {
      instructor = await getInstructor(profile.id);
    }
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
