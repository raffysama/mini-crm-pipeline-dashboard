export type LeadStatus =
  | "new"
  | "contacted"
  | "demo"
  | "proposal"
  | "won"
  | "lost";

export type LeadPriority = "low" | "medium" | "high";

export interface Lead {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  value: number;
  status: LeadStatus;
  priority: LeadPriority;
  nextFollowUp: string;
  notes: string;
  createdAt: string;
}
