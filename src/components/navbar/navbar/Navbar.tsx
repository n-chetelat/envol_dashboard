import LocaleSwitcher from "../localeSwitcher/LocaleSwitcher";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { Link } from "@/libs/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("home");
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
            <SignOutButton redirecturl="/">
              <button className="font-serif text-white">{t("signOut")}</button>
            </SignOutButton>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
