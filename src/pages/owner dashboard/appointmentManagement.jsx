import "../../../style/appointment.css"

import Navbar from "../../common/Navbar";
import SubNav from "./SubNav";
import DashboardBanner from "../owner dashboard/DashboardBanner";
import SummaryCards from "../owner dashboard/SummeryCards";
import AppointmentTable from "../owner dashboard/AppointmentTable";
import Footer from "../../common/footer";

/**
 * AppointmentManagement
 * ─────────────────────
 * Top-level page for the SabraStay owner dashboard.
 * Compose all sub-sections here; keep this file thin.
 */
export default function AppointmentManagement() {
  return (
    <div className="page-wrapper">
      <main className="content-area">
        <DashboardBanner />
        <SummaryCards />
        <AppointmentTable />
      </main>
    </div>
  );
}
