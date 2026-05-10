import { useState, useEffect } from "react";
import type { Lead } from "../features/leads/types";
import LeadTable from "../features/leads/components/LeadTable";
import LeadForm from "../features/leads/components/LeadForm";
import { LEAD_STATUSES } from "../features/leads/constant";
import Modal from "../components/ui/Modal";

interface LeadsPageProps {
  leads: Lead[];
  onAddLead: (lead: Lead) => void;
  onDeleteLead: (id: string) => void;
  onEditLead: (lead: Lead) => void;
  onViewLead: (lead: Lead) => void;
  initialEditingLead;
  onClearEditingLead;
}

function LeadsPage({
  leads,
  onAddLead,
  onDeleteLead,
  onEditLead,
  onViewLead,
  initialEditingLead,
  onClearEditingLead,
}: LeadsPageProps) {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter((lead) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      lead.company.toLowerCase().includes(searchValue) ||
      lead.contact_name.toLowerCase().includes(searchValue);

    const matchesPriority =
      priorityFilter === "all" || lead.priority === priorityFilter;

    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });
  const sortedLeads = [...filteredLeads].sort((a, b) => b.value - a.value);

  const handleOpenDeleteModal = (id: string) => {
    setSelectedLeadId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedLeadId) return;

    onDeleteLead(selectedLeadId);

    setIsDeleteModalOpen(false);
    setSelectedLeadId(null);
  };

  const handleOpenEdit = (lead: Lead) => {
    setEditingLead(lead);
    setIsEditOpen(true);
  };
  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setEditingLead(null);
  };
  useEffect(() => {
    if (initialEditingLead) {
      setEditingLead(initialEditingLead);
      setIsEditOpen(true);
      onClearEditingLead?.();
    }
  }, [initialEditingLead]);
  return (
    <>
      <div className="p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Leads</h1>
            <p className="text-sm text-slate-500">
              View and manage all CRM leads in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="cursor-pointer rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            + New Lead
          </button>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search company or contact..."
            className="w-full max-w-md rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
          />

          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 sm:w-44"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 sm:w-48"
          >
            <option value="all">All Status</option>
            {LEAD_STATUSES.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <LeadTable
          leads={sortedLeads}
          onDeleteLead={handleOpenDeleteModal}
          onEditLead={handleOpenEdit}
          onViewLead={onViewLead}
        />
        {isEditOpen && editingLead && (
          <Modal title="Edit Lead" onClose={handleCloseEdit}>
            <LeadForm
              initialData={editingLead}
              onCancel={handleCloseEdit}
              onSubmit={(updatedLead) => {
                onEditLead(updatedLead);
                handleCloseEdit();
              }}
            />
          </Modal>
        )}
        {isDeleteModalOpen && (
          <Modal
            title="Delete Lead"
            onClose={() => setIsDeleteModalOpen(false)}
          >
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                Are you sure you want to delete this lead?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="cursor-pointer rounded-lg border px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirmDelete}
                  className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        )}
        {isCreateOpen && (
          <Modal title="New Lead" onClose={() => setIsCreateOpen(false)}>
            <LeadForm
              onSubmit={(lead) => {
                onAddLead(lead);
                setIsCreateOpen(false);
              }}
              onCancel={() => setIsCreateOpen(false)}
            />
          </Modal>
        )}
      </div>
    </>
  );
}

export default LeadsPage;
