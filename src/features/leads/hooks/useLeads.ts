import { useState } from "react";
import type { Lead } from "../types";
import { seedLeads } from "../seed";
import toast from "react-hot-toast";

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>(seedLeads);

  function addLeads(lead: Lead) {
    setLeads((currentLeads) => [...currentLeads, lead]);
    toast.success(`${lead.company} added`);
  }

  function updateLead(updateLead: Lead) {
    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === updateLead.id ? updateLead : lead,
      ),
    );
    toast.success(`${updateLead.company} updated`);
  }

  function deleteLead(id: string) {
    const leadToDelete = leads.find((lead) => lead.id === id);
    setLeads((currentLeads) => currentLeads.filter((lead) => lead.id !== id));
    toast.error(`${leadToDelete?.company} deleted`);
  }

  function updateLeadStatus(id: string, status: Lead["status"]) {
    setLeads((currentLeads) =>
      currentLeads.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
    );
  }

  return { leads, addLeads, updateLead, deleteLead, updateLeadStatus };
};
