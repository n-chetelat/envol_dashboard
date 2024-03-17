import LocaleSwitcher from "../localeSwitcher/LocaleSwitcher";
import { UserButton } from "@clerk/nextjs";
import { Link } from "@/libs/navigation";
import Image from "next/image";

export default async function Navbar() {
  return (
    <nav className="bg-lilac-light sticky top-0 z-40 flex h-20 flex-row justify-between p-4 shadow-sm">
      <div className="relative w-48">
        <Image src={`/navlogo.png`} alt="Logo" width={140} height={55} />
      </div>
      <div className="flex flex-row items-center">
        <div className="hover:text-lilac-dark m-4">
          <LocaleSwitcher />
        </div>
        <div className="m-4">
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
