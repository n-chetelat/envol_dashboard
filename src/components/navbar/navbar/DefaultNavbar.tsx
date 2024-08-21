import { getUserProfileWithProfileTypes } from "@/queries/profile";
import AvatarMenu from "@/components/navbar/AvatarMenu";
import { Link } from "@/libs/navigation";
import { ProfileWithProfileTypes } from "@/libs/types";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import LocaleSwitcher from "../localeSwitcher/LocaleSwitcher";
import { auth } from "@clerk/nextjs";

export default async function DefaultNavbar() {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  const profile: ProfileWithProfileTypes | null =
    await getUserProfileWithProfileTypes(userId);
  if (!profile) {
    redirect("/profile_setup");
  }

  return (
    <nav className="fixed top-0 z-40 flex h-[--navbar-height] w-full flex-row justify-between bg-lilac p-6 shadow-sm">
      <div className="relative w-48">
        <Link href={`/`}>
          <Image src={`/navlogo.png`} alt="Logo" width={200} height={55} />
        </Link>
      </div>
      <div className="flex flex-row items-center">
        <div className="m-4">
          <LocaleSwitcher />
        </div>
        <SignedIn>
          <p>|</p>
          <div className="m-4">
            <AvatarMenu profile={profile} />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
