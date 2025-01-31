import axios from "axios";

const API_URL = "/api/v1/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout
const logout = () => {
  localStorage.removeItem("user");
};

// Get current user
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
// jwt-decode      packge for jwt decode
export default {
  register,
  login,
  logout,
  getCurrentUser,
};
