import api from "./api";

// Get logged-in user profile
export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

// Update profile
export const updateProfile = async (data) => {
  const response = await api.put("/users/profile", data);
  return response.data;
};