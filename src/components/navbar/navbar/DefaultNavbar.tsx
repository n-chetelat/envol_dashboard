import { getUserProfileWithProfileTypes } from "@/queries/profile";
import AvatarMenu from "@/components/navbar/AvatarMenu";
import { Link } from "@/libs/navigation";
import { ProfileWithProfileTypes } from "@/libs/types";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import LocaleSwitcher from "../localeSwitcher/LocaleSwitcher";

export default async function DefaultNavbar() {
  let profile: ProfileWithProfileTypes | null;
  try {
    profile = await getUserProfileWithProfileTypes();
  } catch {
    profile = null;
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
