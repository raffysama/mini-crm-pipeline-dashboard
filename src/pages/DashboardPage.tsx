import type { Lead } from "../features/leads/types";
import StatCard from "../components/ui/StatCard";

interface DashboardPageProps {
  leads: Lead[];
}

function DashboardPage({ leads }: DashboardPageProps) {
  const totalLeads = leads.length;

  const wonDeals = leads.filter((leads) => leads.status === "won").length;

  const openDeals = leads.filter(
    (leads) => leads.status !== "won" && leads.status !== "lost",
  ).length;

  const pipeLineValue = leads
    .filter((leads) => leads.status !== "lost")
    .reduce((total, lead) => total + lead.value, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">
            Overview of your CRM pipeline performance.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Leads" value={totalLeads} />
          <StatCard label="Open Deals" value={openDeals} />
          <StatCard
            label="Pipeline Value"
            value={`$${pipeLineValue.toLocaleString()}`}
          />
          <StatCard label="Won Deals" value={wonDeals} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
