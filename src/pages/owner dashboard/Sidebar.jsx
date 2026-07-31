import { useNavigate } from "react-router-dom";

/* ── Icons ── */
function CalendarIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function CheckCircleIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
function PlusCircleIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function CalendarDotIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function LogOutIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

/* ── Nav items config ── */
const MANAGEMENT_ITEMS = [
  { id: "appointments",  label: "Appointments",     icon: <CalendarIcon />,    badge: 4 },
  { id: "approve",       label: "Approve Requests", icon: <CheckCircleIcon />, badge: 4 },
  { id: "add-listing",   label: "Add Listing",      icon: <PlusCircleIcon />,  badge: null },
  { id: "notifications", label: "Notifications",    icon: <BellIcon />,        badge: 3 },
  { id: "search",        label: "Search",           icon: <SearchIcon />,      badge: null },
];

const LISTING_ITEMS = [
  { id: "my-listings",  label: "My Listings",  icon: <HomeIcon /> },
  { id: "availability", label: "Availability", icon: <CalendarDotIcon /> },
  { id: "reviews",      label: "Reviews",      icon: <StarIcon /> },
];

export default function Sidebar({ activeTab, onTabChange }) {
  const navigate = useNavigate();

  const rawName = localStorage.getItem("name") || "Sunil Rathnayake";
  const initials = rawName.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="owner-sidebar">
      {/* ── Logo ── */}
      <div className="sidebar-header">
        <span className="sidebar-logo-text">SabaraStay</span>
        <span className="sidebar-owner-badge">OWNER</span>
      </div>

      {/* ── Profile ── */}
      <div className="sidebar-profile">
        <div className="sidebar-avatar">{initials}</div>
        <div className="sidebar-profile-info">
          <div className="sidebar-name">{rawName}</div>
          <div className="sidebar-role">Boarding Owner · Verified</div>
        </div>
        <span className="sidebar-notif-dot" />
      </div>

      {/* ── Management ── */}
      <div className="sidebar-section">
        <div className="sidebar-section-label">MANAGEMENT</div>
        {MANAGEMENT_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`sidebar-nav-item${activeTab === item.id ? " active" : ""}`}
            onClick={() => onTabChange(item.id)}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            <span className="sidebar-nav-label">{item.label}</span>
            {item.badge && <span className="sidebar-badge">{item.badge}</span>}
          </button>
        ))}
      </div>

      {/* ── Listings ── */}
      <div className="sidebar-section">
        <div className="sidebar-section-label">LISTINGS</div>
        {LISTING_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`sidebar-nav-item${activeTab === item.id ? " active" : ""}`}
            onClick={() => onTabChange(item.id)}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            <span className="sidebar-nav-label">{item.label}</span>
          </button>
        ))}
      </div>

      {/* ── Footer ── */}
      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={handleLogout}>
          <LogOutIcon />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
