"use client";

import LocaleSwitcher from "../localeSwitcher/LocaleSwitcher";
import { SignedIn } from "@clerk/nextjs";
import { Link } from "@/libs/navigation";
import Image from "next/image";
import AvatarMenu from "@/components/navbar/AvatarMenu";
import MobileMenuButton from "@/components/sidebar/MobileMenuButton";
import { Profile } from "@prisma/client";

interface DashboardNavbarProps {
  profile: Profile;
  toggleMobileSidebar: () => void;
}

export default function DashboardNavbar({
  profile,
  toggleMobileSidebar,
}: DashboardNavbarProps) {
  return (
    <nav className="fixed top-0 z-40 flex h-[--navbar-height] w-full flex-row justify-between bg-lilac p-6 shadow-sm">
      <div className="flex items-center">
        <div className="relative w-48">
          <Link href={`/`}>
            <Image src={`/navlogo.png`} alt="Logo" width={200} height={55} />
          </Link>
        </div>
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
          <div className="block lg:hidden">
            <MobileMenuButton onToggleMenu={toggleMobileSidebar} />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
