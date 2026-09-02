// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// const app = express();

// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   }),
// );

// app.use(express.json({ limit: "50mb" }));
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// export {app};


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// 1. CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 2. Common Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// 3. Import Routes
import validationRoutes from "./routes/validation.routes.js";
import alertRoutes from "./routes/alert.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js"; // (Note: Agar folder name 'middleware' hai to path adjust kar lein)

// 4. Server Health Check Route
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "EcoTrust Validation Engine is healthy & running 🌿",
    timestamp: new Date().toISOString(),
  });
});

// 5. Routes Declaration
app.use("/api/v1/validation", validationRoutes);
app.use("/api/v1/alerts", alertRoutes);

// 6. Global Error Handling Middleware (Hamesha end mein)
app.use(errorHandler);

export { app };