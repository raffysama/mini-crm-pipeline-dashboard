import type { Lead } from "../features/leads/types";
import StatCard from "../components/ui/StatCard";
import ChartsSection from "../features/leads/components/ChartsSection";

interface DashboardPageProps {
  leads: Lead[];
}

export default function DashboardPage({ leads }: DashboardPageProps) {
  const totalLeads = leads.length;
  const wonDeals = leads.filter((l) => l.status === "won").length;
  const openDeals = leads.filter(
    (l) => l.status !== "won" && l.status !== "lost",
  ).length;
  const pipelineValue = leads
    .filter((l) => l.status !== "lost")
    .reduce((total, lead) => total + lead.value, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-xl font-medium text-slate-900">Dashboard</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Overview of your CRM pipeline performance.
          </p>
        </div>

        <div className="mb-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Leads"
            value={totalLeads}
            icon="ti-users"
            iconBg="#EEEDFE"
            iconColor="#3C3489"
            trend="All leads in pipeline"
          />
          <StatCard
            label="Open Deals"
            value={openDeals}
            icon="ti-briefcase"
            iconBg="#E6F1FB"
            iconColor="#0C447C"
            trend="Active opportunities"
          />
          <StatCard
            label="Pipeline Value"
            value={`$${pipelineValue.toLocaleString()}`}
            icon="ti-chart-bar"
            iconBg="#FAEEDA"
            iconColor="#633806"
            trend="Excluding lost deals"
            trendColor="text-amber-700"
          />
          <StatCard
            label="Won Deals"
            value={wonDeals}
            icon="ti-trophy"
            iconBg="#EAF3DE"
            iconColor="#27500A"
            trend="Closed successfully"
          />
        </div>

        <ChartsSection leads={leads} />
      </div>
    </div>
  );
}
