import { Link } from "@/libs/navigation";
import { SignedIn } from "@clerk/nextjs";
import UserMenu from "@/components/navbar/UserMenu";
import Image from "next/image";
import LocaleSwitcher from "@/components/navbar/LocaleSwitcher";
import MobileMenuButton from "@/components/sidebar/MobileMenuButton";

type NavbarProps = {
  isDashboard?: boolean;
};

export default async function tNavbar({ isDashboard }: NavbarProps) {
  return (
    <nav className="fixed top-0 z-40 flex h-[--navbar-height] w-full flex-row justify-between bg-lilac p-2 shadow-sm lg:h-[--navbar-height-lg] lg:p-6">
      <div className="relative w-36 lg:w-48">
        <Link href={`/`}>
          <Image
            src={`/navlogo.png`}
            alt="Logo"
            width={200}
            height={55}
            className="h-auto w-32 lg:w-48"
          />
        </Link>
      </div>
      <div className="flex flex-row items-center">
        <div className="m-2">
          <LocaleSwitcher />
        </div>
        <SignedIn>
          <div className="m-2">
            <UserMenu />
          </div>
          {isDashboard && (
            <div className="block p-2 lg:hidden">
              <MobileMenuButton />
            </div>
          )}
        </SignedIn>
      </div>
    </nav>
  );
}
