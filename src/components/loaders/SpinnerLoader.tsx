import { LoaderPinwheel } from "@/libs/icons";

export default function SpinnerLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderPinwheel className="h-32 w-32 animate-spin-change-color" />
    </div>
  );
}
