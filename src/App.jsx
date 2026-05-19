import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import BoardingDetails from "./pages/BoardingDetails";
import StudentDashboard from "./pages/StudentDashboard";
import BookingSuccess from "./pages/BookingSuccess";
import ListProperty from "./pages/ListProperty";
import OwnerDashboard from "./pages/OwnerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/boarding/:id" element={<BoardingDetails />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/list-property" element={<ListProperty />} />
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
