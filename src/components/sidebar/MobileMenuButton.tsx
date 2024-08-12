import { Menu } from "@/libs/icons";

export default function MobileMenuButton({ onToggleMenu }) {
  return (
    <button
      className="p-2 text-slate-700 hover:bg-slate-200"
      onClick={onToggleMenu}
      aria-label="Toggle Mobile Menu"
    >
      <Menu />
    </button>
  );
}
