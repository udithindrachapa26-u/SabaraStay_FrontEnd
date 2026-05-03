import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const getUserFirstName = (user) => {
  if (!user) return "";
  return (
    user.firstName ||
    user.firstname ||
    user.first_name ||
    user.name ||
    user.fullName ||
    user.full_name ||
    ""
  );
};

const getUserLastName = (user) => {
  if (!user) return "";
  return user.lastName || user.lastname || user.last_name || "";
};

const normalizeStudentResponse = (data) => {
  if (!data) return null;
  return data.user || data.student || data;
};

const normalizeArrayResponse = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.bookings)) return data.bookings;
  if (Array.isArray(data.appointments)) return data.appointments;
  return [];
};

const getBookingTitle = (booking) =>
  booking.boarding_name ||
  booking.boardingName ||
  booking.boarding?.boardingName ||
  booking.boarding?.boarding_name ||
  booking.boarding?.name ||
  booking.name ||
  "Untitled boarding";

const getBookingLocation = (booking) =>
  booking.location ||
  booking.address ||
  booking.boarding?.address ||
  booking.boarding?.location ||
  booking.boarding_address ||
  "Location not provided";

const getBookingStatus = (booking) => booking.status || booking.booking_status || booking.statusText || "Pending";

const getBookingCheckIn = (booking) =>
  booking.check_in_date || booking.start_date || booking.startDate || booking.bookingDate || booking.appointmentDate || "";

const getAppointmentTitle = (appointment) =>
  appointment.boarding_name ||
  appointment.boardingName ||
  appointment.boarding?.boardingName ||
  appointment.boarding?.boarding_name ||
  appointment.boarding?.name ||
  appointment.name ||
  "Boarding appointment";

const getAppointmentDate = (appointment) =>
  appointment.appointmentDate ||
  appointment.appointment_date ||
  appointment.date ||
  appointment.start_date ||
  "Date not available";

const getAppointmentTime = (appointment) =>
  appointment.appointmentTime ||
  appointment.appointment_time ||
  appointment.time ||
  "Time not available";

