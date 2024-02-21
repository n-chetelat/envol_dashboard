import LocaleSwitcher from "../localeSwitcher/LocaleSwitcher";
import LogoutButton from "../logoutButton/LogoutButton";
import AuthenticatedNav from "./AuthenticatedNav";
import { auth } from "@/libs/firebase";

export default function Navbar() {
  return (
    <nav>
      <AuthenticatedNav
        children={
          <>
            <LogoutButton />
          </>
        }
        currentUser={auth.currentUser}
      />
      <LocaleSwitcher />
    </nav>
  );
}
