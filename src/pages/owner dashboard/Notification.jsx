import { useState } from "react";
import { requestStatus, requestData, notificationStatus } from "../../data/appointmentData";




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

        </main>
    )

}