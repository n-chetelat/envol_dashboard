import { unstable_setRequestLocale } from "next-intl/server";

export default async function BusinessCoursesSchedulePage({
  locale,
}: {
  locale: string;
}) {
  unstable_setRequestLocale(locale);

  return <>The business classes scheduling page</>;
}
