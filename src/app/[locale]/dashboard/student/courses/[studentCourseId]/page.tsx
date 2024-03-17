import { unstable_setRequestLocale } from "next-intl/server";

export default function StudentCoursePage({
  params,
}: {
  params: { studentCourseId: string; locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  return (
    <div>The individual student course page: {params.studentCourseId}</div>
  );
}
