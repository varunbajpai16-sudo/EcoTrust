import express from "express";
import cors from "cors";

import cemsRoutes from "./routes/cems.route.js";
import errorMiddleware from "./Middlewares/error.middleware.js";

const app = express();


// =========================================================
// Global Middlewares
// =========================================================

// Enable CORS
app.use(
  cors({
    origin: "*",
  })
);

// Parse JSON request bodies
app.use(
  express.json({
    limit: "10mb",
  })
);

// Parse URL-encoded data
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);


// =========================================================
// Health Check
// =========================================================

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CEMS Server is running",
    service: "CEMS Server",
    timestamp: new Date(),
  });
});


// =========================================================
// CEMS Routes
// =========================================================

app.use(
  "/api/cems",
  cemsRoutes
);



export default app;