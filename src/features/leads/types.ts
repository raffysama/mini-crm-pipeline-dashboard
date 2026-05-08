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
  contact_name: string;
  email: string;
  phone: string;
  value: number;
  status: LeadStatus;
  priority: LeadPriority;
  next_follow_up: string;
  notes: string;
  created_at: string;
}
