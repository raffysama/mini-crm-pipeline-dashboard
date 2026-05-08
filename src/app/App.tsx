import { useLeads } from "../features/leads/hooks/useLeads";
import { useState } from "react";
import DashboardPage from "../pages/DashboardPage";
import AppLayout from "../layouts/AppLayout";
import PipelinePage from "../pages/PipelinePage";
import LeadsPage from "../pages/LeadsPage";
import { Toaster } from "react-hot-toast";

type ActivePage = "dashboard" | "pipeline" | "leads";

function App() {
  const { leads, addLeads, deleteLead, updateLead, updateLeadStatus } =
    useLeads();
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");

  return (
    <AppLayout activePage={activePage} onPageChange={setActivePage}>
      <Toaster position="top-right" />
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
    </AppLayout>
  );
}

export default App;
