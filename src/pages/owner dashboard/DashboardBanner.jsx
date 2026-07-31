// import { BsCalendarDate } from "react-icons/bs";
// import { MdUpdate } from "react-icons/md";
// import { FaUser } from "react-icons/fa";
import { dashboardStats } from "../../data/appointmentData";

export default function DashboardBanner() {
    const stats = [
        { value: dashboardStats.pending, label: "Pending" },
        { value: dashboardStats.thisMonth, label: "This Month" },
        { value: dashboardStats.totalAllTime, label: "Total All Time" },
    ];
    return (

        <>
            <div className="dashboard-banner">
                {/* Left: title + description */}
                <div className="banner-left">
                    <div className="banner-label">Owner Dashboard</div>
                    <h2>Appointment Management</h2>
                    <p>View, confirm and track all student visit requests across your listings</p>
                </div>

                {/* Right: stats */}
                <div className="banner-stats">
                    {stats.map(({ value, label }) => (
                        <div key={label}>
                            <div className="banner-stat-value">{value}</div>
                            <div className="banner-stat-label">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="titleCard">
                <div className="content1">
                    <p>Owner Dashboard</p>
                    <h3>Appointment Management</h3>
                    <p>View, confirm and  track all student visit requests across your listings</p>
                </div>
                <div className="numberdetails">
                    <div className="numbercard">
                        <p className="number">4</p>
                        <p className="numberheading">Pending</p>
                    </div>
                    <div className="numbercard">
                        <p className="number">11</p>
                        <p className="numberheading">This Month</p>
                    </div>
                    <div className="numbercard">
                        <p className="number">20</p>
                        <p className="numberheading">Total All Time</p>
                    </div>
                </div>
            </div>

            {/* cards */}
            {/* <div className="cardsection">
                <div className="card">
                    <div className="firstline">
                        <BsCalendarDate className="cardicon1"/>
                        <p className="cardheading1">Action needed</p>
                    </div>
                    <div className="secondline">
                        <p className="cardnumber">4</p>
                        <p className="cardsubheading">Pending Requests</p>
                    </div>
                </div>
                <div className="card">
                    <div className="firstline">
                        <MdUpdate className="cardicon2"/>                        
                        <p className="cardheading2">This Week</p>
                    </div>
                    <div className="secondline">
                        <p className="cardnumber">6</p>
                        <p className="cardsubheading">Confirmed</p>
                    </div>
                </div>
                <div className="card">
                    <div className="firstline">
                        <FaUser className="cardicon3"/>
                        <p className="cardheading3">+3 new</p>
                    </div>
                    <div className="secondline">
                        <p className="cardnumber">18</p>
                        <p className="cardsubheading">Unique Students</p>
                    </div>
                </div>
            </div> */}

        </>
    );
}