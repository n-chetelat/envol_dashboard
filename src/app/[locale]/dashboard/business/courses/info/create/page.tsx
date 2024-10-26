import { unstable_setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getBusiness } from "@/queries/business";
import { Business } from "@/libs/types";
import BusinessCoursesInfoForm from "@/components/forms/BusinessCourseDescForm";
import BackLink from "@/components/navigation/BackLink";

export default async function BusinessCoursesInfoEditPage({
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

  return (
    <>
      {business ? (
        <div className="p-8 flex flex-col gap-4">
          <h2 className="title">{t("courses.newClassDesc")}</h2>
          <BackLink href={"/dashboard/business/courses/info"} />
          <BusinessCoursesInfoForm
            businessId={business.id}
            businessCourseDescription={null}
          />
        </div>
      ) : null}
    </>
  );
}
