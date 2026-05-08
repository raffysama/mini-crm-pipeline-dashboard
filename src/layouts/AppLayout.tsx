import type { ReactNode } from "react";

type ActivePage = "dashboard" | "pipeline" | "leads";

interface AppLayoutProps {
  children: ReactNode;
  activePage: ActivePage;
  onPageChange: (page: ActivePage) => void;
}

const NAV_ITEMS: { page: ActivePage; label: string; icon: string }[] = [
  { page: "dashboard", label: "Dashboard", icon: "ti-layout-dashboard" },
  { page: "pipeline", label: "Pipeline", icon: "ti-layout-kanban" },
  { page: "leads", label: "Leads", icon: "ti-users" },
];

export function AppLayout({
  children,
  activePage,
  onPageChange,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 hidden h-screen w-60 flex-col border-r border-slate-200 bg-white md:flex">
        {/* Brand */}
        <div className="border-b border-slate-100 px-5 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
              <i
                className="ti ti-chart-dots text-sm text-white"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight text-slate-900">
                Mini CRM
              </p>
              <p className="text-xs leading-tight text-slate-400">
                Pipeline Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Menu
          </p>
          {NAV_ITEMS.map(({ page, label, icon }) => {
            const active = activePage === page;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <i
                  className={`ti ${icon} text-base ${active ? "text-white" : "text-slate-400"}`}
                  aria-hidden="true"
                />
                {label}
              </button>
            );
          })}

          <div className="my-3 border-t border-slate-100" />

          <a className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            <i
              className="ti ti-settings text-base text-slate-400"
              aria-hidden="true"
            />
            Settings
          </a>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-100 px-4 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
              U
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-slate-700">
                User
              </p>
              <p className="truncate text-xs text-slate-400">user@email.com</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="md:pl-60">{children}</main>
    </div>
  );
}

export default AppLayout;
