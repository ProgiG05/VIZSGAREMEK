const fs = require("fs");
const path = require("path");
const readline = require("readline");
const crypto = require("crypto");
const { execSync } = require("child_process");

const ENV_PATH = path.resolve(__dirname, "../.env");

if (process.argv.includes("--generate-secret")) {
  console.log(crypto.randomBytes(64).toString("hex"));
  process.exit(0);
}

function installDependencies() {
  const projectRoot = path.resolve(__dirname, "..");
  const lockPath = path.join(projectRoot, "package-lock.json");

  console.log("\nInstalling dependencies...");

  try {
    if (fs.existsSync(lockPath)) {
      execSync("npm ci", {
        cwd: projectRoot,
        stdio: "inherit",
      });
    } else {
      execSync("npm install", {
        cwd: projectRoot,
        stdio: "inherit",
      });
    }

    console.log("Dependencies installed successfully.");
  } catch {
    console.error("\nDependency installation failed.");
    process.exit(1);
  }
}

async function main() {
  if (fs.existsSync(ENV_PATH)) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    await new Promise((resolve) => {
      rl.question(
        "\nA .env file already exists. Overwrite it? (y/N): ",
        (answer) => {
          rl.close();
          if (answer.toLowerCase() !== "y") {
            console.log(
              "Setup cancelled. Your existing .env was not changed.\n",
            );
            process.exit(0);
          }
          resolve();
        },
      );
    });
  }

  const lines = [
    "# Database",
    "DB_HOST=localhost",
    "DB_PORT=3306",
    "DB_NAME=sproutified_db",
    "DB_USER=root",
    "DB_PASSWORD=",
    "",
    "# JWT Secrets",
    `JWT_ACCESS_SECRET=${crypto.randomBytes(64).toString("hex")}`,
    `JWT_REFRESH_SECRET=${crypto.randomBytes(64).toString("hex")}`,
  ];

  fs.writeFileSync(ENV_PATH, lines.join("\n") + "\n", "utf8");
  console.log("\n.env file created successfully at the project root.");

  installDependencies();
  await setupDatabase();
}

// --- DB setup ---

const EXPECTED_TABLES = [
  "users",
  "refresh_tokens",
  "plants",
  "ideas",
  "knowledges",
  "garden_manager",
  "saved_plants",
  "saved_ideas",
];

const EXPECTED_ROW_COUNTS = [
  { table: "plants", count: 82 },
  { table: "ideas", count: 13 },
  { table: "knowledges", count: 15 },
];

const EXPECTED_UNIQUE_KEYS = [
  { table: "saved_plants", keyName: "unique_user_plant" },
  { table: "saved_ideas", keyName: "unique_user_idea" },
];

const EXPECTED_FOREIGN_KEYS = [
  { table: "garden_manager", column: "user_id", refTable: "users" },
  { table: "refresh_tokens", column: "user_id", refTable: "users" },
  { table: "saved_plants", column: "user_id", refTable: "users" },
  { table: "saved_plants", column: "plant_id", refTable: "plants" },
  { table: "saved_ideas", column: "user_id", refTable: "users" },
  { table: "saved_ideas", column: "idea_id", refTable: "ideas" },
];

async function validateDatabase(connection, dbName) {
  const issues = [];

  const [tables] = await connection.query(`SHOW TABLES`);
  const tableNames = tables.map((r) => Object.values(r)[0]);

  for (const expected of EXPECTED_TABLES) {
    if (!tableNames.includes(expected)) {
      issues.push(`Missing table: "${expected}"`);
    }
  }

  if (issues.length > 0) return issues;

  for (const { table, count } of EXPECTED_ROW_COUNTS) {
    const [[{ total }]] = await connection.query(
      `SELECT COUNT(*) AS total FROM \`${table}\``,
    );
    if (total < count) {
      issues.push(
        `Table "${table}" has ${total} rows, expected at least ${count}`,
      );
    }
  }

  for (const { table, keyName } of EXPECTED_UNIQUE_KEYS) {
    const [keys] = await connection.query(
      `SELECT INDEX_NAME FROM information_schema.STATISTICS
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND INDEX_NAME = ? AND NON_UNIQUE = 0`,
      [dbName, table, keyName],
    );
    if (keys.length === 0) {
      issues.push(`Missing UNIQUE constraint "${keyName}" on table "${table}"`);
    }
  }

  for (const { table, column, refTable } of EXPECTED_FOREIGN_KEYS) {
    const [fks] = await connection.query(
      `SELECT CONSTRAINT_NAME FROM information_schema.KEY_COLUMN_USAGE
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ? AND REFERENCED_TABLE_NAME = ?`,
      [dbName, table, column, refTable],
    );
    if (fks.length === 0) {
      issues.push(
        `Missing foreign key on "${table}.${column}" -> "${refTable}"`,
      );
    }
  }

  return issues;
}

async function setupDatabase() {
  let mysql;
  try {
    mysql = require("mysql2/promise");
  } catch {
    console.log("\nSkipping database setup: mysql2 is not installed yet.");
    console.log("Run the setup script again after dependencies install.\n");
    process.exit(0);
  }

  const sqlPath = path.resolve(__dirname, "db/sproutified_db.sql");
  if (!fs.existsSync(sqlPath)) {
    console.log(
      "\nSkipping database setup: sproutified_db.sql not found in scripts/db/.",
    );
    console.log("Run `npm run dev` to start the development server.\n");
    process.exit(0);
  }

  console.log("\nChecking database connection...");

  let connection;
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      multipleStatements: true,
    });
  } catch (err) {
    console.log(`\nCould not connect to MySQL: ${err.message}`);
    console.log("Make sure MySQL is running in XAMPP.");
    console.log("Run `npm run dev` to start the development server.\n");
    process.exit(0);
  }

  try {
    const [rows] = await connection.query(
      `SELECT SCHEMA_NAME FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = ?`,
      ["sproutified_db"],
    );

    if (rows.length > 0) {
      await connection.query(`USE \`sproutified_db\``);
      const [tables] = await connection.query(`SHOW TABLES`);

      if (tables.length > 0) {
        console.log("\nDatabase found. Validating schema...");
        const issues = await validateDatabase(connection, "sproutified_db");

        if (issues.length === 0) {
          console.log("Database validation passed.");
          await connection.end();
          console.log("Run `npm run dev` to start the development server.\n");
          process.exit(0);
        }

        console.log("\nDatabase validation failed:");
        issues.forEach((issue) => console.log(`  - ${issue}`));
        console.log("\nRe-importing database to fix issues...");
      }
    }

    console.log("\nSetting up database...");
    await connection.query(fs.readFileSync(sqlPath, "utf8"));
    console.log("Database set up successfully.");
  } catch (err) {
    console.error("\nDatabase setup failed:", err.message);
  } finally {
    await connection.end();
  }

  console.log("Run `npm run dev` to start the development server.\n");
  process.exit(0);
}

main();