const getAppointmentStatus = (appointment) =>
  appointment.status || appointment.appointment_status || "Scheduled";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setStudent(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse cached user data:", error);
      }
    }

    api
      .get("/students/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setStudent(normalizeStudentResponse(res.data)))
      .catch((error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/login");
        } else {
          console.error("Failed to load student profile:", error);
        }
      });

    api
      .get("/bookings/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBookings(normalizeArrayResponse(res.data)))
      .catch((error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/login");
        } else {
          console.error("Failed to load bookings:", error);
        }
      });

    api
      .get("/appointments/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setAppointments(normalizeArrayResponse(res.data)))
      .catch((error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/login");
        } else if (error.response?.status !== 404) {
          console.error("Failed to load appointments:", error);
        }
      });
  }, [navigate]);

  const fullName = `${getUserFirstName(student)} ${getUserLastName(student)}`.trim();
  const bookingCount = bookings.length;
  const confirmedCount = bookings.filter(
    (booking) => getBookingStatus(booking).toLowerCase() === "confirmed"
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-4xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-indigo-600 via-sky-600 to-cyan-500 px-8 py-10 sm:px-12 sm:py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-200/80">
                  Student dashboard
                </p>
                <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  Welcome back{fullName ? `, ${fullName}` : "!"}
                </h1>
                <p className="mt-4 max-w-2xl text-slate-100/80 leading-7">
                  Track your bookings, review your boardings, and stay updated on all your student housing activity in one place.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-200/75">Account info</p>
                <p className="mt-4 text-3xl font-semibold text-white">{getUserFirstName(student) || "Student"}</p>
                <p className="mt-2 text-sm text-slate-200/80">{student?.email || student?.Email || "Email not available"}</p>
                <span className="mt-4 inline-flex rounded-full bg-slate-800/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  {(student?.role || localStorage.getItem("role") || "student").toString().toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.4fr_0.9fr] lg:px-10 lg:py-10">
            <section className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-inner shadow-black/20">
                  <p className="text-sm text-slate-400">Total bookings</p>
                  <p className="mt-3 text-4xl font-bold text-white">{bookingCount}</p>
                </div>
                <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-inner shadow-black/20">
                  <p className="text-sm text-slate-400">Confirmed bookings</p>
                  <p className="mt-3 text-4xl font-bold text-white">{confirmedCount}</p>
                </div>
              </div>

                <div className="rounded-4xl border border-slate-800 bg-slate-950/95 p-6 shadow-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">My bookings</h2>
                    <p className="mt-2 text-sm text-slate-400">
                      Your current boarding reservations and status updates.
                    </p>
                  </div>
                  <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-sm font-semibold text-cyan-300">
                    {bookingCount} record{bookingCount !== 1 ? "s" : ""}
                  </span>
                </div>

                {bookingCount === 0 ? (
                  <div className="mt-8 rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-8 text-center text-slate-400">
                    No bookings yet. Start browsing stays to reserve your next boarding.
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    {bookings.map((booking) => (
                      <article
                        key={booking.id || booking.bookingId || `${booking.boarding_id}-${booking.id}`}
                        className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 transition hover:-translate-y-0.5 hover:bg-slate-900"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{getBookingTitle(booking)}</h3>
                            <p className="mt-2 text-sm text-slate-400">{getBookingLocation(booking)}</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold text-cyan-300">
                            {getBookingStatus(booking)}
                          </span>
                        </div>
                        {getBookingCheckIn(booking) ? (
                          <p className="mt-4 text-sm text-slate-500">{`Check-in: ${getBookingCheckIn(booking)}`}</p>
                        ) : null}
                      </article>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-4xl border border-slate-800 bg-slate-950/95 p-6 shadow-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">My appointments</h2>
                    <p className="mt-2 text-sm text-slate-400">Upcoming or past appointments for boarding visits.</p>
                  </div>
                  <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-sm font-semibold text-cyan-300">
                    {appointments.length} record{appointments.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {appointments.length === 0 ? (
                  <div className="mt-8 rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-8 text-center text-slate-400">
                    No appointment records yet. Schedule a visit to see available boardings.
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    {appointments.map((appointment) => (
                      <article
                        key={appointment.appointmentID || appointment.id || `${appointment.studentID}-${getAppointmentDate(appointment)}`}
                        className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 transition hover:-translate-y-0.5 hover:bg-slate-900"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{getAppointmentTitle(appointment)}</h3>
                            <p className="mt-2 text-sm text-slate-400">{`${getAppointmentDate(appointment)} • ${getAppointmentTime(appointment)}`}</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold text-cyan-300">
                            {getAppointmentStatus(appointment)}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-4xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
                <h2 className="text-xl font-semibold text-white">Quick overview</h2>
                <p className="mt-3 text-sm text-slate-400">
                  Use this dashboard to stay on top of your active bookings and manage your student housing preferences.
                </p>
                <div className="mt-6 grid gap-3">
                  <div className="rounded-3xl bg-slate-950/90 p-4 text-sm text-slate-300">
                    <p className="font-semibold text-white">Profile</p>
                    <p className="mt-1">{fullName || "-"}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/90 p-4 text-sm text-slate-300">
                    <p className="font-semibold text-white">Email</p>
                    <p className="mt-1 break-all">{student?.email || student?.Email || "-"}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/90 p-4 text-sm text-slate-300">
                    <p className="font-semibold text-white">Contact</p>
                    <p className="mt-1">{student?.contactNo || student?.contact || student?.contact_no || "-"}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-4xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
                <h2 className="text-xl font-semibold text-white">Need help?</h2>
                <p className="mt-3 text-sm text-slate-400">
                  If you have questions about your boarding or booking status, reach out to support or check the boarding details page.
                </p>
                <div className="mt-6 space-y-3">
                  <button className="w-full rounded-3xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                    Contact support
                  </button>
                  <button className="w-full rounded-3xl border border-slate-700 bg-transparent px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500">
                    Browse boardings
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}