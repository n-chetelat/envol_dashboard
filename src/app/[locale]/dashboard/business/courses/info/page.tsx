import { unstable_setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getBusiness } from "@/queries/business";
import { getCourseDescriptions } from "@/queries/course";
import { Business, CourseDescription } from "@/libs/types";
import NewButton from "@/components/buttons/NewButton";
import BusinessCourseInfoCard from "@/components/dashboards/business/BusinessCourseInfoCard";
import Search from "@/components/search/Search";

export default async function BusinessCoursesInfoPage({
  locale,
}: {
  locale: string;
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

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
    <div className="p-8 flex flex-col gap-8 w-full">
      <h2 className="title">{t("courses.yourClasses")}</h2>
      <div className="flex flex-row gap-4 justify-between">
        <Search className="w-1/2" />
        <NewButton href="/dashboard/business/courses/info/create" />
      </div>
      <ul className="flex flex-col gap-4">
        {courseDescriptions.map((courseDescription) => (
          <li key={courseDescription.id}>
            <BusinessCourseInfoCard businessCourseInfo={courseDescription} />
          </li>
        ))}
      </ul>
    </div>
  );
}
