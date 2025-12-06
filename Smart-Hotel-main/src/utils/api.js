import axios from "axios";

const BaseURL = "http://localhost:5003/api/v1";

// Helper to get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getBookings = async () => {
  try {
    const response = await axios.get(`${BaseURL}/user/bookings`, {
      headers: getAuthHeader(),
    });
    return response.data.bookings || [];
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return [];
  }
};

export const getFavorites = async () => {
  const response = await axios.get(`${BaseURL}/user/favorites`, { headers: getAuthHeader() });
  return response.data.favorites || [];
};

export const addToFavorites = async (hotelId) => {
  await axios.post(`${BaseURL}/user/favorites/${hotelId}`, {}, { headers: getAuthHeader() });
};

export const removeFromFavorites = async (hotelId) => {
  await axios.delete(`${BaseURL}/user/favorites/${hotelId}`, { headers: getAuthHeader() });
};


export const getProfile = async () => {
  try {
    const response = await axios.get(`${BaseURL}/user/profile`, {
      headers: getAuthHeader(),
    });
    return response.data.user || {};
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return {};
  }
};
