import dotenv from "dotenv";

dotenv.config();

import connectDB from "./config/Db.config.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("");
      console.log("╔════════════════════════════════════════╗");
      console.log("║          🌿 ECOTRUST CEMS              ║");
      console.log("║             SERVER                     ║");
      console.log("╚════════════════════════════════════════╝");
      console.log("");
      console.log(`🚀 CEMS Server: http://localhost:${PORT}`);
      console.log(`❤️  Health:     http://localhost:${PORT}/health`);
      console.log(`📡 CEMS API:   http://localhost:${PORT}/api/cems`);
      console.log("");
      console.log("🟢 CEMS Server is ready!");
      console.log("");
    });
  } catch (error) {
    console.error("❌ Failed to start CEMS Server");
    console.error(error.message);

    process.exit(1);
  }
};

startServer();