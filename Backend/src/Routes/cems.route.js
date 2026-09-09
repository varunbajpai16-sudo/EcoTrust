import Router from "express";
import { getdashboardData } from "../controllers/cems.controller.js";
const route = Router();

route.get("/dashboard", getdashboardData);


export default route;