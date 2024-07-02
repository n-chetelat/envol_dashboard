"use client";

import { useRouter, usePathname } from "@/libs/navigation";

type LocaleSwitcherSelectProps = {
  otherLocaleValue: string;
  otherLocaleLabel: string;
};

export default function LocaleSwitcherButton({
  otherLocaleLabel,
  otherLocaleValue,
}: LocaleSwitcherSelectProps) {
  const router = useRouter();
  const pathname = usePathname();

  function handleOnClick() {
    router.replace(pathname, { locale: otherLocaleValue });
  }

  return <button onClick={handleOnClick}>{otherLocaleLabel}</button>;
}
