import { useState, useEffect } from "react";
import type { Lead } from "../types";
import { supabase } from "../../../lib/supabaseClient";
import toast from "react-hot-toast";

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      setLoading(true);

      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch leads error:", error);
        setLoading(false);
        return;
      }

      setLeads(data || []);
      setLoading(false);
    }

    fetchLeads();
  }, []);

  async function addLeads(lead: Lead) {
    const { id, ...leadWithoutId } = lead; // removes id

    const { data, error } = await supabase
      .from("leads")
      .insert([leadWithoutId])
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }
    toast.success("Lead created");
    setLeads((prev) => [...prev, data]);
  }

  async function updateLead(updatedLead: Lead) {
    const { data, error } = await supabase
      .from("leads")
      .update(updatedLead)
      .eq("id", updatedLead.id)
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }
    toast.success("Lead updated");
    setLeads((prev) =>
      prev.map((lead) => (lead.id === updatedLead.id ? data : lead)),
    );
  }

  async function deleteLead(id: string) {
    const { error } = await supabase.from("leads").delete().eq("id", id);

    if (error) {
      console.error(error);
      return;
    }
    toast.error("Lead deleted");
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  async function updateLeadStatus(id: string, status: Lead["status"]) {
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
    );
  }

  return { leads, addLeads, updateLead, deleteLead, updateLeadStatus };
};
