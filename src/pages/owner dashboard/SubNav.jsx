import { useState } from "react";

/* ── Icons ── */
function SearchIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default function SubNav({ title = "Appointment Management", onTabChange }) {
  const [query, setQuery] = useState("");

  const rawName = localStorage.getItem("name") || "SR";
  const initials = rawName.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="subnav">
      {/* Title */}
      <div className="subnav-breadcrumb">
        <span className="subnav-title">{title}</span>
      </div>

      {/* Right controls */}
      <div className="subnav-right">
        <div className="search-box">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button
          className="btn-add-listing"
          onClick={() => onTabChange && onTabChange("add-listing")}
        >
          <PlusIcon />
          Add Listing
        </button>

        <button className="icon-btn" aria-label="Notifications">
          <BellIcon />
        </button>

        <div className="subnav-avatar" aria-label="Profile">
          {initials}
        </div>
      </div>
    </div>
  );
}