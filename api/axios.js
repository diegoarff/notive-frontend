import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const authApi = axios.create({
  baseURL: `${BASE_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
