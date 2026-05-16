import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "../common/Navbar";
import SubNav from "./owner dashboard/SubNav";
import Footer from "../common/footer";

// Pages
import AppointmentManagement from "./owner dashboard/appointmentManagement";
import ApproveRequestPage from "./approve request/approveRequest";
// import AddListingPage     from "./pages/AddListingPage";
// import NotificationPage   from "./pages/NotificationPage";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar and SubNav are shared across all pages */}
      <Navbar />
      <SubNav />

      <Routes>
        <Route path="/" element={<Navigate to="/appointments" replace />} />
        <Route path="/appointments" element={<AppointmentManagement />} />
        <Route path="/approve-request" element={<ApproveRequestPage />} />
        {/* <Route path="/add-listing"     element={<AddListingPage />} />
            <Route path="/notification"    element={<NotificationPage />} /> */}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
