import { Menu } from "@/libs/icons";

export default function MobileMenuButton({ onClick }) {
  return (
    <button
      className="p-2 text-slate-700 hover:bg-slate-200 lg:hidden"
      onClick={onClick}
      aria-label="Toggle Mobile Menu"
    >
      <Menu />
    </button>
  );
}
