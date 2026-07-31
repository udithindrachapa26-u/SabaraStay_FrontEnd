import { useState } from "react";

/* ── Facility definitions ── */
const FACILITIES = [
  { id: "wifi",      label: "WiFi Internet",   svg: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /> },
  { id: "meals",     label: "Meals Included",  svg: <><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></> },
  { id: "ac",        label: "Air Conditioning",svg: <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" /> },
  { id: "security",  label: "24h Security",    svg: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
  { id: "parking",   label: "Parking",         svg: <><rect x="1" y="3" width="15" height="13" rx="1" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></> },
  { id: "study",     label: "Study Room",      svg: <><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></> },
  { id: "laundry",   label: "Laundry",         svg: <><path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" /><path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" /><path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" /><path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" /></> },
  { id: "cctv",      label: "CCTV Cameras",    svg: <><path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" /><circle cx="12" cy="12" r="3" /></> },
  { id: "kitchen",   label: "Kitchen Access",  svg: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></> },
  { id: "hotwater",  label: "Hot Water",       svg: <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-5M9 21H5a2 2 0 0 1-2-2v-5" /> },
  { id: "fridge",    label: "Refrigerator",    svg: <><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M4.93 4.93a10 10 0 0 0 0 14.14" /></> },
  { id: "garden",    label: "Garden / Outdoor",svg: <path d="M12 3c-4.2 5.4-6 8.7-6 11a6 6 0 0 0 12 0c0-2.3-1.8-5.6-6-11z" /> },
];

/* ── Toggle component ── */
function Toggle({ label, desc, checked, onChange, accent = false }) {
  return (
    <div className="tog-wrap" style={{ cursor: "pointer" }} onClick={() => onChange(!checked)}>
      <div className={`tog${accent ? " amber" : ""}${checked ? " on" : ""}`} />
      <div>
        <div className={`tog-lbl${checked ? " on" : ""}`}>{label}</div>
        <div style={{ fontSize: ".68rem", color: "var(--gray-400)" }}>{desc}</div>
      </div>
    </div>
  );
}

export default function AddListing() {
  /* ── Form state ── */
  const [form, setForm] = useState({
    name: "", type: "", gender: "boys",
    address: "", description: "",
    rent: "", rooms: "", spaces: "", distance: "",
    electricity: "included", water: "included",
  });

  /* ── Facilities state ── */
  const [facilities, setFacilities] = useState(
    Object.fromEntries(FACILITIES.map((f) => [f.id, ["wifi", "meals", "security"].includes(f.id)]))
  );

  /* ── Settings state ── */
  const [settings, setSettings] = useState({
    available: true,
    longTerm: true,
    shortTerm: false,
  });

  /* ── Toast state ── */
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ── Handlers ── */
  const handleField = (e) => setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const toggleFacility = (id) =>
    setFacilities((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleSetting = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSaveDraft = () => {
    showToast("Draft saved! You can continue editing later.", "info");
  };

  const handlePublish = () => {
    if (!form.name.trim()) return showToast("Please enter the boarding place name.", "error");
    if (!form.type)        return showToast("Please select a boarding type.", "error");
    if (!form.address.trim()) return showToast("Please enter the full address.", "error");
    if (!form.rent.trim()) return showToast("Please enter the monthly rent.", "error");

    const selectedFacilities = Object.entries(facilities).filter(([, v]) => v).map(([k]) => k);
    const payload = { ...form, facilities: selectedFacilities, settings };
    console.log("Listing payload:", payload);
    showToast("Listing submitted! Admin will review within 24 hours.", "success");
  };

  return (
    <main className="content-area" style={{ position: "relative" }}>

      {/* ── Toast ── */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 9999,
          padding: "12px 20px", borderRadius: 8, fontSize: 13, fontWeight: 500,
          background: toast.type === "error" ? "#fee2e2" : toast.type === "info" ? "#dbeafe" : "#dcfce7",
          color: toast.type === "error" ? "#b91c1c" : toast.type === "info" ? "#1d4ed8" : "#15803d",
          border: `1px solid ${toast.type === "error" ? "#fca5a5" : toast.type === "info" ? "#93c5fd" : "#86efac"}`,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          animation: "fadeInUp 0.3s ease",
        }}>
          {toast.msg}
        </div>
      )}

      {/* ── Banner ── */}
      <div className="dashboard-banner" style={{ marginBottom: 24 }}>
        <div className="banner-left">
          <div className="banner-label">Owner Dashboard</div>
          <h2>Add New Listing</h2>
          <p>Fill in the details to list your boarding place and reach SUSL students instantly</p>
        </div>
        <div className="banner-stats" style={{ flexDirection: "column", gap: 0 }}>
          <div className="banner-stat-value">4</div>
          <div className="banner-stat-label">Active Listings</div>
        </div>
      </div>

      {/* ── Boarding Details ── */}
      <div className="appointments-section">
        <div className="table-header">Boarding Details</div>
        <div className="input">
          <label htmlFor="name">Boarding Place Name</label><br />
          <input id="name" type="text" placeholder="Boarding Name" value={form.name} onChange={handleField} />
        </div>
        <div className="input">
          <label htmlFor="type">Boarding Type</label><br />
          <select id="type" value={form.type} onChange={handleField}>
            <option value="">Select type...</option>
            <option value="single room">Single Room</option>
            <option value="shared room">Shared Room</option>
            <option value="full house">Full House</option>
            <option value="short stay">Short Stay</option>
          </select>
        </div>
        <div className="input">
          <label htmlFor="gender">Gender Policy</label><br />
          <select id="gender" value={form.gender} onChange={handleField}>
            <option value="boys">Boys Only</option>
            <option value="girls">Girls Only</option>
            <option value="mixed">Mixed / Any</option>
          </select>
        </div>
        <div className="input">
          <label htmlFor="address">Full Address</label><br />
          <input id="address" type="text" placeholder="Boarding Address" value={form.address} onChange={handleField} />
        </div>
        <div className="input">
          <label htmlFor="description">Boarding Description</label><br />
          <input id="description" type="text" placeholder="Describe your boarding place..." value={form.description} onChange={handleField} />
        </div>
      </div>

      {/* ── Pricing ── */}
      <div className="appointments-section" style={{ marginTop: "3%" }}>
        <div className="table-header">Pricing</div>
        <div className="input">
          <label htmlFor="rent">Monthly Rent (Rs.)</label><br />
          <input id="rent" type="number" placeholder="Rs. 10000" value={form.rent} onChange={handleField} />
        </div>
        <div className="input">
          <label htmlFor="rooms">Total Rooms</label><br />
          <input id="rooms" type="number" placeholder="3" value={form.rooms} onChange={handleField} />
        </div>
        <div className="input">
          <label htmlFor="spaces">Available Spaces Now</label><br />
          <input id="spaces" type="number" placeholder="3" value={form.spaces} onChange={handleField} />
        </div>
        <div className="input">
          <label htmlFor="distance">Distance to University (km)</label><br />
          <input id="distance" type="number" placeholder="1.5" step="0.1" value={form.distance} onChange={handleField} />
        </div>
        <div className="input">
          <label htmlFor="electricity">Electricity Bill</label><br />
          <select id="electricity" value={form.electricity} onChange={handleField}>
            <option value="included">Include in Rent</option>
            <option value="separate">Separate</option>
            <option value="shared">Shared Equally</option>
          </select>
        </div>
        <div className="input">
          <label htmlFor="water">Water Bill</label><br />
          <select id="water" value={form.water} onChange={handleField}>
            <option value="included">Include in Rent</option>
            <option value="separate">Separate</option>
            <option value="shared">Shared Equally</option>
          </select>
        </div>
      </div>

      {/* ── Facilities ── */}
      <div className="appointments-section" style={{ marginTop: "3%" }}>
        <div className="table-header">
          <span>Facilities</span>
          <span style={{ fontSize: ".72rem", color: "var(--gray-400)", marginLeft: "auto" }}>
            {Object.values(facilities).filter(Boolean).length} selected
          </span>
        </div>
        <div style={{ padding: "14px 20px" }}>
          <div className="fac-grid">
            {FACILITIES.map(({ id, label, svg }) => (
              <div
                key={id}
                className={`fac-item${facilities[id] ? " on" : ""}`}
                onClick={() => toggleFacility(id)}
              >
                <div className="fac-icon">
                  <svg viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {svg}
                  </svg>
                </div>
                <span className="fac-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Listing Settings ── */}
      <div className="appointments-section" style={{ marginTop: "3%" }}>
        <div className="table-header">Listing Settings</div>
        <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>

          <Toggle
            label="List as Available Now"
            desc="Students can see and book visits immediately"
            checked={settings.available}
            onChange={(v) => toggleSetting("available")}
            accent
          />
          <Toggle
            label="Accept Long-Term Stays"
            desc="Show listing to students looking for semester-long rooms"
            checked={settings.longTerm}
            onChange={() => toggleSetting("longTerm")}
          />
          <Toggle
            label="Accept Short-Term Stays"
            desc="Suitable for parent visits and temporary accommodations"
            checked={settings.shortTerm}
            onChange={() => toggleSetting("shortTerm")}
          />

          <div style={{ borderTop: "1px solid var(--gray-200)", paddingTop: 14 }}>
            <div className="btn-row">
              <button className="btn-sec" style={{ flex: 1 }} onClick={handleSaveDraft}>
                Save Draft
              </button>
              <button className="btn-amber" style={{ flex: 2 }} onClick={handlePublish}>
                Publish Listing →
              </button>
            </div>
            <div style={{ fontSize: ".7rem", color: "var(--gray-500)", textAlign: "center", marginTop: 10 }}>
              Admin will review your listing within 24 hours before publishing
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}