import { LoaderPinwheel } from "@/libs/icons";

export default function SpinnerLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoaderPinwheel className="animate-spin-change-color h-32 w-32" />
    </div>
  );
}
