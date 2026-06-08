import { useState } from "react";
import { appointments as initialData } from "../../../data/appointmentData";
import AppointmentRow from "./AppointmentRow";

export default function AppointmentTable() {
  const [appointments, setAppointments] = useState(initialData);

  const handleConfirm = (id) =>
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Confirmed" } : a))
    );

  const handleCancel = (id) =>
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a))
    );

  const handleView = (id) => {
    const appt = appointments.find((a) => a.id === id);
    if (appt) alert(`Viewing appointment for ${appt.name}`);
  };

  return (
    <div className="appointments-section">
      <div className="table-header">All Appointments</div>

      {appointments.map((appt) => (
        <AppointmentRow
          key={appt.id}
          appointment={appt}
          onConfirm={handleConfirm}
          onView={handleView}
          onCancel={handleCancel}
        />
      ))}
    </div>
  );
}
