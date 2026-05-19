import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const numberFields = ["price", "totalRooms", "availableSpace", "distance"];

const getName = (user) => {
  if (!user) return "";
  return user.firstName || user.firstname || user.first_name || user.name || user.fullName || user.full_name || "";
};

const normalizeOwnerResponse = (data) => {
  if (!data) return null;
  return data.user || data.owner || data;
};

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [boardings, setBoardings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [editBoardingId, setEditBoardingId] = useState(null);
  const [editForm, setEditForm] = useState({
    boardingName: "",
    boardingType: "",
    address: "",
    price: "",
    totalRooms: "",
    availableSpace: "",
    description: "",
    distance: "",
    freeWifi: false,
    attachedBathroom: false,
    parking: false,
    kitchen: false,
  });
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (role !== "owner") {
      navigate("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setOwner(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse owner data:", error);
      }
    }

    const fetchBoardings = async () => {
      try {
        const response = await api.get("/boardings/owner", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // API may return { owner, boardings }
        const data = response.data || {};
        if (data.owner) setOwner((prev) => ({ ...(prev || {}), ...data.owner }));
        if (Array.isArray(data.boardings)) setBoardings(data.boardings);
        else if (Array.isArray(data)) setBoardings(data);
      } catch (error) {
        console.error("Failed to load owner boardings:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/login");
        } else {
          setErrorMessage("Unable to load your boardings right now. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBoardings();
  }, [navigate, role, token]);

  const activeBoardings = useMemo(() => boardings.length, [boardings]);
  const totalSpace = useMemo(
    () => boardings.reduce((sum, boarding) => sum + Number(boarding.availableSpace || 0), 0),
    [boardings]
  );

  const openEdit = (boarding) => {
    setEditBoardingId(boarding.boardingID);
    setEditForm({
      boardingName: boarding.boardingName || "",
      boardingType: boarding.boardingType || "",
      address: boarding.address || "",
      price: boarding.price?.toString() || "",
      totalRooms: boarding.totalRooms?.toString() || "",
      availableSpace: boarding.availableSpace?.toString() || "",
      description: boarding.description || "",
      distance: boarding.distance?.toString() || "",
      freeWifi: Boolean(boarding.freeWifi) || false,
      attachedBathroom: Boolean(boarding.attachedBathroom) || false,
      parking: Boolean(boarding.parking) || false,
      kitchen: Boolean(boarding.kitchen) || false,
    });
    setFeedback({ message: "", type: "" });
  };

  const closeEdit = () => {
    setEditBoardingId(null);
    setEditForm({
      boardingName: "",
      boardingType: "",
      address: "",
      price: "",
      totalRooms: "",
      availableSpace: "",
      description: "",
      distance: "",
      freeWifi: false,
      attachedBathroom: false,
      parking: false,
      kitchen: false,
    });
    setFeedback({ message: "", type: "" });
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (feedback.message) {
      setFeedback({ message: "", type: "" });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editBoardingId) return;

    // Validate only text fields, not checkboxes
    const textFields = ["boardingName", "boardingType", "address", "description", "price", "totalRooms", "availableSpace", "distance"];
    const missingField = textFields.find((field) => !editForm[field].toString().trim());
    if (missingField) {
      setFeedback({ message: "Please fill in every required field before saving.", type: "error" });
      return;
    }

    try {
      await api.put(
        `/boardings/${editBoardingId}`,
        {
          ...editForm,
          price: Number(editForm.price),
          totalRooms: Number(editForm.totalRooms),
          availableSpace: Number(editForm.availableSpace),
          distance: Number(editForm.distance),
          freeWifi: editForm.freeWifi ? 1 : 0,
          attachedBathroom: editForm.attachedBathroom ? 1 : 0,
          parking: editForm.parking ? 1 : 0,
          kitchen: editForm.kitchen ? 1 : 0,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBoardings((prev) =>
        prev.map((boarding) =>
          boarding.boardingID === editBoardingId ? { ...boarding, ...editForm } : boarding
        )
      );
      setFeedback({ message: "Boarding updated successfully.", type: "success" });
      setTimeout(closeEdit, 1200);
    } catch (error) {
      console.error("Failed to update boarding:", error);
      setFeedback({
        message: error.response?.data?.message || "Unable to update boarding right now.",
        type: "error",
      });
    }
  };

  const handleDelete = async (boardingID) => {
    const confirmed = window.confirm("Delete this boarding listing? This cannot be undone.");
    if (!confirmed) return;

    try {
      await api.delete(`/boardings/${boardingID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBoardings((prev) => prev.filter((boarding) => boarding.boardingID !== boardingID));
      if (editBoardingId === boardingID) {
        closeEdit();
      }
      setFeedback({ message: "Boarding deleted successfully.", type: "success" });
    } catch (error) {
      console.error("Failed to delete boarding:", error);
      setFeedback({
        message: error.response?.data?.message || "Unable to delete boarding right now.",
        type: "error",
      });
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-4xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-slate-700 via-slate-800 to-slate-900 px-8 py-10 sm:px-12 sm:py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400/80">Owner dashboard</p>
                <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  Welcome back{getName(owner) ? `, ${getName(owner)}` : ""}
                </h1>
                <p className="mt-4 max-w-2xl text-slate-300/80 leading-7">
                  Manage your boardings, update room availability, and keep your property listing fresh for students.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={() => navigate("/list-property")}
                  className="inline-flex items-center justify-center rounded-3xl bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
                >
                  Add New Boarding
                </button>
                <button
                  onClick={() => navigate("/home")}
                  className="inline-flex items-center justify-center rounded-3xl border border-slate-700 bg-slate-950/80 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-500"
                >
                  View Home
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-6 py-8 sm:grid-cols-3 sm:px-8 lg:px-10">
            <div className="rounded-4xl border border-slate-800 bg-slate-950/90 p-6">
              <p className="text-sm text-slate-400">Active listings</p>
              <p className="mt-4 text-4xl font-bold text-white">{activeBoardings}</p>
            </div>
            <div className="rounded-4xl border border-slate-800 bg-slate-950/90 p-6">
              <p className="text-sm text-slate-400">Available spaces</p>
              <p className="mt-4 text-4xl font-bold text-white">{totalSpace}</p>
            </div>
            <div className="rounded-4xl border border-slate-800 bg-slate-950/90 p-6">
              <p className="text-sm text-slate-400">Quick actions</p>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p>• Add or update your boarding details.</p>
                <p>• Delete listings when rooms are full.</p>
                <p>• Keep descriptions clear for students.</p>
              </div>
            </div>
          </div>
        </section>

        {errorMessage ? (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-100">
            {errorMessage}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-12 text-center text-slate-400">
            Loading your listings...
          </div>
        ) : (
          <section className="space-y-6">
            <div className="rounded-4xl border border-slate-800 bg-slate-900/90 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Your boarding listings</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Edit details or remove listings that are no longer available.
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-cyan-300">
                  {activeBoardings} listing{activeBoardings !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {boardings.length === 0 ? (
                <div className="rounded-4xl border border-dashed border-slate-700 bg-slate-900/80 p-10 text-center text-slate-400">
                  No boardings found yet. Use Add New Boarding to create your first listing.
                </div>
              ) : (
                boardings.map((boarding) => {
                  const isEditing = editBoardingId === boarding.boardingID;
                  return (
                    <article key={boarding.boardingID} className="rounded-4xl border border-slate-800 bg-slate-950/90 p-6 shadow-xl">
                      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                            <span className="rounded-full bg-slate-800 px-3 py-1">{boarding.boardingType || "Type not set"}</span>
                            <span className="rounded-full bg-slate-800 px-3 py-1">{boarding.distance} km</span>
                            <span className="rounded-full bg-slate-800 px-3 py-1">{boarding.availableSpace} spaces</span>
                          </div>
                          <h3 className="text-xl font-semibold text-white">{boarding.boardingName}</h3>
                          <p className="text-slate-400">{boarding.address}</p>
                          <p className="text-slate-300">{boarding.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {boarding.freeWifi && <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300">📶 WiFi</span>}
                            {boarding.attachedBathroom && <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300">🚿 Bathroom</span>}
                            {boarding.parking && <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300">🅿 Parking</span>}
                            {boarding.kitchen && <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300">🍳 Kitchen</span>}
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 sm:items-end">
                          <p className="text-3xl font-semibold text-white">Rs {boarding.price}</p>
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => openEdit(boarding)}
                              className="rounded-3xl bg-yellow-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(boarding.boardingID)}
                              className="rounded-3xl border border-red-500/30 bg-red-500/10 px-5 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>

                      {isEditing && (
                        <form onSubmit={handleUpdate} className="mt-6 grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
                          {feedback.message && (
                            <div className={`rounded-2xl p-4 text-sm ${feedback.type === "success" ? "bg-emerald-500/10 text-emerald-200 border border-emerald-500/20" : "bg-red-500/10 text-red-200 border border-red-500/20"}`}>
                              {feedback.message}
                            </div>
                          )}
                          <div className="grid gap-4 sm:grid-cols-2">
                            <input
                              name="boardingName"
                              value={editForm.boardingName}
                              onChange={handleChange}
                              placeholder="Boarding name"
                              className="input"
                            />
                            <input
                              name="boardingType"
                              value={editForm.boardingType}
                              onChange={handleChange}
                              placeholder="Type"
                              className="input"
                            />
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <input
                              name="address"
                              value={editForm.address}
                              onChange={handleChange}
                              placeholder="Address"
                              className="input"
                            />
                            <textarea
                              name="description"
                              value={editForm.description}
                              onChange={handleChange}
                              placeholder="Description"
                              className="input h-24"
                            />
                          </div>
                          <div className="grid gap-4 sm:grid-cols-4">
                            <input
                              name="price"
                              value={editForm.price}
                              onChange={handleChange}
                              type="number"
                              placeholder="Price"
                              className="input"
                            />
                            <input
                              name="totalRooms"
                              value={editForm.totalRooms}
                              onChange={handleChange}
                              type="number"
                              placeholder="Total rooms"
                              className="input"
                            />
                            <input
                              name="availableSpace"
                              value={editForm.availableSpace}
                              onChange={handleChange}
                              type="number"
                              placeholder="Available"
                              className="input"
                            />
                            <input
                              name="distance"
                              value={editForm.distance}
                              onChange={handleChange}
                              type="number"
                              step="0.1"
                              placeholder="Distance km"
                              className="input"
                            />
                          </div>
                          <div className="space-y-3">
                            <p className="text-sm font-semibold text-yellow-300">Amenities</p>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                              <label className="flex items-center gap-2 cursor-pointer rounded-lg bg-slate-800/50 p-3 hover:bg-slate-700">
                                <input
                                  type="checkbox"
                                  name="freeWifi"
                                  checked={editForm.freeWifi}
                                  onChange={handleChange}
                                  className="h-4 w-4 cursor-pointer"
                                />
                                <span className="text-sm">Free WiFi</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer rounded-lg bg-slate-800/50 p-3 hover:bg-slate-700">
                                <input
                                  type="checkbox"
                                  name="attachedBathroom"
                                  checked={editForm.attachedBathroom}
                                  onChange={handleChange}
                                  className="h-4 w-4 cursor-pointer"
                                />
                                <span className="text-sm">Attached Bathroom</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer rounded-lg bg-slate-800/50 p-3 hover:bg-slate-700">
                                <input
                                  type="checkbox"
                                  name="parking"
                                  checked={editForm.parking}
                                  onChange={handleChange}
                                  className="h-4 w-4 cursor-pointer"
                                />
                                <span className="text-sm">Parking</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer rounded-lg bg-slate-800/50 p-3 hover:bg-slate-700">
                                <input
                                  type="checkbox"
                                  name="kitchen"
                                  checked={editForm.kitchen}
                                  onChange={handleChange}
                                  className="h-4 w-4 cursor-pointer"
                                />
                                <span className="text-sm">Kitchen Access</span>
                              </label>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <button
                              type="button"
                              onClick={closeEdit}
                              className="rounded-3xl border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="rounded-3xl bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                            >
                              Save changes
                            </button>
                          </div>
                        </form>
                      )}
                    </article>
                  );
                })
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
