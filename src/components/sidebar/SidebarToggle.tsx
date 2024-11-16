import { ChevronLeft, ChevronRight } from "@/libs/icons";

export default function SidebarToggle({ isExpanded, onClick }) {
  return (
    <button
      className="rounded-full bg-gray-200 p-2 text-gray-700 shadow-md hover:bg-gray-300"
      onClick={onClick}
      aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
    >
      {isExpanded ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
}
