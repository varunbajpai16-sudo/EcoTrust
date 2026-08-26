import axios from "axios";
import ApiError from "../utils/ApiError.js";

const CEMS_BASE_URL = process.env.CEMS_SERVER_URL || "http://localhost:5000/api/v1";

const apiClient = axios.create({
  baseURL: CEMS_BASE_URL,
  timeout: 8000,
});

export const getActiveFactories = async () => {
  try {
    const response = await apiClient.get("/cems/factories");
    return response.data?.data || [];
  } catch (error) {
    console.error("❌ Error fetching factories from CEMS Server:", error.message);
    return [];
  }
};

export const getLatestReadingByFactory = async (factoryId) => {
  try {
    const response = await apiClient.get(`/cems/factory/${factoryId}/latest`);
    return response.data?.data || null;
  } catch (error) {
    // Agar reading nahi mili
    return null;
  }
};

export const getFactoryHistoricalReadings = async (factoryId, limit = 10) => {
  try {
    const response = await apiClient.get(`/cems/factory/${factoryId}/readings?limit=${limit}`);
    return response.data?.data || [];
  } catch (error) {
    return [];
  }
};