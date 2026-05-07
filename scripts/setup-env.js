const fs = require("fs");
const path = require("path");
const readline = require("readline");
const crypto = require("crypto");

const ENV_PATH = path.resolve(__dirname, "../.env");

// --- Standalone secret generator ---
if (process.argv.includes("--generate-secret")) {
  const secret = crypto.randomBytes(64).toString("hex");
  console.log(secret);
  process.exit(0);
}

const fields = [
  {
    key: "DB_HOST",
    description: "Database host",
    default: "localhost",
  },
  {
    key: "DB_PORT",
    description: "Database port",
    default: "3306",
  },
  {
    key: "DB_NAME",
    description: "Database name",
    default: "sproutified_db",
  },
  {
    key: "DB_USER",
    description: "Database user",
    default: "root",
  },
  {
    key: "DB_PASSWORD",
    description: "Database password",
    default: "",
    secret: true,
  },
  {
    key: "JWT_ACCESS_SECRET",
    description:
      "JWT access token secret (min 8 chars, type 'generate' to auto-fill)",
    default: "",
    secret: true,
    autoGenerate: true,
  },
  {
    key: "JWT_REFRESH_SECRET",
    description:
      "JWT refresh token secret (min 8 chars, type 'generate' to auto-fill)",
    default: "",
    secret: true,
    autoGenerate: true,
  },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

if (fs.existsSync(ENV_PATH)) {
  rl.question(
    "\nA .env file already exists. Overwrite it? (y/N): ",
    (answer) => {
      if (answer.toLowerCase() !== "y") {
        console.log("Setup cancelled. Your existing .env was not changed.\n");
        rl.close();
        process.exit(0);
      }
      runSetup();
    },
  );
} else {
  runSetup();
}

function runSetup() {
  console.log("\nSproutified .env Setup");
  console.log("Press Enter to use the default value shown in brackets.");
  console.log(
    "Type 'generate' for JWT secrets to auto-fill a 64 character hex string.\n",
  );

  const answers = {};
  let index = 0;

  function askNext() {
    if (index >= fields.length) {
      writeEnv(answers);
      return;
    }

    const field = fields[index];
    const defaultHint = field.default
      ? ` [${field.secret ? "****" : field.default}]`
      : "";
    const prompt = `${field.key} (${field.description})${defaultHint}: `;

    rl.question(prompt, (input) => {
      const trimmed = input.trim();

      if (field.autoGenerate && trimmed.toLowerCase() === "generate") {
        const generated = crypto.randomBytes(32).toString("hex");
        console.log(
          `  Generated: ${generated.substring(0, 8)}...${generated.substring(56)}`,
        );
        answers[field.key] = generated;
        index++;
        askNext();
        return;
      }

      const value = trimmed || field.default;

      if (!value) {
        console.log(`  "${field.key}" cannot be empty. Please enter a value.`);
        askNext();
        return;
      }

      if (field.validate && !field.validate(value)) {
        console.log(
          `  Invalid value for ${field.key}. ${field.hint || "Please try again."}`,
        );
        askNext();
        return;
      }

      answers[field.key] = value;
      index++;
      askNext();
    });
  }

  askNext();
}

function writeEnv(answers) {
  const lines = [
    "# Database",
    `DB_HOST=${answers.DB_HOST}`,
    `DB_PORT=${answers.DB_PORT}`,
    `DB_NAME=${answers.DB_NAME}`,
    `DB_USER=${answers.DB_USER}`,
    `DB_PASSWORD=${answers.DB_PASSWORD}`,
    "",
    "# JWT Secrets",
    `JWT_ACCESS_SECRET=${answers.JWT_ACCESS_SECRET}`,
    `JWT_REFRESH_SECRET=${answers.JWT_REFRESH_SECRET}`,
  ];

  fs.writeFileSync(ENV_PATH, lines.join("\n") + "\n", "utf8");

  console.log("\n.env file created successfully at the project root.");
  console.log("Run `npm run dev` to start the development server.\n");
  rl.close();
}
