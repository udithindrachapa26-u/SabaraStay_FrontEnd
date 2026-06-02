import api from "../api/axios";

export const createBooking = (boardingId) => {
  return api.post(
    "/bookings",
    { boardingId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const getOwnerBookings = () => {
  return api.get("/bookings/owner", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const confirmBooking = (bookingId) => {
  return api.put(
    `/bookings/${bookingId}`,
    { status: "CONFIRMED" },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
