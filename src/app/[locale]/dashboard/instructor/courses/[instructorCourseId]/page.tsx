import { unstable_setRequestLocale } from "next-intl/server";

export default function InstructorCoursePage({
  params,
}: {
  params: { instructorCourseId: string; locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  return (
    <div>The individual student course page: {params.instructorCourseId}</div>
  );
}
