import type { Lead } from "../features/leads/types";
import StatCard from "../components/ui/StatCard";
import ChartsSection from "../features/leads/components/ChartsSection";

interface DashboardPageProps {
  leads: Lead[];
  loading?: boolean;
}

function StatCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="h-3 w-24 rounded bg-slate-200" />
        <div className="h-8 w-8 rounded-lg bg-slate-200" />
      </div>
      <div className="h-7 w-16 rounded bg-slate-200" />
      <div className="mt-2 h-3 w-32 rounded bg-slate-200" />
    </div>
  );
}

export default function DashboardPage({ leads, loading }: DashboardPageProps) {
  const totalLeads = leads.length;
  const wonDeals = leads.filter((l) => l.status === "won").length;
  const openDeals = leads.filter(
    (l) => l.status !== "won" && l.status !== "lost",
  ).length;
  const pipelineValue = leads
    .filter((l) => l.status !== "lost")
    .reduce((total, lead) => total + lead.value, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingFollowUps = leads
    .filter((l) => l.next_follow_up && new Date(l.next_follow_up) >= today)
    .sort(
      (a, b) =>
        new Date(a.next_follow_up).getTime() -
        new Date(b.next_follow_up).getTime(),
    )
    .slice(0, 5);

  const overdueFollowUps = leads
    .filter((l) => l.next_follow_up && new Date(l.next_follow_up) < today)
    .sort(
      (a, b) =>
        new Date(a.next_follow_up).getTime() -
        new Date(b.next_follow_up).getTime(),
    );
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
          {loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {loading ? (
          <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-5">
            <div className="h-4 w-32 rounded bg-slate-200 mb-4" />
            <div className="h-48 w-full rounded bg-slate-200" />
          </div>
        ) : (
          <>
            <ChartsSection leads={leads} />
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {/* Upcoming */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h2 className="mb-3 text-sm font-semibold text-slate-700">
                  Upcoming Follow-ups
                </h2>
                {upcomingFollowUps.length === 0 ? (
                  <p className="text-sm text-slate-400">
                    No upcoming follow-ups.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {upcomingFollowUps.map((lead) => (
                      <li
                        key={lead.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            {lead.company}
                          </p>
                          <p className="text-xs text-slate-400">
                            {lead.contact_name}
                          </p>
                        </div>
                        <span className="text-xs font-medium text-slate-500">
                          {lead.next_follow_up}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Overdue */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h2 className="mb-3 text-sm font-semibold text-slate-700">
                  Overdue Follow-ups
                </h2>
                {overdueFollowUps.length === 0 ? (
                  <p className="text-sm text-slate-400">
                    No overdue follow-ups.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {overdueFollowUps.map((lead) => (
                      <li
                        key={lead.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            {lead.company}
                          </p>
                          <p className="text-xs text-slate-400">
                            {lead.contact_name}
                          </p>
                        </div>
                        <span className="text-xs font-medium text-red-500">
                          {lead.next_follow_up}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
