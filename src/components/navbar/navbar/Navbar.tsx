import SignOutButton from "@/components/navbar/SignOutButton";
import { Link } from "@/libs/navigation";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import LocaleSwitcher from "@/components/navbar/localeSwitcher/LocaleSwitcher";
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
        <div className="m-2 lg:m-4">
          <LocaleSwitcher />
        </div>
        <SignedIn>
          <p>|</p>
          <div className="m-2 lg:m-4">
            <SignOutButton />
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
