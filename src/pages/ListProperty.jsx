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
  });

  const [photos, setPhotos] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in and has correct role
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      alert("Please log in first");
      navigate("/login");
      return;
    }

    if (role !== "owner") {
      alert("Only boarding owners can list properties");
      return;
    }

    // Basic validation
    if (!form.boardingName || !form.boardingType || !form.address || !form.price || !form.totalRooms || !form.availableSpace || !form.description || !form.distance) {
      alert("Please fill in all required fields");
      return;
    }

    if (photos.length === 0) {
      alert("Please upload at least one photo");
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

      alert("Boarding listed successfully");
      navigate("/");
    } catch (err) {
      console.error("Error listing property:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to list property";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen bg-blue-950 p-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl space-y-4 rounded-3xl bg-white/10 p-6 backdrop-blur"
      >
        <h1 className="text-2xl font-bold text-yellow-400">
          List Your Boarding
        </h1>

        <input name="boardingName" onChange={handleChange} placeholder="Boarding Name" className="input" />
        <input name="boardingType" onChange={handleChange} placeholder="Type (Male/Female/Mixed)" className="input" />
        <input name="address" onChange={handleChange} placeholder="Address" className="input" />
        <input name="price" type="number" onChange={handleChange} placeholder="Price" className="input" />
        <input name="totalRooms" type="number" onChange={handleChange} placeholder="Total Rooms" className="input" />
        <input name="availableSpace" type="number" onChange={handleChange} placeholder="Available Space" className="input" />
        <input name="distance" type="number" step="0.1" onChange={handleChange} placeholder="Distance (km)" className="input" />

        <textarea name="description" onChange={handleChange} placeholder="Description" className="input h-24" />

        <input
          type="file"
          multiple
          onChange={(e) => setPhotos([...e.target.files])}
        />

        <button className="w-full rounded-xl bg-yellow-400 py-2 font-semibold text-black">
          Submit Boarding
        </button>
      </form>
    </div>
  );
}