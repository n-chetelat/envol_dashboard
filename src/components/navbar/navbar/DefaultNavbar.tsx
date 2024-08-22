import SignOutButton from "@/components/navbar/SignOutButton";
import { Link } from "@/libs/navigation";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import LocaleSwitcher from "../localeSwitcher/LocaleSwitcher";

export default async function DefaultNavbar() {
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
            <SignOutButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
