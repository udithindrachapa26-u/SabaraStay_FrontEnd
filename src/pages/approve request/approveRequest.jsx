import { requestStatus, requestData } from "../../data/appointmentData";

function CheckIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function ApproveRequestPage() {
  const stats = [
    { value: requestStatus.awaiting, label: "Awaiting Decision" },
    { value: requestStatus.avgResponseTime, label: "Avg Response Time" },
  ];

  return (
    <main className="content-area">
      {/* Page header */}
      <div className="dashboard-banner" style={{ marginBottom: 24 }}>
        <div className="banner-left">
          <div className="banner-label">Owner Dashboard</div>
          <h2>Approve Visit Requests</h2>
          <p>Review each student's request and decide to approve or decline</p>
        </div>
        <div className="banner-stats">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="banner-stat-value">{value}</div>
              <div className="banner-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Request cards */}
      <div className="appointments-section">
        {requestData.students.map(({ id, name, studentNumber, date, time, phone, faculty }) => (
          <div key={id} className="appointmentCard">
            <div className="appointment-row">
              <div className="avatar">{name.split(" ").map((w) => w[0]).join("")}</div>
              <div className="student-info">
                <div className="student-name">
                  {name}&nbsp;
                  <span style={{ fontWeight: 400, color: "var(--gray-400)", fontSize: 12 }}>{studentNumber}</span>
                </div>
                <div className="student-sub">
                  <span>{faculty}</span>
                  <span>{phone}</span>
                </div>
              </div>
              <span className="status-badge pending">Pending</span>
            </div>

            <div className="appointment-details">
              <div className="detailsBox">
                <span style={{ fontWeight: 500, color: "var(--gray-400)", fontSize: 12 }}>Visit Date</span><br />
                <span style={{ fontWeight: 500, fontSize: 12 }}>{date}</span>
              </div>
              <div className="detailsBox">
                <span style={{ fontWeight: 500, color: "var(--gray-400)", fontSize: 12 }}>Time Slot</span><br />
                <span style={{ fontWeight: 500, fontSize: 12 }}>{time}</span>
              </div>
            </div>

            <div className="appointment-details">
              <div className="detailsBox">
                <span style={{ fontWeight: 500, color: "var(--gray-400)", fontSize: 12 }}>Mobile</span><br />
                <span style={{ fontWeight: 500, fontSize: 12 }}>{phone}</span>
              </div>
              <div className="detailsBox">
                <span style={{ fontWeight: 500, color: "var(--gray-400)", fontSize: 12 }}>Requested</span><br />
                <span style={{ fontWeight: 500, fontSize: 12 }}>2 hours ago</span>
              </div>
            </div>

            <div className="appointment-footer">
              <button className="action-btn confirm" style={{ width: "46%" }}>
                <CheckIcon /> Accept
              </button>
              <button
                className="action-btn cancel"
                style={{ width: "46%", border: "1px solid #d43c3c", backgroundColor: "white", color: "#9c0f0f" }}
              >
                <XIcon /> Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
