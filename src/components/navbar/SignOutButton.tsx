"use client";

import { useTranslations } from "next-intl";
import { useClerk } from "@clerk/nextjs";

interface SignOutButtonProps {
  className?: string;
}

export default function SignOutButton({ className }: SignOutButtonProps) {
  const t = useTranslations("home");
  const { signOut } = useClerk();

  const onSignOut = () => {
    signOut();
  };
  return (
    <button onClick={onSignOut} className="btn-primary p-4">
      {t("signOut")}
    </button>
  );
}
