// import axios from "axios";
// import ApiError from "../utils/ApiError.js";

// const CEMS_BASE_URL = process.env.CEMS_SERVER_URL || "http://localhost:5000/api/v1";

// const apiClient = axios.create({
//   baseURL: CEMS_BASE_URL,
//   timeout: 8000,
// });

// export const getActiveFactories = async () => {
//   try {
//     const response = await apiClient.get("/cems/factories");
//     return response.data?.data || [];
//   } catch (error) {
//     console.error("❌ Error fetching factories from CEMS Server:", error.message);
//     return [];
//   }
// };

// export const getLatestReadingByFactory = async (factoryId) => {
//   try {
//     const response = await apiClient.get(`/cems/factory/${factoryId}/latest`);
//     return response.data?.data || null;
//   } catch (error) {
//     // Agar reading nahi mili
//     return null;
//   }
// };

// export const getFactoryHistoricalReadings = async (factoryId, limit = 10) => {
//   try {
//     const response = await apiClient.get(`/cems/factory/${factoryId}/readings?limit=${limit}`);
//     return response.data?.data || [];
//   } catch (error) {
//     return [];
//   }
// };

import axios from "axios";

const CEMS_BASE_URL = process.env.CEMS_SERVER_URL || "https://ecotrust-gryx.onrender.com/api/cems";

const apiClient = axios.create({
  baseURL: CEMS_BASE_URL,
  timeout: 15000, // Render cold start ke liye 15s timeout
});

// 1. Get all active factories (GET /api/cems/factories)
export const getActiveFactories = async () => {
  try {
    const response = await apiClient.get("/factories");
    return response.data?.data || response.data || [];
  } catch (error) {
    console.error("❌ Error fetching factories from CEMS Server:", error.message);
    return [];
  }
};

// 2. Get latest emission reading of a factory (GET /api/cems/factories/:factoryId/latest)
export const getLatestReadingByFactory = async (factoryId) => {
  try {
    const response = await apiClient.get(`/factories/${factoryId}/latest`);
    return response.data?.data || response.data || null;
  } catch (error) {
    console.warn(`⚠️ No latest reading for factory ${factoryId}:`, error.message);
    return null;
  }
};

// 3. Get emission history of a factory (GET /api/cems/factories/:factoryId/readings)
export const getFactoryHistoricalReadings = async (factoryId) => {
  try {
    const response = await apiClient.get(`/factories/${factoryId}/readings`);
    return response.data?.data || response.data || [];
  } catch (error) {
    return [];
  }
};

// 4. Get factory sensors (GET /api/cems/factories/:factoryId/sensors)
export const getFactorySensors = async (factoryId) => {
  try {
    const response = await apiClient.get(`/factories/${factoryId}/sensors`);
    return response.data?.data || response.data || [];
  } catch (error) {
    return [];
  }
};