import { unstable_setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getBusiness } from "@/queries/business";
import { getCourseDescriptions } from "@/queries/course";
import { Business, CourseDescription } from "@/libs/types";

export default async function BusinessCoursesInfoPage({
  locale,
}: {
  locale: string;
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("courses");

  let business: Business | null = null;
  try {
    business = await getBusiness();
  } catch (error) {
    console.log(
      "There was an error while fetching the business profile for this account",
    );
  }

  const courseDescriptions: CourseDescription[] = await getCourseDescriptions();

  return (
    <>
      <ul>
        {courseDescriptions.map((courseDescription) => (
          <li key={courseDescription.id}>
            <a
              href={`/dashboard/business/courses/info/${courseDescription.id}`}
            >
              {courseDescription.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
