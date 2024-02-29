import LocaleSwitcher from "../localeSwitcher/LocaleSwitcher";
import { UserButton } from "@clerk/nextjs";

export default async function Navbar() {
  return (
    <nav>
      <LocaleSwitcher />
      <UserButton />
    </nav>
  );
}
