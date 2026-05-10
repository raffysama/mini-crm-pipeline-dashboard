import type { Lead } from "../types";
import Badge from "../../../components/ui/Badge";

interface LeadTableProps {
  leads: Lead[];
  onDeleteLead: (id: string) => void;
  onEditLead: (lead: Lead) => void;
  onViewLead: (lead: Lead) => void;
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

function LeadTable({
  leads,
  onDeleteLead,
  onEditLead,
  onViewLead,
}: LeadTableProps) {
  if (leads.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500 shadow-sm">
        No leads found.
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Priority</th>
              <th className="px-4 py-3 font-medium">Value</th>
              <th className="px-4 py-3 font-medium">Next Follow-up</th>
              <th className="px-4 py-3 font-medium"></th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50">
                <td
                  className="cursor-pointer px-4 py-3 font-medium text-slate-900 hover:text-blue-600"
                  onClick={() => onViewLead(lead)}
                >
                  {lead.company}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {lead.contact_name}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={getStatusVariant(lead.status)}>
                    {lead.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={getPriorityVariant(lead.priority)}>
                    {lead.priority}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  ${lead.value.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  {lead.next_follow_up ? (
                    <span
                      className={
                        new Date(lead.next_follow_up) < new Date()
                          ? "font-medium text-red-500"
                          : "text-slate-600"
                      }
                    >
                      {lead.next_follow_up}
                    </span>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => onEditLead(lead)}
                    className="cursor-pointer text-sm font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => onDeleteLead(lead.id)}
                    className="cursor-pointer text-sm font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div
              className="mb-2 cursor-pointer"
              onClick={() => onViewLead(lead)}
            >
              <p className="font-medium text-slate-900 hover:text-blue-600">
                {lead.company}
              </p>
              <p className="text-xs text-slate-500">{lead.contact_name}</p>
            </div>

            <div className="mb-3 flex gap-2">
              <Badge variant={getStatusVariant(lead.status)}>
                {lead.status}
              </Badge>
              <Badge variant={getPriorityVariant(lead.priority)}>
                {lead.priority}
              </Badge>
            </div>

            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-slate-500">Value</span>
              <span className="font-medium text-slate-900">
                ${lead.value.toLocaleString()}
              </span>
            </div>

            {lead.next_follow_up && (
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-slate-500">Follow-up</span>
                <span
                  className={
                    new Date(lead.next_follow_up) < new Date()
                      ? "font-medium text-red-500"
                      : "text-slate-600"
                  }
                >
                  {lead.next_follow_up}
                </span>
              </div>
            )}

            <div className="flex gap-3 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => onEditLead(lead)}
                className="cursor-pointer text-sm font-medium text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDeleteLead(lead.id)}
                className="cursor-pointer text-sm font-medium text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default LeadTable;
