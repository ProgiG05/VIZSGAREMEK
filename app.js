require("dotenv").config();

// --- .env validation ---

const requiredEnvVars = [
  {
    key: "DB_HOST",
    example:
      "DB_HOST=localhost. To generate a .env file, write into console 'npm run setup'",
  },
  {
    key: "DB_PORT",
    example: "DB_PORT=3306",
    validate: (v) => !isNaN(Number(v)),
    hint: "must be a valid port number",
  },
  { key: "DB_NAME", example: "DB_NAME=sproutified_db" },
  { key: "DB_USER", example: "DB_USER=root" },
  {
    key: "DB_PASSWORD",
    example: "DB_PASSWORD=yourpassword",
    allowEmpty: true,
  },
  {
    key: "JWT_ACCESS_SECRET",
    example: "JWT_ACCESS_SECRET=yoursecret",
    validate: (v) => v.length >= 16,
    hint: "must be at least 16 characters long",
  },
  {
    key: "JWT_REFRESH_SECRET",
    example: "JWT_REFRESH_SECRET=yoursecret",
    validate: (v) => v.length >= 16,
    hint: "must be at least 16 characters long",
  },
];

for (const envVar of requiredEnvVars) {
  const value = process.env[envVar.key];

  if (typeof value === "undefined") {
    console.error(`Missing .env value: "${envVar.key}" is not set.`);
    console.error(
      `Fix: Add the following line to your .env file: ${envVar.example}`,
    );
    process.exit(1);
  }

  if (!envVar.allowEmpty && value.trim() === "") {
    console.error(`Missing .env value: "${envVar.key}" is empty.`);
    console.error(
      `Fix: Add the following line to your .env file: ${envVar.example}`,
    );
    process.exit(1);
  }

  if (envVar.validate && !envVar.validate(value)) {
    console.error(
      `Invalid .env value: "${envVar.key}" is incorrectly configured.`,
    );
    console.error(`Reason: ${envVar.hint}`);
    console.error(`Fix: Check your .env file. Example: ${envVar.example}`);
    process.exit(1);
  }
}

// --- App setup ---

const express = require("express");
const app = express();
const morgan = require("morgan");
const GardenRoutes = require("./routes/garden-routes");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

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
  console.log(`Swagger docs http://localhost:${port}/api/docs`);
});
