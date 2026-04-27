require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan"); // HTTP request logger
const GardenRoutes = require("./routes/garden-routes");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit"); // rate limiter
const helmet = require("helmet"); // XSS Protection

app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.static("public"));
app.use(express.static("public/sites", { extensions: ["html"] }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use("/api", GardenRoutes);

// 404 handler for unknown API routes
app.use("/api", (req, res) => {
  res
    .status(404)
    .json({ success: false, message: "This endpoint does not exist." });
});

// Global error handler -> unhandled errors in route handlers
app.use((err, req, res, next) => {
  console.error(
    `Unhandled error on ${req.method} ${req.originalUrl}:`,
    err.message,
  );
  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { success: false, message: "Too many attempts. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
