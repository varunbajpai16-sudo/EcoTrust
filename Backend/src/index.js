import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { startCemsPoller } from "./jobs/poller.job.js";

dotenv.config();

const PORT = process.env.PORT || 10000;

console.log("Starting EcoTrust Backend...");
console.log("PORT:", PORT);
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Loaded" : "Missing");

connectDB()
    .then(() => {
        console.log("✅ MongoDB connected successfully");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`⚙️ Server is running on port: ${PORT}`);

            startCemsPoller();
            console.log("✅ CEMS Poller started");
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1);
    });