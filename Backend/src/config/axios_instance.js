import axios from "axios"
import dotenv from "dotenv";

dotenv.config();
const axiosInstance = axios.create({
  baseURL: process.env.CEMS_SERVER_HOST,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export default axiosInstance;