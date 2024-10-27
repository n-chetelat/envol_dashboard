import { getTranslations } from "next-intl/server";
import { cn } from "@/libs/utils";

type SearchProps = {
  className?: string;
};

export default async function Search({ className }: SearchProps) {
  const t = await getTranslations();
  return (
    <div className={cn("flex flex-row gap-4 items-center", className)}>
      <label htmlFor="search" className="label">
        {t("common.search")}
      </label>
      <input
        id="search"
        className={
          "rounded border border-gray-300 px-2 py-1.5 outline-none hover:border-gray-400 focus:outline-offset-0 focus:outline-lilac w-full"
        }
      />
    </div>
  );
}
