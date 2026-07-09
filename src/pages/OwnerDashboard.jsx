import { useState } from "react";
import "../style/appointment.css";

import Sidebar from "./owner dashboard/Sidebar";
import SubNav from "./owner dashboard/SubNav";
import Navbar from "../components/common/Navbar";
import AppointmentManagement from "./owner dashboard/appointmentManagement";
import ApproveRequestPage from "./approve request/approveRequest";
import AddListing from "./add listing/AddListing";

const PAGE_TITLES = {
  appointments: "Appointment Management",
  approve: "Approve Requests",
  "add-listing": "Add Listing",
  notifications: "Notifications",
  search: "Search",
  "my-listings": "My Listings",
  availability: "Availability",
  reviews: "Reviews",
};

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("appointments");

  const renderContent = () => {
    switch (activeTab) {
      case "appointments": return <AppointmentManagement />;
      case "approve": return <ApproveRequestPage />;
      case "add-listing": return <AddListing />;
      default: return <AppointmentManagement />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="owner-layout">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="owner-main">
          <SubNav title={PAGE_TITLES[activeTab]} onTabChange={setActiveTab} />
          {renderContent()}
        </div>
      </div>
    </>
  );
}