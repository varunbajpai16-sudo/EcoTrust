import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/Db.config.js";
import app from "./app.js";
import  {simulateSensor} from "./services/simulator.services.js";
import Sensor from "./models/sensor.models.js";
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);

    });
  } catch (error) {
    console.error("Server startup failed:", error);
  }
};
startServer()


