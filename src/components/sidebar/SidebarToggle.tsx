import { ChevronLeft, ChevronRight } from "@/libs/icons";

export default function SidebarToggle({ isExpanded, onClick }) {
  return (
    <button
      className="absolute -right-4 bottom-48 rounded-full bg-slate-200 p-2 text-slate-700 shadow-md hover:bg-slate-300"
      onClick={onClick}
      aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
    >
      {isExpanded ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
}
