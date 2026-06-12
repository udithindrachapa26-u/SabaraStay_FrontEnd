import { useNavigate } from "react-router-dom";

export default function AdminNavbar({ activeTab, setActiveTab, adminUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getAdminDisplayName = () => {
    if (!adminUser) return "Administrator";
    return `${adminUser.firstName || ""} ${adminUser.lastName || ""}`.trim() || "Administrator";
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex justify-between items-center">
        
        {/* BRANDING */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-white">Sabra</span>
            <span className="text-yellow-400">Stay</span>
          </span>
          <span className="rounded-full bg-purple-500/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-purple-400 border border-purple-500/20">
            Admin Portal
          </span>
        </div>

        {/* CONTROLS (TABS) */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setActiveTab("students")}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition duration-300 ${
              activeTab === "students"
                ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            🎓 Students
          </button>
          <button
            onClick={() => setActiveTab("owners")}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition duration-300 ${
              activeTab === "owners"
                ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            💼 Owners
          </button>
          <button
            onClick={() => setActiveTab("boardings")}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition duration-300 ${
              activeTab === "boardings"
                ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            🏠 Boardings
          </button>
        </div>

        {/* SESSION ACTIONS */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Active Session</p>
            <p className="text-sm font-bold text-slate-300">{getAdminDisplayName()}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}
