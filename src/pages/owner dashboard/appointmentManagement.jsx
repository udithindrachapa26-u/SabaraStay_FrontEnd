import DashboardBanner from "./DashboardBanner";
import SummaryCards    from "./SummeryCards";
import AppointmentTable from "./AppointmentTable";

export default function AppointmentManagement() {
  return (
    <main className="content-area">
      <DashboardBanner />
      <SummaryCards />
      <AppointmentTable />
    </main>
  );
}
