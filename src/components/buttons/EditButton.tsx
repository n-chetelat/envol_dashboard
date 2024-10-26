import { getTranslations } from "next-intl/server";
import { Pencil } from "@/libs/icons";
import { Link } from "@/libs/navigation";
import { cn } from "@/libs/utils";
import Button from "@/components/buttons/Button";

type EditButtonProps = {
  href: string;
  label?: string;
  className?: string;
};

export default async function EditButton({
  href,
  className,
  label,
}: EditButtonProps) {
  const t = await getTranslations("common");
  return (
    <Link href={href}>
      <Button
        isSubmitting={false}
        className={cn("py-2 px-4 flex flex-row gap-2", className)}
        isSubmitType={false}
      >
        <Pencil size={20} />
        {label || t("edit")}
      </Button>
    </Link>
  );
}
