import { useLeads } from "../features/leads/hooks/useLeads";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useState } from "react";
import DashboardPage from "../pages/DashboardPage";
import AppLayout from "../layouts/AppLayout";
import PipelinePage from "../pages/PipelinePage";
import LeadsPage from "../pages/LeadsPage";
import LoginPage from "../features/auth/components/LoginPage";
import { Toaster } from "react-hot-toast";
import SettingsPage from "../features/auth/components/SettingsPage";
import LeadDetail from "../features/leads/components/LeadDetail";
import type { Lead } from "../features/leads/types";

type ActivePage =
  | "dashboard"
  | "pipeline"
  | "leads"
  | "settings"
  | "leadDetail";

function App() {
  const { user, loading, logout, uploadAvatar } = useAuth();
  const { leads, addLeads, deleteLead, updateLead, updateLeadStatus } =
    useLeads();
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Toaster position="top-center" />
        <LoginPage />
      </>
    );
  }
  const handleViewLead = (lead: Lead) => {
    setViewingLead(lead);
    setActivePage("leadDetail");
  };
  return (
    <AppLayout
      activePage={activePage}
      onPageChange={setActivePage}
      user={user}
      onLogout={logout}
      onUploadAvatar={uploadAvatar}
    >
      <Toaster position="top-center" />
      {activePage === "dashboard" && (
        <DashboardPage leads={leads} loading={loading} />
      )}
      {activePage === "pipeline" && (
        <PipelinePage leads={leads} onUpdateLeadStatus={updateLeadStatus} />
      )}
      {activePage === "leads" && (
        <LeadsPage
          leads={leads}
          onAddLead={addLeads}
          onDeleteLead={deleteLead}
          onEditLead={updateLead}
          onViewLead={handleViewLead}
        />
      )}
      {activePage === "leadDetail" && viewingLead && (
        <LeadDetail
          lead={viewingLead}
          onBack={() => setActivePage("leads")}
          onEdit={(lead) => {
            setViewingLead(lead);
            setActivePage("leads");
          }}
        />
      )}
      {activePage === "settings" && (
        <SettingsPage user={user} onUploadAvatar={uploadAvatar} />
      )}
    </AppLayout>
  );
}

export default App;
