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
  const email = user.emailAddresses[0]?.emailAddress;
  return <div>{user ? <>{email}</> : null}</div>;
}
