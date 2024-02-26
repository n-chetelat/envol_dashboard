import LocaleSwitcher from "../localeSwitcher/LocaleSwitcher";
import LogoutButton from "../logoutButton/LogoutButton";
import AuthenticatedNav from "./AuthenticatedNav";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function Navbar() {
  const messages = useMessages();
  return (
    <nav>
      <AuthenticatedNav
        children={
          <>
            <NextIntlClientProvider messages={messages}>
              <LogoutButton />
            </NextIntlClientProvider>
          </>
        }
      />
      <LocaleSwitcher />
    </nav>
  );
}
