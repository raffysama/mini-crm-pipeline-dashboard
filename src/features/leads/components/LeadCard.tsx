import type { Lead } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

interface LeadCardProps {
  lead: Lead;
}

function LeadCard({ lead }: LeadCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={`rounded-lg border border-slate-200 p-3 bg-white cursor-grab active:cursor-grabbing transition-opacity ${
          isDragging ? "opacity-0" : "opacity-100"
        }`}
      >
        <h3 className="font-medium text-slate-900">{lead.company}</h3>
        <p className="text-sm text-slate-500">{lead.contact_name}</p>
        <p className="mt-2 text-sm font-medium text-slate-700">
          ${lead.value.toLocaleString()}
        </p>
      </div>
    </>
  );
}

export default LeadCard;
