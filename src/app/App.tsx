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

type ActivePage = "dashboard" | "pipeline" | "leads" | "settings";

function App() {
  const { user, loading, logout, uploadAvatar } = useAuth();
  const { leads, addLeads, deleteLead, updateLead, updateLeadStatus } =
    useLeads();
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");

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

  return (
    <AppLayout
      activePage={activePage}
      onPageChange={setActivePage}
      user={user}
      onLogout={logout}
      onUploadAvatar={uploadAvatar}
    >
      <Toaster position="top-center" />
      {activePage === "dashboard" && <DashboardPage leads={leads} />}
      {activePage === "pipeline" && (
        <PipelinePage leads={leads} onUpdateLeadStatus={updateLeadStatus} />
      )}
      {activePage === "leads" && (
        <LeadsPage
          leads={leads}
          onAddLead={addLeads}
          onDeleteLead={deleteLead}
          onEditLead={updateLead}
        />
      )}
      {activePage === "settings" && (
        <SettingsPage user={user} onUploadAvatar={uploadAvatar} />
      )}
    </AppLayout>
  );
}

export default App;
