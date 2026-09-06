import axiosInstance from "../config/axios_instance.js";
import AsyncHandler from "../utils/AsyncHandler.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";



export const getdashboardData = AsyncHandler(async (req, res) => {
    console.log("Fetching dashboard data from CEMS server...");
    const response = await axiosInstance.get("/area-compliance");
    console.log("Dashboard data fetched successfully from CEMS server.");
    res.status(200).json(new ApiResponse(200, response.data, "Dashboard data fetched successfully"));
});