import api from "../api/axios";

export const addReview = (data) => {
  const token = localStorage.getItem("token");

  return api.post("/reviews", data, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });
};

export const getReviews = (boardingID) => {
  return api.get(`/reviews/boarding/${boardingID}`);
};