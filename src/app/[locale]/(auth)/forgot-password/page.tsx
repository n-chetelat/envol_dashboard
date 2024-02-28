import ForgotPasswordForm from "@/components/auth/forgotPassword/ForgotPassword";
import { unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();
  return (
    <div>
      <div>
        <NextIntlClientProvider messages={messages}>
          <ForgotPasswordForm />
        </NextIntlClientProvider>
      </div>
    </div>
  );
}
