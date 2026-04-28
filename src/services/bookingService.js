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