import prisma from "@/libs/prisma";
import { auth } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Sidebar from "./Sidebar";

export default async function SidebarWrapper() {
  const messages = await getMessages();
  const { userId } = auth();
  const profile = await prisma.profile.findFirst({
    where: { userId },
    include: {
      students: true,
      instructors: true,
      businesses: true,
    },
  });

  return (
    <div className="h-screen">
      <NextIntlClientProvider messages={messages}>
        <Sidebar profile={profile} />;
      </NextIntlClientProvider>
    </div>
  );
}
