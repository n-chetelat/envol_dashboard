import { unstable_setRequestLocale } from "next-intl/server";

export default function BusinessCoursePage({
  params,
}: {
  params: { courseId: string; locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  return <div>The individual business course page: {params.courseId}</div>;
}
