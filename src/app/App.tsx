import { useLeads } from "../features/leads/hooks/useLeads";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import AppLayout from "../layouts/AppLayout";
import PipelinePage from "../pages/PipelinePage";
import LeadsPage from "../pages/LeadsPage";
import LoginPage from "../features/auth/components/LoginPage";
import { Toaster } from "react-hot-toast";
import SettingsPage from "../features/auth/components/SettingsPage";
import LeadDetail from "../features/leads/components/LeadDetail";
import type { Lead } from "../features/leads/types";

function App() {
  const { user, loading, logout, uploadAvatar } = useAuth();
  const {
    leads,
    addLeads,
    deleteLead,
    updateLead,
    updateLeadStatus,
    saveNotes,
  } = useLeads();
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const navigate = useNavigate();

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
    <AppLayout user={user} onLogout={logout} onUploadAvatar={uploadAvatar}>
      <Toaster position="top-center" />
      <Routes>
        <Route
          path="/"
          element={<DashboardPage leads={leads} loading={false} />}
        />
        <Route
          path="/pipeline"
          element={
            <PipelinePage leads={leads} onUpdateLeadStatus={updateLeadStatus} />
          }
        />
        <Route
          path="/leads"
          element={
            <LeadsPage
              leads={leads}
              onAddLead={addLeads}
              onDeleteLead={deleteLead}
              onEditLead={updateLead}
              onViewLead={(lead) => navigate(`/leads/${lead.id}`)}
              initialEditingLead={editingLead}
              onClearEditingLead={() => setEditingLead(null)}
            />
          }
        />
        <Route
          path="/leads/:id"
          element={
            <LeadDetail
              leads={leads}
              onBack={() => navigate("/leads")}
              onEdit={(lead) => {
                setEditingLead(lead);
                navigate("/leads");
              }}
              onSaveNotes={saveNotes}
            />
          }
        />
        <Route
          path="/settings"
          element={<SettingsPage user={user} onUploadAvatar={uploadAvatar} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
