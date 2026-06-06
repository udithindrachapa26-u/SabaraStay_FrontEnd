import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { createBooking } from "../services/bookingService";
import { addReview, getReviews } from "../services/reviewService";

export default function BoardingDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const boardingId = Number(id);

  // STATE
  const [boarding, setBoarding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);

  // LOAD BOARDING DETAILS
  useEffect(() => {
    if (!boardingId || Number.isNaN(boardingId)) {
      setError("Invalid boarding ID");
      setLoading(false);
      return;
    }

    const fetchBoardingDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get(`/boardings/${boardingId}`);
        setBoarding(res.data);
      } catch (err) {
        console.error("Failed to load boarding details", err);
        setError(
          err.response?.data?.message ||
            "Failed to load boarding details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBoardingDetails();
  }, [boardingId]);

  // LOAD REVIEWS
  useEffect(() => {
    if (!boardingId || Number.isNaN(boardingId)) return;
    loadReviews();
  }, [boardingId]);

  const loadReviews = async () => {
    try {
      const res = await getReviews(boardingId);
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to load reviews", err);
    }
  };

  // BOOK NOW
  const handleBookNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setFeedback({ message: "Please log in before booking.", type: "error" });
      navigate("/login");
      return;
    }

    setShowBookingConfirm(true);
  };

  const confirmBooking = async () => {
    setShowBookingConfirm(false);

    try {
      await createBooking(boardingId);
      setFeedback({ message: "Booking confirmed! Redirecting to success page...", type: "success" });
      setTimeout(() => navigate("/booking-success"), 600);
    } catch (error) {
      console.error(error);
      setFeedback({ message: "Booking failed. Please try again.", type: "error" });
    }
  };

  const cancelBooking = () => {
    setShowBookingConfirm(false);
    setFeedback({ message: "Booking canceled.", type: "error" });
  };

  // ADD REVIEW
  const handleAddReview = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setFeedback({ message: "Please log in to add a review.", type: "error" });
      navigate("/login");
      return;
    }

    if (!comment) {
      setFeedback({ message: "Please enter a comment before submitting.", type: "error" });
      return;
    }

    try {
      await addReview({
        boardingId,
        rating: Number(rating),
        comment,
      });

      setFeedback({ message: "Review added successfully!", type: "success" });
      setComment("");
      setRating(5);
      loadReviews(); // reload reviews
    } catch (err) {
      console.error("Review add failed", err);
      setFeedback({
        message:
          err.response?.data?.message || err.message || "Review add failed",
        type: "error",
      });
    }
  };

  const SERVER_URL = "http://localhost:5000";

  // Provide beautiful default placeholder images if no photos are in the database
  const defaultPhotos = [
    "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium animate-pulse">Loading boarding details...</p>
        </div>
      </div>
    );
  }

  if (error || !boarding) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Occurred</h2>
          <p className="text-gray-600 mb-6">{error || "Boarding place details not found."}</p>
          <Link
            to="/home"
            className="inline-block bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-800 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Resolve photos: use uploaded ones if present, fill with default placeholders if fewer than 3
  const boardingPhotos = [...(boarding.photos || [])];
  while (boardingPhotos.length < 3) {
    boardingPhotos.push(defaultPhotos[boardingPhotos.length]);
  }

  const getPhotoUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    return `${SERVER_URL}/${path}`;
  };

  // Compile active facilities
  const facilities = [];
  if (boarding.freeWifi) facilities.push({ name: "Free Wi-Fi", icon: "📶" });
  if (boarding.attachedBathroom) facilities.push({ name: "Attached Bathroom", icon: "🚽" });
  if (boarding.parking) facilities.push({ name: "Parking Space", icon: "🚗" });
  if (boarding.kitchen) facilities.push({ name: "Kitchen Access", icon: "🍳" });

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* HEADER */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            to="/home"
            className="text-sm text-blue-700 font-medium hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {feedback.message && (
        <div
          className={
            feedback.type === "success"
              ? "mx-auto mt-6 max-w-7xl px-6 rounded-2xl border border-emerald-200 bg-emerald-50 py-4 text-emerald-900 shadow-sm"
              : "mx-auto mt-6 max-w-7xl px-6 rounded-2xl border border-red-200 bg-red-50 py-4 text-red-900 shadow-sm"
          }
        >
          {feedback.message}
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Images */}
          <div className="grid grid-cols-3 gap-4">
            <img
              src={getPhotoUrl(boardingPhotos[0])}
              alt={`${boarding.boardingName} main`}
              className="col-span-2 h-72 w-full object-cover rounded-xl shadow"
            />
            <div className="flex flex-col gap-4">
              <img
                src={getPhotoUrl(boardingPhotos[1])}
                alt={`${boarding.boardingName} view 1`}
                className="h-34 w-full object-cover rounded-xl shadow"
              />
              <img
                src={getPhotoUrl(boardingPhotos[2])}
                alt={`${boarding.boardingName} view 2`}
                className="h-34 w-full object-cover rounded-xl shadow"
              />
            </div>
          </div>

          {/* Title */}
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-md mb-2 uppercase tracking-wide">
                  {boarding.boardingType}
                </span>
                <h1 className="text-2xl font-bold text-gray-900">
                  {boarding.boardingName}
                </h1>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  📍 {boarding.address}
                </p>
              </div>
              <div className="text-right">
                <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md mb-2 ${boarding.availableSpace > 0 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                  {boarding.availableSpace > 0 ? "Available" : "Fully Booked"}
                </span>
                <p className="text-xs text-gray-500">
                  {boarding.availableSpace} of {boarding.totalRooms} rooms left
                </p>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold text-gray-900 mb-2">
              About this boarding
            </h2>
            <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
              {boarding.description}
            </p>
            {boarding.distance !== undefined && boarding.distance !== null && (
              <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600 flex items-center gap-2">
                🚀 <span className="font-semibold text-gray-900">{boarding.distance} km</span> to Sabaragamuwa University campus.
              </div>
            )}
          </div>

          {/* Facilities */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold text-gray-900 mb-4">
              Facilities & Amenities
            </h2>

            {facilities.length === 0 ? (
              <p className="text-sm text-gray-500">No additional facilities listed by the owner.</p>
            ) : (
              <div className="flex flex-wrap gap-3 text-sm">
                {facilities.map((item, i) => (
                  <span
                    key={i}
                    className="bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-xl font-medium flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ADD REVIEW */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold mb-4">⭐ Add Your Review</h2>

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border rounded p-2 w-full mb-3"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Stars
                </option>
              ))}
            </select>

            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border rounded p-2 w-full mb-3"
            />

            <button
              onClick={handleAddReview}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Submit Review
            </button>
          </div>

          {/* REVIEWS LIST */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold mb-4">🗣 Student Reviews</h2>

            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet</p>
            ) : (
              reviews.map((r) => (
                <div key={r.reviewID} className="border-b py-3">
                  <p className="font-medium">{r.firstName}</p>
                  <p className="text-yellow-500">
                    {"★".repeat(r.rating)}
                  </p>
                  <p className="text-sm text-gray-600">{r.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* Monthly Rent Card */}
          <div className="bg-white rounded-xl p-6 shadow">
            <p className="text-gray-500 text-sm">Monthly Rent</p>
            <h3 className="text-2xl font-bold text-blue-900 mt-1">
              LKR {Number(boarding.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>

            {showBookingConfirm ? (
              <div className="mt-6 space-y-4 rounded-3xl border border-indigo-100 bg-indigo-50 p-5">
                <div className="text-sm font-semibold text-indigo-900">
                  Confirm Booking
                </div>
                <p className="text-sm text-gray-700">
                  Are you sure you want to book this boarding? Please confirm to complete your reservation.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={cancelBooking}
                    className="flex-1 rounded-xl border border-gray-300 bg-white py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={confirmBooking}
                    className="flex-1 rounded-xl bg-blue-700 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleBookNow}
                disabled={boarding.availableSpace <= 0}
                className={`mt-4 w-full text-white py-2 rounded-lg transition ${boarding.availableSpace <= 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"}`}
              >
                {boarding.availableSpace <= 0 ? "Fully Booked" : "Book Boarding"}
              </button>
            )}
          </div>

          {/* Owner Details Card */}
          {boarding.owner && (
            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                👤 Property Owner
              </h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Name</p>
                  <p className="font-medium text-gray-800">
                    {boarding.owner.firstName} {boarding.owner.lastName}
                  </p>
                </div>
                {boarding.owner.contactNo && (
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Contact Number</p>
                    <a
                      href={`tel:${boarding.owner.contactNo}`}
                      className="font-medium text-blue-700 hover:underline flex items-center gap-1.5 mt-0.5"
                    >
                      📞 {boarding.owner.contactNo}
                    </a>
                  </div>
                )}
                {boarding.owner.email && (
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Email Address</p>
                    <a
                      href={`mailto:${boarding.owner.email}`}
                      className="font-medium text-blue-700 hover:underline flex items-center gap-1.5 mt-0.5"
                    >
                      ✉️ {boarding.owner.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}