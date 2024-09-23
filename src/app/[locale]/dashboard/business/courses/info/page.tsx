import { unstable_setRequestLocale } from "next-intl/server";

export default async function BusinessCoursesInfoPage({
  locale,
}: {
  locale: string;
}) {
  unstable_setRequestLocale(locale);

  return <>The page for listing course descriptions</>;
}
