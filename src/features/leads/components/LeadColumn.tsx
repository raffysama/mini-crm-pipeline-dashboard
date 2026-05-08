import type { Lead, LeadStatus } from "../types";
import LeadCard from "./LeadCard";
import { useDroppable } from "@dnd-kit/core";

interface LeadColumnProps {
  status: {
    id: LeadStatus;
    label: string;
  };

  leads: Lead[];
}

function LeadColumn({ status, leads }: LeadColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status.id });

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700">{status.label}</h2>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
          {leads.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={`space-y-3 min-h-[100px] rounded-lg transition-colors ${
          isOver ? "bg-blue-50 ring-2 ring-blue-200" : ""
        }`}
      >
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}

        {leads.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-200 p-3 text-sm text-slate-400">
            {isOver ? "Drop here" : "No leads"}
          </p>
        )}
      </div>
    </div>
  );
}

export default LeadColumn;
