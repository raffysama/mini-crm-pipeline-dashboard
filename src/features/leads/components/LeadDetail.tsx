import type { Lead } from "../types";
import Badge from "../../../components/ui/Badge";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface LeadDetailProps {
  leads: Lead[];
  onBack: () => void;
  onEdit: (lead: Lead) => void;
  onSaveNotes: (id: string, notes: string) => Promise<void>;
}

function getStatusVariant(status: Lead["status"]) {
  if (status === "new") return "blue";
  if (status === "contacted") return "yellow";
  if (status === "demo") return "slate";
  if (status === "proposal") return "blue";
  if (status === "won") return "green";
  if (status === "lost") return "red";
  return "slate";
}

function getPriorityVariant(priority: Lead["priority"]) {
  if (priority === "high") return "red";
  if (priority === "medium") return "yellow";
  if (priority === "low") return "green";
  return "slate";
}

function LeadDetail({ leads, onBack, onEdit, onSaveNotes }: LeadDetailProps) {
  const { id } = useParams();
  const lead = leads.find((l) => l.id === id);

  const [notes, setNotes] = useState(lead?.notes || "");
  const [savingNotes, setSavingNotes] = useState(false);

  if (!lead) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-400">Lead not found.</p>
      </div>
    );
  }

  const isOverdue =
    lead.next_follow_up && new Date(lead.next_follow_up) < new Date();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={onBack}
            className="cursor-pointer flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
          >
            <i className="ti ti-arrow-left text-base" />
            Back to Leads
          </button>
        </div>

        {/* Main Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                {lead.company}
              </h1>
              <p className="mt-0.5 text-sm text-slate-500">
                {lead.contact_name}
              </p>
            </div>
            <button
              onClick={() => onEdit(lead)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <i className="ti ti-pencil mr-1" />
              Edit
            </button>
          </div>

          {/* Badges */}
          <div className="mb-6 flex gap-2">
            <Badge variant={getStatusVariant(lead.status)}>{lead.status}</Badge>
            <Badge variant={getPriorityVariant(lead.priority)}>
              {lead.priority}
            </Badge>
          </div>

          {/* Details Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Deal Value
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                ${lead.value.toLocaleString()}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Next Follow-up
              </p>
              <p
                className={`mt-1 text-lg font-semibold ${
                  isOverdue ? "text-red-500" : "text-slate-900"
                }`}
              >
                {lead.next_follow_up || "—"}
              </p>
              {isOverdue && <p className="text-xs text-red-400">Overdue</p>}
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Email
              </p>
              <p className="mt-1 text-sm text-slate-700">{lead.email || "—"}</p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Phone
              </p>
              <p className="mt-1 text-sm text-slate-700">{lead.phone || "—"}</p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Created
              </p>
              <p className="mt-1 text-sm text-slate-700">{lead.created_at}</p>
            </div>
          </div>
          {/* Notes */}
          <div className="mt-4 rounded-lg bg-slate-50 p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              Notes
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
              placeholder="Add notes about this lead..."
            />
            <button
              onClick={async () => {
                setSavingNotes(true);
                await onSaveNotes(lead.id, notes);
                setSavingNotes(false);
              }}
              disabled={savingNotes}
              className="cursor-pointer mt-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {savingNotes ? "Saving..." : "Save Notes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadDetail;
