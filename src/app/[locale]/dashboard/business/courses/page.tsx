import { unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/libs/navigation";

export default async function BusinessCoursesPage({
  locale,
}: {
  locale: string;
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <h1>The business classes page</h1>
      <h2>Places you can navigate to from here:</h2>
      <ul>
        <li>
          <Link href="/dashboard/business/courses/schedule">
            Schedule a course
          </Link>
        </li>
        <li>
          <Link href="/dashboard/business/courses/info">
            See your course descriptions
          </Link>
        </li>
        <li>
          <Link href="/dashboard/business/courses/info/edit">
            Create a course description
          </Link>
        </li>
      </ul>
    </>
  );
}
