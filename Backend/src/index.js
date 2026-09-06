import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";


// =========================================================
// Server Startup
// =========================================================

const server = app.listen(PORT, () => {

    console.log("\n");
    console.log("=================================================");
    console.log("🚀 EcoTrust Backend Server Started");
    console.log("=================================================");
    console.log(`📡 Server      : http://${HOST}:${PORT}`);
    console.log(`🌱 Environment : ${process.env.NODE_ENV || "development"}`);
    console.log(`🔗 API Base    : http://${HOST}:${PORT}/api`);
    console.log("=================================================");
    console.log("✅ Server is ready to accept requests");
    console.log("=================================================\n");

});
app.get("/",(req,res)=>{
    res.send("Welcome to EcoTrust Backend Server. Please use the /api/cems endpoint for CEMS related operations.")
})

