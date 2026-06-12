import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AdminNavbar from "../components/common/AdminNavbar";

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // State variables
  const [students, setStudents] = useState([]);
  const [owners, setOwners] = useState([]);
  const [boardings, setBoardings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("students"); // students | owners | boardings
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  
  // Search query states
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const storedUser = localStorage.getItem("user");
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    // 1. Role Guard Checks
    if (!token || role !== "admin") {
      navigate("/login");
      return;
    }

    if (storedUser) {
      try {
        setAdminUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }

    // 2. Fetch all system data
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [studentsRes, ownersRes, boardingsRes] = await Promise.all([
          api.get("/admin/students", { headers }),
          api.get("/admin/owners", { headers }),
          api.get("/admin/boardings", { headers }),
        ]);

        setStudents(studentsRes.data || []);
        setOwners(ownersRes.data || []);
        setBoardings(boardingsRes.data || []);
      } catch (error) {
        console.error("Failed to fetch admin data", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/login");
        } else {
          setFeedback({
            message: "Unable to load dashboard data. Please check connection.",
            type: "error",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [navigate, token, role, storedUser]);

  // Clean feedback after 3 seconds
  useEffect(() => {
    if (feedback.message) {
      const timer = setTimeout(() => setFeedback({ message: "", type: "" }), 4000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Hashing/Deleting action handlers
  const handleDeleteStudent = async (studentID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student? All their bookings, appointments, reviews, and notifications will be permanently removed."
    );
    if (!confirmDelete) return;

    try {
      const headers = { Authorization: `Bearer ${token}` };
      await api.delete(`/admin/students/${studentID}`, { headers });
      
      setStudents((prev) => prev.filter((s) => s.id !== studentID));
      setFeedback({ message: "Student account deleted successfully.", type: "success" });
    } catch (error) {
      console.error("Failed to delete student:", error);
      setFeedback({
        message: error.response?.data?.message || "Failed to delete student.",
        type: "error",
      });
    }
  };

  const handleDeleteOwner = async (ownerID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this boarding owner? All their properties, listings, bookings, appointments, and reviews will be permanently deleted."
    );
    if (!confirmDelete) return;

    try {
      const headers = { Authorization: `Bearer ${token}` };
      await api.delete(`/admin/owners/${ownerID}`, { headers });

      setOwners((prev) => prev.filter((o) => o.id !== ownerID));
      // Cascade delete their boardings from frontend state
      setBoardings((prev) => prev.filter((b) => b.boardingOwnerID !== ownerID));
      setFeedback({ message: "Boarding owner and listings deleted successfully.", type: "success" });
    } catch (error) {
      console.error("Failed to delete owner:", error);
      setFeedback({
        message: error.response?.data?.message || "Failed to delete owner.",
        type: "error",
      });
    }
  };

  const handleDeleteBoarding = async (boardingID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete/moderate this boarding listing? This will permanently remove it from the system."
    );
    if (!confirmDelete) return;

    try {
      const headers = { Authorization: `Bearer ${token}` };
      await api.delete(`/admin/boardings/${boardingID}`, { headers });

      setBoardings((prev) => prev.filter((b) => b.boardingID !== boardingID));
      setFeedback({ message: "Boarding listing deleted successfully.", type: "success" });
    } catch (error) {
      console.error("Failed to delete boarding listing:", error);
      setFeedback({
        message: error.response?.data?.message || "Failed to delete listing.",
        type: "error",
      });
    }
  };

  // Searching filter logic
  const filteredStudents = students.filter((s) => {
    const name = `${s.firstName || ""} ${s.lastName || ""}`.toLowerCase();
    const email = (s.email || "").toLowerCase();
    const contact = (s.contactNo || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || email.includes(query) || contact.includes(query);
  });

  const filteredOwners = owners.filter((o) => {
    const name = `${o.firstName || ""} ${o.lastName || ""}`.toLowerCase();
    const email = (o.email || "").toLowerCase();
    const contact = (o.contactNo || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || email.includes(query) || contact.includes(query);
  });

  const filteredBoardings = boardings.filter((b) => {
    const name = (b.boardingName || "").toLowerCase();
    const type = (b.boardingType || "").toLowerCase();
    const address = (b.address || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || type.includes(query) || address.includes(query);
  });

  const getAdminName = () => {
    if (!adminUser) return "Administrator";
    return `${adminUser.firstName || ""} ${adminUser.lastName || ""}`.trim() || "Administrator";
  };

  return (
    <>
      <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} adminUser={adminUser} />
      <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 sm:px-6 lg:px-10 font-sans">
        <div className="mx-auto max-w-7xl space-y-8">
          
          {/* ================= HEADER SECTION ================= */}
          <section className="rounded-4xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
            <div className="bg-linear-to-r from-purple-800 via-indigo-800 to-blue-900 px-8 py-10 sm:px-12 sm:py-12">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-purple-300 font-semibold">
                    Administrator Dashboard
                  </p>
                  <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Welcome back, {getAdminName()}
                  </h1>
                  <p className="mt-4 max-w-2xl text-slate-300 leading-7">
                    System administration panel. Monitor users, manage student/owner databases, and moderate active property listings.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-200">Session Role</p>
                  <p className="mt-3 text-2xl font-bold text-white">System Admin</p>
                  <p className="mt-1 text-sm text-slate-300">{adminUser?.email || "admin@sabarastay.com"}</p>
                  <span className="mt-4 inline-flex rounded-full bg-slate-950/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-purple-400">
                    ROOT PRIVILEGES
                  </span>
                </div>
              </div>
            </div>

            {/* ================= STATS OVERVIEW ================= */}
            <div className="grid gap-6 px-6 py-8 sm:grid-cols-3 sm:px-8 lg:px-10">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-inner transition hover:border-purple-500/30">
                <p className="text-sm font-medium text-slate-400">Registered Students</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <p className="text-4xl font-extrabold text-white">{students.length}</p>
                  <span className="text-sm text-slate-500">accounts</span>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-inner transition hover:border-indigo-500/30">
                <p className="text-sm font-medium text-slate-400">Boarding Owners</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <p className="text-4xl font-extrabold text-white">{owners.length}</p>
                  <span className="text-sm text-slate-500">accounts</span>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-inner transition hover:border-blue-500/30">
                <p className="text-sm font-medium text-slate-400">Active Boarding Listings</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <p className="text-4xl font-extrabold text-white">{boardings.length}</p>
                  <span className="text-sm text-slate-500">stays listed</span>
                </div>
              </div>
            </div>
          </section>

          {/* ================= FEEDBACK NOTIFICATIONS ================= */}
          {feedback.message && (
            <div
              className={`rounded-2xl p-4 border text-sm transition-all duration-300 ${
                feedback.type === "success"
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                  : "bg-red-500/10 text-red-300 border-red-500/20"
              }`}
            >
              {feedback.message}
            </div>
          )}

          {/* ================= CONTROL TABS & SEARCH ================= */}
          <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-slate-900/50 p-4 rounded-3xl border border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white uppercase tracking-wider pl-2">
                  {activeTab === "students" && "🎓 Students Database"}
                  {activeTab === "owners" && "💼 Property Owners"}
                  {activeTab === "boardings" && "🏠 Boarding Stays Moderation"}
                </h2>
              </div>

              <div className="relative w-full sm:max-w-xs">
                <span className="absolute left-3.5 top-3 text-slate-500">🔍</span>
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition"
                />
              </div>
            </div>

            {/* ================= LOADING & CONTENT LISTS ================= */}
            {loading ? (
              <div className="rounded-4xl border border-slate-800 bg-slate-900/40 p-20 text-center text-slate-400 font-medium">
                Retrieving database items...
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* STUDENTS ACTIVE TAB */}
                {activeTab === "students" && (
                  <>
                    {filteredStudents.length === 0 ? (
                      <div className="rounded-4xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center text-slate-400">
                        No student records match your search.
                      </div>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2">
                        {filteredStudents.map((student) => (
                          <article
                            key={student.id}
                            className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 flex flex-col justify-between transition hover:-translate-y-0.5 hover:border-purple-500/20 hover:bg-slate-900/70"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400 border border-purple-500/10">
                                  ID: #{student.id}
                                </span>
                                <span className="text-xs text-slate-500">Student Account</span>
                              </div>
                              <h3 className="text-xl font-bold text-white">
                                {student.firstName || ""} {student.lastName || ""}
                              </h3>
                              <div className="space-y-1.5 text-sm text-slate-400">
                                <p className="flex items-center gap-2">
                                  <span>✉️</span> <span className="break-all">{student.email || "No Email"}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                  <span>📞</span> <span>{student.contactNo || "No contact info"}</span>
                                </p>
                              </div>
                            </div>
                            
                            <div className="mt-6 pt-4 border-t border-slate-800/60 flex justify-end">
                              <button
                                onClick={() => handleDeleteStudent(student.id)}
                                className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-300 transition hover:bg-red-500/25 hover:text-red-200"
                              >
                                Delete Account
                              </button>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* OWNERS ACTIVE TAB */}
                {activeTab === "owners" && (
                  <>
                    {filteredOwners.length === 0 ? (
                      <div className="rounded-4xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center text-slate-400">
                        No boarding owner records match your search.
                      </div>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2">
                        {filteredOwners.map((owner) => (
                          <article
                            key={owner.id}
                            className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 flex flex-col justify-between transition hover:-translate-y-0.5 hover:border-indigo-500/20 hover:bg-slate-900/70"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/10">
                                  ID: #{owner.id}
                                </span>
                                <span className="text-xs text-slate-500">Boarding Owner</span>
                              </div>
                              <h3 className="text-xl font-bold text-white">
                                {owner.firstName || ""} {owner.lastName || ""}
                              </h3>
                              <div className="space-y-1.5 text-sm text-slate-400">
                                <p className="flex items-center gap-2">
                                  <span>✉️</span> <span className="break-all">{owner.email || "No Email"}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                  <span>📞</span> <span>{owner.contactNo || "No contact info"}</span>
                                </p>
                              </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-800/60 flex justify-end">
                              <button
                                onClick={() => handleDeleteOwner(owner.id)}
                                className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-300 transition hover:bg-red-500/25 hover:text-red-200"
                              >
                                Delete Owner & Listings
                              </button>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* BOARDINGS ACTIVE TAB */}
                {activeTab === "boardings" && (
                  <>
                    {filteredBoardings.length === 0 ? (
                      <div className="rounded-4xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center text-slate-400">
                        No boarding stays found in the system.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredBoardings.map((boarding) => (
                          <article
                            key={boarding.boardingID}
                            className="rounded-4xl border border-slate-800/80 bg-slate-900/30 p-6 shadow-md transition hover:border-blue-500/20 hover:bg-slate-900/50"
                          >
                            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start">
                              <div className="space-y-3">
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                  <span className="rounded-full bg-blue-500/15 text-blue-300 px-3 py-1 font-semibold border border-blue-500/10">
                                    {boarding.boardingType || "Not specified"}
                                  </span>
                                  <span className="rounded-full bg-slate-800 text-slate-300 px-3 py-1 border border-slate-700/50">
                                    📍 {boarding.distance} km from university
                                  </span>
                                  <span className="rounded-full bg-slate-800 text-slate-300 px-3 py-1 border border-slate-700/50">
                                    🛏️ {boarding.availableSpace} spaces available
                                  </span>
                                  <span className="rounded-full bg-slate-800 text-slate-300 px-3 py-1 border border-slate-700/50">
                                    🔑 Owner: {boarding.ownerFirstName || ""} {boarding.ownerLastName || ""} (ID: #{boarding.boardingOwnerID})
                                  </span>
                                </div>
                                <h3 className="text-xl font-bold text-white">{boarding.boardingName}</h3>
                                <p className="text-sm text-slate-400 font-medium">📍 {boarding.address}</p>
                                <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">{boarding.description}</p>
                                
                                <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-400">
                                  <span className={boarding.freeWifi ? "text-emerald-400" : "text-slate-600 line-through"}>📶 Free Wifi</span>
                                  <span className={boarding.attachedBathroom ? "text-emerald-400" : "text-slate-600 line-through"}>🛁 Attached Bathroom</span>
                                  <span className={boarding.parking ? "text-emerald-400" : "text-slate-600 line-through"}>🚗 Parking</span>
                                  <span className={boarding.kitchen ? "text-emerald-400" : "text-slate-600 line-through"}>🍳 Kitchen</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-col gap-4 sm:items-end justify-between min-h-[120px]">
                                <div className="text-left sm:text-right">
                                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Monthly rate</p>
                                  <p className="text-3xl font-extrabold text-yellow-400 mt-1">Rs {boarding.price}</p>
                                </div>
                                <button
                                  onClick={() => handleDeleteBoarding(boarding.boardingID)}
                                  className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-xs font-bold text-red-300 transition hover:bg-red-500/25 hover:text-red-200"
                                >
                                  Delete Listing
                                </button>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </>
                )}

              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
