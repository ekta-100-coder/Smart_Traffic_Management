import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginUser = async (userId, password, mode) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      userId,
      password,
      mode,
    });
    return res.data;
  } catch (err) {
    return { message: err.response?.data?.message || "Login failed" };
  }
};
