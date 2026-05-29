import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ListProperty() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

  const [photos, setPhotos] = useState([]);
  const [formFeedback, setFormFeedback] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
    if (formFeedback.message) setFormFeedback({ message: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in and has correct role
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      setFormFeedback({ message: "Please log in first.", type: "error" });
      navigate("/login");
      return;
    }

    if (role !== "owner") {
      setFormFeedback({ message: "Only boarding owners can list properties.", type: "error" });
      return;
    }

    // Basic validation
    if (!form.boardingName || !form.boardingType || !form.address || !form.price || !form.totalRooms || !form.availableSpace || !form.description || !form.distance) {
      setFormFeedback({ message: "Please fill in all required fields.", type: "error" });
      return;
    }

    if (photos.length === 0) {
      setFormFeedback({ message: "Please upload at least one photo.", type: "error" });
      return;
    }

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    photos.forEach((photo) => {
      data.append("photos", photo);
    });

    try {
      await api.post("/boardings", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setFormFeedback({ message: "Boarding listed successfully.", type: "success" });
      setTimeout(() => navigate("/"), 700);
    } catch (err) {
      console.error("Error listing property:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to list property";
      setFormFeedback({ message: `Error: ${errorMessage}`, type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-blue-950 p-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl space-y-6 rounded-3xl bg-white/10 p-8 backdrop-blur"
      >
        <h1 className="text-3xl font-bold text-yellow-400">
          List Your Boarding
        </h1>

        {formFeedback.message && (
          <div
            className={
              formFeedback.type === "success"
                ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900"
                : "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-900"
            }
          >
            {formFeedback.message}
          </div>
        )}

        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-yellow-300">Basic Information</h2>
          <input name="boardingName" value={form.boardingName} onChange={handleChange} placeholder="Boarding Name*" className="input" />
          <div className="grid grid-cols-2 gap-4">
            <input name="boardingType" value={form.boardingType} onChange={handleChange} placeholder="Type (Male/Female/Mixed)*" className="input" />
            <input name="distance" type="number" step="0.1" value={form.distance} onChange={handleChange} placeholder="Distance from uni (km)*" className="input" />
          </div>
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address*" className="input" />
        </div>

        {/* Pricing & Capacity */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-yellow-300">Pricing & Capacity</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Monthly rate (Rs)*" className="input" />
            <input name="totalRooms" type="number" value={form.totalRooms} onChange={handleChange} placeholder="Total Rooms*" className="input" />
            <input name="availableSpace" type="number" value={form.availableSpace} onChange={handleChange} placeholder="Available Space*" className="input" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-yellow-300">Description</h2>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe your boarding, facilities, rules, etc.*" className="input h-28" />
        </div>

        {/* Amenities */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-yellow-300">Amenities</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <label className="flex items-center gap-3 cursor-pointer rounded-lg bg-white/5 p-3 hover:bg-white/10">
              <input
                type="checkbox"
                name="freeWifi"
                checked={form.freeWifi}
                onChange={handleChange}
                className="h-5 w-5 cursor-pointer"
              />
              <span>Free WiFi</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer rounded-lg bg-white/5 p-3 hover:bg-white/10">
              <input
                type="checkbox"
                name="attachedBathroom"
                checked={form.attachedBathroom}
                onChange={handleChange}
                className="h-5 w-5 cursor-pointer"
              />
              <span>Attached Bathroom</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer rounded-lg bg-white/5 p-3 hover:bg-white/10">
              <input
                type="checkbox"
                name="parking"
                checked={form.parking}
                onChange={handleChange}
                className="h-5 w-5 cursor-pointer"
              />
              <span>Parking</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer rounded-lg bg-white/5 p-3 hover:bg-white/10">
              <input
                type="checkbox"
                name="kitchen"
                checked={form.kitchen}
                onChange={handleChange}
                className="h-5 w-5 cursor-pointer"
              />
              <span>Kitchen Access</span>
            </label>
          </div>
        </div>

        {/* Photos */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-yellow-300">Photos</h2>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setPhotos([...e.target.files])}
            className="w-full rounded-lg border-2 border-dashed border-yellow-400/50 bg-white/5 p-4 text-sm text-white/70 file:mr-3 file:rounded file:border-0 file:bg-yellow-400 file:px-3 file:py-2 file:text-black file:font-semibold"
          />
          {photos.length > 0 && (
            <p className="text-sm text-emerald-300">{photos.length} photo(s) selected</p>
          )}
        </div>

        <button className="w-full rounded-xl bg-yellow-400 py-3 font-semibold text-black hover:bg-yellow-300 transition">
          Submit Boarding
        </button>
      </form>
    </div>
  );
}