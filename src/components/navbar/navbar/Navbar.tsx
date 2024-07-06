import LocaleSwitcher from "../localeSwitcher/LocaleSwitcher";
import { SignedIn } from "@clerk/nextjs";
import { Link } from "@/libs/navigation";
import Image from "next/image";
import AvatarMenu from "@/components/navbar/AvatarMenu";
import { auth } from "@clerk/nextjs";
import prisma from "@/libs/prisma";

export default async function Navbar() {
  const { userId } = auth();

  const getProfile = async () => {
    if (userId) {
      const profile = await prisma.profile.findFirst({
        where: { userId },
        include: {
          students: true,
          instructors: true,
          businesses: true,
        },
      });
      return profile;
    }
  };

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
            <AvatarMenu profile={getProfile()} />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
