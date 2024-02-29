import Navbar from "@/components/navbar/navbar/Navbar";
import { unstable_setRequestLocale } from "next-intl/server";
import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const user = await clerkClient.users.getUser(userId);
  return <div>{user ? <Navbar /> : null}</div>;
}
