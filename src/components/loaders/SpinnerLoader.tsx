import { LoaderPinwheel } from "@/libs/icons";

export default function SpinnerLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderPinwheel
        strokeWidth={1}
        className="h-32 w-32 animate-spin-change-color"
      />
    </div>
  );
}
