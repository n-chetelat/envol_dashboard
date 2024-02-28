import Navbar from "@/components/navbar/navbar/Navbar";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <div>
      <Navbar />
    </div>
  );
}
