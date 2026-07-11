import { summaryCards } from "../../data/appointmentData";

/* ── Icons ── */
function CalendarIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const iconMap = {
  warning: <CalendarIcon />,
  success: <CheckCircleIcon />,
  info: <UsersIcon />,
};

export default function SummaryCards() {
  return (
    <div className="summary-cards">
      {summaryCards.map(({ id, label, value, subLabel, variant }) => (
        <div key={id} className="summary-card">
          <div className="card-header">
            <div className={`card-icon ${variant}`}>{iconMap[variant]}</div>
            <span className={`card-tag ${variant}`}>{label}</span>
          </div>
          <div className="card-value">{value}</div>
          <div className="card-sublabel">{subLabel}</div>
        </div>
      ))}
    </div>
  );
}
