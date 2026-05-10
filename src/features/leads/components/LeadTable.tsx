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
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Contact</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium">Value</th>
            <th className="px-4 py-3 font-medium">Next Follow-up</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-slate-50">
              <td
                className="cursor-pointer px-4 py-3 font-medium text-slate-900"
                onClick={() => onViewLead(lead)}
              >
                {lead.company}
              </td>
              <td className="px-4 py-3 text-slate-600">{lead.contact_name}</td>
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
                  className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Edit
                </button>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onDeleteLead(lead.id)}
                  className="cursor-pointer text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {leads.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className="px-4 py-10 text-center text-sm text-slate-500"
              >
                No leads found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;
