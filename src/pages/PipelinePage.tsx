import type { Lead, LeadStatus } from "../features/leads/types";
import { LEAD_STATUSES } from "../features/leads/constant";
import LeadColumn from "../features/leads/components/LeadColumn";
import LeadCard from "../features/leads/components/LeadCard";
import { useState } from "react";
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import toast from "react-hot-toast";

interface PipelinePageProps {
  leads: Lead[];
  onUpdateLeadStatus: (leadId: string, status: LeadStatus) => void;
}

function PipelinePage({ leads, onUpdateLeadStatus }: PipelinePageProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const activeLead = leads.find((lead) => lead.id === activeId) ?? null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id.toString());
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const leadId = active.id as string;
    const newStatus = over.id as LeadStatus;
    const lead = leads.find((lead) => lead.id === leadId);

    if (!lead || lead.status === newStatus) return;

    onUpdateLeadStatus(leadId, newStatus);
    toast.success(`Moved ${lead.contactName} to ${newStatus}`);
  }

  return (
    <>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Pipeline</h1>
          <p className="text-sm text-slate-500">
            Track leads as they move through your sales process.
          </p>
        </div>

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-6">
            {LEAD_STATUSES.map((status) => {
              const statusLeads = leads.filter(
                (lead) => lead.status === status.id,
              );

              return (
                <LeadColumn
                  key={status.id}
                  status={status}
                  leads={statusLeads}
                />
              );
            })}
          </div>
          <DragOverlay>
            {activeLead ? <LeadCard lead={activeLead} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

export default PipelinePage;
