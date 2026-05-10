import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function BookingSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        
        {/* Icon */}
        <div className="flex justify-center">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Booking Successful 🎉
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-sm mt-3 leading-relaxed">
          Your booking is submited successfully.  
          Boarding owner will contact you soon.
        </p>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <Link
            to="/home"
            className="block w-full bg-blue-700 text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition"
          >
            Go to Home
          </Link>

          <Link
            to="/my-bookings"
            className="block w-full border border-blue-700 text-blue-700 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            View My Bookings
          </Link>
        </div>
      </div>
    </div>
  );
}