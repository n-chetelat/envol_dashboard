import LocaleSwitcher from "../localeSwitcher/LocaleSwitcher";
import { UserButton } from "@clerk/nextjs";
import { Link } from "@/libs/navigation";
import Image from "next/image";

export default async function Navbar() {
  return (
    <nav className="fixed top-0 z-40 flex h-20 w-full flex-row justify-between bg-lilac-light p-4 shadow-sm">
      <div className="relative w-48">
        <Image src={`/navlogo.png`} alt="Logo" width={140} height={55} />
      </div>
      <div className="flex flex-row items-center">
        <div className="m-4 hover:text-lilac-dark">
          <LocaleSwitcher />
        </div>
        <div className="m-4">
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
