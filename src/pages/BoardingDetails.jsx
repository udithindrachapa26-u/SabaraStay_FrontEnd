import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createBooking } from "../services/bookingService";
import { addReview, getReviews } from "../services/reviewService";

export default function BoardingDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const boardingId = Number(id);

  // ================= STATE =================
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  // ================= LOAD REVIEWS =================
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

  // ================= BOOK NOW =================
  const handleBookNow = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Booking කිරීමට පෙර Login වන්න");
      navigate("/login");
      return;
    }

    try {
      await createBooking(boardingId);
      navigate("/booking-success");
    } catch (error) {
      console.error(error);
      alert("Booking failed. Try again.");
    }
  };

  // ================= ADD REVIEW =================
  const handleAddReview = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Review add කිරීමට Login වන්න");
      navigate("/login");
      return;
    }

    if (!comment) {
      alert("Comment එකක් enter කරන්න");
      return;
    }

    try {
      await addReview({
        boardingId,
        rating: Number(rating),
        comment,
      });

      alert("Review added successfully!");
      setComment("");
      setRating(5);
      loadReviews(); // reload reviews
    } catch (err) {
      console.error("Review add failed", err);
      alert(
        err.response?.data?.message || err.message || "Review add failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* ===== HEADER ===== */}
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

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ===== LEFT SIDE ===== */}
        <div className="lg:col-span-2 space-y-6">

          {/* Images */}
          <div className="grid grid-cols-3 gap-4">
            <img
              src="https://images.unsplash.com/photo-1586105251261-72a756497a11"
              className="col-span-2 h-72 w-full object-cover rounded-xl shadow"
            />
            <div className="flex flex-col gap-4">
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
                className="h-34 w-full object-cover rounded-xl shadow"
              />
              <img
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
                className="h-34 w-full object-cover rounded-xl shadow"
              />
            </div>
          </div>

          {/* Title */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h1 className="text-2xl font-bold text-gray-900">
              Green View Boarding
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Near Sabaragamuwa University
            </p>
          </div>

          {/* About */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold text-gray-900 mb-2">
              About this boarding
            </h2>
            <p className="text-sm text-gray-600">
              Comfortable and secure boarding place with all essential
              facilities for students.
            </p>
          </div>

          {/* Facilities */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold text-gray-900 mb-4">
              Facilities
            </h2>

            <div className="flex flex-wrap gap-3 text-sm">
              {[
                "Free Wi-Fi",
                "Attached Bathroom",
                "Study Table",
                "Parking",
                "24/7 Water",
                "Security",
              ].map((item, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* ===== ADD REVIEW ===== */}
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

          {/* ===== REVIEWS LIST ===== */}
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

        {/* ===== RIGHT SIDEBAR ===== */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow">
            <p className="text-gray-500 text-sm">Monthly Rent</p>
            <h3 className="text-2xl font-bold text-blue-900 mt-1">
              LKR 8,000
            </h3>

            <button
              onClick={handleBookNow}
              className="mt-4 w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
            >
              Book Boarding
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}