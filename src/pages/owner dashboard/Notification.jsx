import { useState } from "react";
import { requestStatus, requestData, notificationStatus } from "../../data/appointmentData";
import "../../style/notification.css"

// --------------ICON SECTION------------- 

function CalendarIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-label="Calendar"
        >
            {/* Calendar background */}
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            {/* Calendar header lines */}
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="16" y1="2" x2="16" y2="6" />
            {/* Divider */}
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );
}



export default function Notifications() {
    const stats = [
        { value: notificationStatus.unread, label: "Unread" },
        { value: notificationStatus.thisweek, label: "This Week" },
    ];

    return (
        <main className="content-area">
            {/* ── Banner ── */}
            <div className="dashboard-banner" style={{ marginBottom: 24 }}>
                <div className="banner-left">
                    <div className="banner-label">Owner Dashboard</div>
                    <h2>Notifications</h2>
                    <p>Stay on top of visit requests, reviews and system updates</p>
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
            <div className="appointments-section">
                <div className="class">
                    <div class="notif-bar">
                        <span class="nchip on" onclick="filterN(this)">All (9)</span>
                        <span class="nchip" onclick="filterN(this)">Requests (4)</span>
                        <span class="nchip" onclick="filterN(this)">Reviews (2)</span>
                        <span class="nchip" onclick="filterN(this)">System (3)</span>
                        <span class="mark-read" onclick="toast('All marked as read')">Mark all read</span>
                    </div>
                </div>
                <div class="notif-day-hd">Today</div>
                <div className="notif-item">
                    <div className="ni-unread-dot" style={{ marginTop: 15 }}></div>
                    <div className="ni-icon-wrap" style={{ background: "var(--ap)" }}>
                        <CalendarIcon />
                    </div>
                    <div className="ni-body">
                        <div className="ni-title">New Visit Request — Kavindra Perera</div>
                        <div className="ni-desc">Requested a visit to <strong>Sunrise Boarding House</strong> on Apr 14 at 10:00 AM. Tap to approve or decline.</div>
                        <div className="ni-time">2 hours ago</div>
                    </div>
                </div>

                <div className="notif-item">
                    <div className="ni-unread-dot" style={{ marginTop: 15 }}></div>
                    <div className="ni-icon-wrap" style={{ background: "var(--ap)" }}>
                        <CalendarIcon />
                    </div>
                    <div className="ni-body">
                        <div className="ni-title">New Visit Request — Kavindra Perera</div>
                        <div className="ni-desc">Requested a visit to <strong>Sunrise Boarding House</strong> on Apr 14 at 10:00 AM. Tap to approve or decline.</div>
                        <div className="ni-time">2 hours ago</div>
                    </div>
                </div>

                <div className="notif-item">
                    <div className="ni-unread-dot" style={{ marginTop: 15 }}></div>
                    <div className="ni-icon-wrap" style={{ background: "var(--ap)" }}>
                        <CalendarIcon />
                    </div>
                    <div className="ni-body">
                        <div className="ni-title">New Visit Request — Kavindra Perera</div>
                        <div className="ni-desc">Requested a visit to <strong>Sunrise Boarding House</strong> on Apr 14 at 10:00 AM. Tap to approve or decline.</div>
                        <div className="ni-time">2 hours ago</div>
                    </div>
                </div>

                <div className="notif-item">
                    <div className="ni-unread-dot" style={{ marginTop: 15 }}></div>
                    <div className="ni-icon-wrap" style={{ background: "var(--ap)" }}>
                        <CalendarIcon />
                    </div>
                    <div className="ni-body">
                        <div className="ni-title">New Visit Request — Kavindra Perera</div>
                        <div className="ni-desc">Requested a visit to <strong>Sunrise Boarding House</strong> on Apr 14 at 10:00 AM. Tap to approve or decline.</div>
                        <div className="ni-time">2 hours ago</div>
                    </div>
                </div>




            </div>
        </main>
    )

}