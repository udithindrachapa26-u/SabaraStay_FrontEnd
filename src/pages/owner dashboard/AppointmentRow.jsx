/* ── Icons ── */
function CheckIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
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

/**
 * @param {{ appointment: import('../../../data/appointmentData').appointments[0],
 *           onConfirm: (id:number)=>void,
 *           onView: (id:number)=>void,
 *           onCancel: (id:number)=>void }} props
 */
export default function AppointmentRow({ appointment, onConfirm, onView, onCancel }) {
  const { id, name, studentNumber, property, time, phone, status } = appointment;
  const statusClass = status.toLowerCase(); // "pending" | "confirmed" | "cancelled"
  const isPending   = status === "Pending";

  /* Initials avatar */
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="appointment-row">
      {/* Avatar */}
      <div className="avatar">{initials}</div>

      {/* Info */}
      <div className="student-info">
        <div className="student-name">
          {name} &nbsp;<span style={{ fontWeight: 400, color: "var(--gray-400)", fontSize: 12 }}>{studentNumber}</span>
        </div>
        <div className="student-sub">
          <span>{property}</span>
          <span>{time}</span>
          <span>{phone}</span>
        </div>
      </div>

      {/* Status badge */}
      <span className={`status-badge ${statusClass}`}>{status}</span>

      {/* Action buttons */}
      <div className="row-actions">
        {isPending && (
          <button
            className="action-btn confirm"
            title="Confirm"
            onClick={() => onConfirm(id)}
          >
            <CheckIcon />
          </button>
        )}
        <button
          className="action-btn view"
          title="View"
          onClick={() => onView(id)}
        >
          <EyeIcon />
        </button>
        {status !== "Cancelled" && (
          <button
            className="action-btn cancel"
            title="Cancel"
            onClick={() => onCancel(id)}
          >
            <XIcon />
          </button>
        )}
      </div>
    </div>
  );
}





// import React from 'react';
// import { FaUserCircle } from "react-icons/fa";
// import { FaCheckSquare } from "react-icons/fa";
// import { FaRegEye } from "react-icons/fa6";
// import { ImCross } from "react-icons/im";

// export default function Appointments() {
//     return (
//         <>
//             <div className="appointmentSection">
//                 <p className="appointmentHeading">All Appointments</p>
//                 <div className="appointmentList">
//                     <div className="item1">
//                         <div className="appointmentUser">
//                             <FaUserCircle className='appointmentusericon'/>
//                         </div>
                        
//                         <div className="studentDetails">
//                             <ul>
//                                 <li className="studentname">John Doe</li>
//                                 <li className="studentNumber">Student number</li>
//                             </ul>
//                         </div>
//                         <div className="details">
//                             <ul>
//                                 <li className="boardingName">Sunrise Boarding House</li>
//                                 <li className="appointmentTime">10.00 AM</li>
//                                 <li className="studentContact">0701234567</li>
//                             </ul>
                            
//                         </div>
//                     </div>
//                     <div className="item2">
//                         <div className="appointmentStatus">
//                             <ul>
//                                 <li className="status">Pending</li>
//                                 <li><FaCheckSquare className='checkicon'/></li>
//                                 <li><FaRegEye className='viewicon'/></li>
//                                 <li><ImCross className='crossicon'/></li>
//                             </ul>
//                         </div>
//                     </div>
                        
                    
//                 </div>
//             </div>
//         </>
//     );
// }