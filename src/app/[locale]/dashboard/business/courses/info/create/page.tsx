import { unstable_setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getBusiness } from "@/queries/business";
import { Business } from "@/libs/types";
import BusinessCoursesInfoForm from "@/components/forms/BusinessCourseDescForm";

export default async function BusinessCoursesInfoEditPage({
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

  return (
    <>
      {business ? (
        <div className="p-8">
          <h2 className="title mb-4">{t("newClassDesc")}</h2>
          <BusinessCoursesInfoForm
            businessId={business.id}
            businessCourseDescription={null}
          />
        </div>
      ) : null}
    </>
  );
}
