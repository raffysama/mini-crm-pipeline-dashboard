import type { LeadStatus } from "./types";

export const LEAD_STATUSES: { id: LeadStatus; label: string }[] = [
  { id: "new", label: "New Lead" },
  { id: "contacted", label: "Contacted" },
  { id: "demo", label: "Demo Schedule" },
  { id: "proposal", label: "Proposal" },
  { id: "won", label: "Won" },
  { id: "lost", label: "Lost" },
];
