import type { ReactNode } from "react";

type activePage = "dashboard" | "pipeline" | "leads";

interface AppLayoutProps {
  children: ReactNode;
  activePage: activePage;
  onPageChange: (page: activePage) => void;
}

export function AppLayout({
  children,
  activePage,
  onPageChange,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white p-6 md:block">
        <div className="mb-8">
          <h1 className="text-lg font-semibold text-slate-900">Mini CRM</h1>
          <p className="text-sm text-slate-500">Pipeline Dashboard</p>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => onPageChange("dashboard")}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${
              activePage === "dashboard"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => onPageChange("pipeline")}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${
              activePage === "pipeline"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Pipeline
          </button>
          <button
            onClick={() => onPageChange("leads")}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${
              activePage === "leads"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Leads
          </button>
          <a className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
            Settings
          </a>
        </nav>
      </aside>

      <main className="md:pl-64">{children}</main>
    </div>
  );
}

export default AppLayout;
