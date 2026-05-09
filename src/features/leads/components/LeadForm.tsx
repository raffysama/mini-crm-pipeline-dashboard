import { useState, useEffect } from "react";
import type { Lead, LeadPriority, LeadStatus } from "../types";
import { LEAD_STATUSES } from "../constant";

interface LeadFormProps {
  onSubmit: (lead: Lead) => void;
  onCancel: () => void;
  initialData?: Lead;
}

function LeadForm({ onSubmit, onCancel, initialData }: LeadFormProps) {
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [value, setValue] = useState("");
  const [priority, setPriority] = useState<LeadPriority>("medium");
  const [status, setStatus] = useState<LeadStatus>("new");
  const [nextFollowUp, setNextFollowup] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!company || !contactName || !value) return;

    const newLead: Lead = {
      id: initialData?.id ?? crypto.randomUUID(),
      company,
      contact_name: contactName,
      email: "",
      phone: "",
      value: Number(value),
      status,
      priority,
      next_follow_up: nextFollowUp,
      notes: "",
      created_at:
        initialData?.created_at || new Date().toISOString().split("T")[0],
    };

    onSubmit(newLead);
  }
  useEffect(() => {
    if (!initialData) return;

    setCompany(initialData.company);
    setContactName(initialData.contact_name);
    setValue(initialData.value.toString());
    setPriority(initialData.priority);
    setStatus(initialData.status);
    setNextFollowup(initialData.next_follow_up);
  }, [initialData]);
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-slate-700">Company</label>
        <input
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">
          Contact Name
        </label>
        <input
          value={contactName}
          onChange={(event) => setContactName(event.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Deal Value</label>
        <input
          type="number"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Priority</label>
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value as LeadPriority)}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Status</label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as LeadStatus)}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
        >
          {LEAD_STATUSES.map((status) => (
            <option key={status.id} value={status.id}>
              {status.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">
          Next Follow-up
        </label>
        <input
          type="date"
          value={nextFollowUp}
          onChange={(event) => setNextFollowup(event.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Save Lead
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default LeadForm;
