import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setStudent(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse cached user data:", error);
      }
    }

    // 👤 Get student profile if we don't already have it cached
    if (!storedUser) {
      api
        .get("/students/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setStudent(res.data))
        .catch((error) => {
          if (error.response?.status === 401 || error.response?.status === 403) {
            navigate("/login");
          } else {
            console.error("Failed to load student profile:", error);
          }
        });
    }

    // 📚 Get my bookings
    api
      .get("/bookings/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBookings(res.data))
      .catch((error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/login");
        } else {
          console.error("Failed to load bookings:", error);
        }
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

      {/* STUDENT INFO */}
      {student && (
        <div className="bg-white p-5 rounded-lg shadow mb-6">
          <h2 className="font-semibold text-lg">
            👋 Welcome {student.firstName}
          </h2>
          <p className="text-sm text-gray-600">{student.email}</p>
        </div>
      )}

      {/* BOOKINGS */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h3 className="font-semibold mb-4">📚 My Bookings</h3>

        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet</p>
        ) : (
          <ul className="space-y-3">
            {bookings.map((b) => (
              <li
                key={b.id}
                className="border p-3 rounded flex justify-between"
              >
                <span>{b.boarding_name}</span>
                <span className="text-sm font-medium text-blue-700">
                  {b.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}