import { Link, useNavigate } from "react-router-dom";
import { createBooking } from "../services/bookingService";

export default function BoardingDetails() {
  const navigate = useNavigate();

  // ================= BOOK NOW HANDLER =================
  const handleBookNow = async () => {
    const token = localStorage.getItem("token");

    // 1️⃣ Login check
    if (!token) {
      alert("Booking කිරීමට පෙර Login වන්න");
      navigate("/login");
      return;
    }

    // 2️⃣ Call booking API
    try {
      await createBooking(1); // boarding ID (demo)

      // ✅ SUCCESS → go to success page
      navigate("/booking-success");

    } catch (error) {
      console.error(error);
      alert("Booking failed. Try again.");
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
            <p className="text-sm text-gray-600 leading-relaxed">
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
        </div>

        {/* ===== RIGHT SIDEBAR ===== */}
        <div className="space-y-6">
          {/* Price + Book */}
          <div className="bg-white rounded-xl p-6 shadow">
            <p className="text-gray-500 text-sm">Monthly Rent</p>
            <h3 className="text-2xl font-bold text-blue-900 mt-1">
              LKR 8,000
            </h3>

            <button
              onClick={handleBookNow}
              className="mt-4 w-full bg-blue-700 text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition"
            >
              Book Boarding
            </button>
          </div>

          {/* Owner Info */}
          <div className="bg-white rounded-xl p-6 shadow text-sm">
            <h4 className="font-semibold text-gray-900 mb-2">
              Contact Owner
            </h4>
            <p className="text-gray-600">📞 077 123 4567</p>
            <p className="text-gray-600 mt-1">📍 Belihuloya</p>
          </div>
        </div>
      </div>
    </div>
  );
}