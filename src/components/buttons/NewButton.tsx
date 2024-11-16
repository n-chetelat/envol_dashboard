import { getTranslations } from "next-intl/server";
import { Plus } from "@/libs/icons";
import { Link } from "@/libs/navigation";
import { cn } from "@/libs/utils";
import Button from "@/components/buttons/Button";

type NewButtonProps = {
  href: string;
  label?: string;
  className?: string;
};

export default async function NewButton({
  href,
  className,
  label,
}: NewButtonProps) {
  const t = await getTranslations("common");
  return (
    <Link href={href}>
      <Button
        isSubmitting={false}
        className={cn("py-2 px-4 flex flex-row gap-1 items-center", className)}
        type="button"
      >
        <Plus size={20} strokeWidth={3} />
        {label || t("create")}
      </Button>
    </Link>
  );
}
