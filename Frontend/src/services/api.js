// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 1. Live Dashboard Data (Saari factories + latest Trust Score)
// export const getLiveDashboard = async () => {
//   const response = await apiClient.get("/validation/dashboard/live");
//   return response.data?.data || [];
// };

// // 2. Factory History & Graph Data
// export const getFactoryHistory = async (factoryId, limit = 50) => {
//   const response = await apiClient.get(`/validation/factory/${factoryId}/history?limit=${limit}`);
//   return response.data?.data || [];
// };

// // 3. Active Alerts (Bypass / Tampering / Sensor Faults)
// export const getActiveAlerts = async () => {
//   const response = await apiClient.get("/alerts");
//   return response.data?.data || [];
// };

// // 4. Alert Summary / Stats (Badge Counters ke liye)
// export const getAlertStats = async () => {
//   const response = await apiClient.get("/alerts/stats");
//   return response.data?.data || { totalUnresolved: 0 };
// };

// // 5. Alert Resolve karna
// export const resolveAlert = async (alertId) => {
//   const response = await apiClient.patch(`/alerts/${alertId}/resolve`);
//   return response.data?.data;
// };

// // 6. On-Demand "Run Audit Now" Button
// export const triggerFactoryAudit = async (factoryId) => {
//   const response = await apiClient.post(`/validation/factory/${factoryId}/trigger`);
//   return response.data?.data;
// };


import axios from "axios";

// EcoTrust Validation Backend Base URL
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8000/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Live Dashboard Data (Saari factories + latest Trust Score)
export const getLiveDashboard = async () => {
  try {
    const response = await apiClient.get("/validation/dashboard/live");
    return response.data?.data || response.data || [];
  } catch (error) {
    console.error("❌ Failed to fetch live validation dashboard:", error.message);
    return []; // Return empty array so UI doesn't break
  }
};

// 2. Factory History & Graph Data
export const getFactoryHistory = async (factoryId, limit = 50) => {
  try {
    const response = await apiClient.get(`/validation/factory/${factoryId}/history?limit=${limit}`);
    return response.data?.data || response.data || [];
  } catch (error) {
    console.error(`❌ Failed to fetch history for ${factoryId}:`, error.message);
    return [];
  }
};

// 3. Active Alerts (Bypass / Tampering / Sensor Faults)
export const getActiveAlerts = async () => {
  try {
    const response = await apiClient.get("/alerts");
    return response.data?.data || response.data || [];
  } catch (error) {
    console.error("❌ Failed to fetch active alerts:", error.message);
    return [];
  }
};

// 4. Alert Summary / Stats (Badge Counters ke liye)
export const getAlertStats = async () => {
  try {
    const response = await apiClient.get("/alerts/stats");
    return response.data?.data || response.data || { totalUnresolved: 0 };
  } catch (error) {
    console.error("❌ Failed to fetch alert stats:", error.message);
    return { totalUnresolved: 0 };
  }
};

// 5. Alert Resolve karna
export const resolveAlert = async (alertId) => {
  try {
    const response = await apiClient.patch(`/alerts/${alertId}/resolve`);
    return response.data?.data || response.data;
  } catch (error) {
    console.error(`❌ Failed to resolve alert ${alertId}:`, error.message);
    throw error;
  }
};

// 6. On-Demand "Run Audit Now" Button
export const triggerFactoryAudit = async (factoryId) => {
  try {
    const response = await apiClient.post(`/validation/factory/${factoryId}/trigger`);
    return response.data?.data || response.data;
  } catch (error) {
    console.error(`❌ Failed to trigger audit for ${factoryId}:`, error.message);
    throw error;
  }
};

export default apiClient;