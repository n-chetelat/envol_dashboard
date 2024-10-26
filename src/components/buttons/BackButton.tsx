import { getTranslations } from "next-intl/server";
import { ChevronLeft } from "@/libs/icons";
import { Link } from "@/libs/navigation";
import { cn } from "@/libs/utils";
import Button from "@/components/buttons/Button";

type BackButtonProps = {
  href: string;
  className?: string;
  label?: string;
};

export default async function BackButton({
  href,
  className,
  label,
}: BackButtonProps) {
  const t = await getTranslations("common");
  return (
    <Link href={href}>
      <Button
        isSubmitting={false}
        className={cn("py-2 px-4 flex flex-row gap-2", className)}
        isSubmitType={false}
      >
        <ChevronLeft size={20} />
        {label}
      </Button>
    </Link>
  );
}
