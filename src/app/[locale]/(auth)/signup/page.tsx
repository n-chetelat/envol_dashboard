import SignupForm from "@/components/auth/signup/Signup";
import SocialAuth from "@/components/auth/socialAuth/SocialAuth";
import { unstable_setRequestLocale } from "next-intl/server";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";

export default function SignupPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("common");
  const messages = useMessages();
  return (
    <div>
      <div>
        <SocialAuth />
        <NextIntlClientProvider messages={messages}>
          <hr />
          <SignupForm />
        </NextIntlClientProvider>
      </div>
    </div>
  );
}
