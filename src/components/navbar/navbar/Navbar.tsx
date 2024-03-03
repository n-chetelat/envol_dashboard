import LocaleSwitcher from "../localeSwitcher/LocaleSwitcher";
import { UserButton } from "@clerk/nextjs";
import { Link } from "@/libs/navigation";

export default async function Navbar() {
  return (
    <nav className="flex flex-row h-20 mb-4  justify-between p-4">
      <div className="bg-blue-500 w-16 rounded-full">
        <Link href="/">Logo</Link>
      </div>
      <div className="flex flex-row items-center">
        <div className="m-4 hover:text-blue-700">
          <LocaleSwitcher />
        </div>
        <div className="m-4">
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
