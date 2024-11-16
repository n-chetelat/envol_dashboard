import { getTranslations } from "next-intl/server";
import { ChevronLeft } from "@/libs/icons";
import { Link } from "@/libs/navigation";
import { cn } from "@/libs/utils";

type BackLinkProps = {
  href: string;
  className?: string;
  label?: string;
};

export default async function BackLink({
  href,
  className,
  label,
}: BackLinkProps) {
  const t = await getTranslations("common");
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-row gap-2 text-lilac underline items-center  hover:text-lilac-dark",
        className,
      )}
    >
      <ChevronLeft size={16} />
      {label || t("back")}
    </Link>
  );
}
