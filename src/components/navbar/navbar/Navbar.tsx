import LocaleSwitcher from "../localeSwitcher/LocaleSwitcher";
import LogoutButton from "../logoutButton/LogoutButton";
import AuthenticatedNav from "./AuthenticatedNav";
import { auth } from "@/libs/auth";
import { SessionProvider } from "next-auth/react";

export default async function Navbar() {
  const session = await auth();
  return (
    <nav>
      <SessionProvider session={session}>
        <AuthenticatedNav
          children={
            <>
              <LogoutButton />
            </>
          }
        />
      </SessionProvider>
      <LocaleSwitcher />
    </nav>
  );
}
