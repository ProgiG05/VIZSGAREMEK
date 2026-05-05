require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan"); // HTTP request logger
const GardenRoutes = require("./routes/garden-routes");
const cookieParser = require("cookie-parser");
const helmet = require("helmet"); // XSS Protection

app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.static("public"));
app.use(express.static("public/sites", { extensions: ["html"] }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sproutified API",
      version: "1.0.0",
      description: "API documentation for Sproutified's features",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

if (process.env.NODE_ENV === "development") {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

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
  console.log(`Swagger docs http://localhost:${port}/api/docs`); //remove at the end
});
