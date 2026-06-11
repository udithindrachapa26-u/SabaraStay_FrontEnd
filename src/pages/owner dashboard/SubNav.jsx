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

function UserIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
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

export default function SubNav() {
  const [query, setQuery] = useState("");

  return (
    <div className="subnav">
      {/* Breadcrumb */}
      <div className="subnav-breadcrumb">
        <span>Appointment</span>
        <span className="muted">Management</span>
      </div>

      {/* Right controls */}
      <div className="subnav-right">
        <div className="search-box">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search...."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button className="btn-add-listing">
          <PlusIcon />
          Add Listing
        </button>

        <button className="icon-btn" aria-label="Notifications">
          <BellIcon />
        </button>

        <button className="icon-btn" aria-label="Profile">
          <UserIcon />
        </button>
      </div>
    </div>
  );
}


// import { BiSearch } from 'react-icons/bi';
// import { FaRegBell } from "react-icons/fa6";
// import { FaUser } from "react-icons/fa6";


// export default function TitleSection() {
//     return (
//         <>
//             <div className="titleSection">
//                 <div className="section1">
//                     <p className="heading">Appointment <span className="subheading">Management</span></p>
//                 </div>
//                 <div className="section2">
//                     <div className="search">
//                         <BiSearch/>
//                         <input icon={BiSearch} type="text" placeholder="Search..." />
//                     </div>
//                     <div className="add">
//                         <button className='addlist'>+ Add Listing</button>
//                     </div>
//                     <div className="notification">
//                         <FaRegBell className='notificationsign'/>
//                     </div>
//                     <div className="userProfile">
//                         <FaUser className='userProfilesign'/>
//                     </div>
//                 </div>
//             </div>
            
//         </>
//     );
// }