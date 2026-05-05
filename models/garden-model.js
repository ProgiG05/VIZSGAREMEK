const mysql = require("mysql2/promise");
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const plant_search_query = `
    SELECT * FROM plants 
    WHERE 
    common_name LIKE ? OR
    botanical_name LIKE ? OR 
    origin LIKE ? OR
    type LIKE ? OR 
    water LIKE ? OR 
    sunlight LIKE ? OR 
    soil LIKE ? OR 
    indoor LIKE ? OR
    seeds LIKE ? OR
    planting LIKE ? OR 
    pruning LIKE ? OR
    harvesting LIKE ?`;

module.exports = {
  getAllIdeas: async () => {
    const [rows] = await connection.query(`SELECT * FROM ideas`);
    return rows;
  },
  getAllKnowledges: async function GetAllKnowledges() {
    const [rows] = await connection.query(`SELECT * FROM knowledges`);
    return rows;
  },
  getSearchedPlantDetails: async function GetSearchedPlantDetails(
    commonName,
    botanicalName,
    origin,
    type,
    water,
    sunlight,
    soil,
    indoor,
    seeds,
    planting,
    pruning,
    harvesting,
  ) {
    const [rows] = await connection.query(plant_search_query, [
      commonName,
      botanicalName,
      origin,
      type,
      water,
      sunlight,
      soil,
      indoor,
      seeds,
      planting,
      pruning,
      harvesting,
    ]);
    console.log(rows);
    return rows;
  },
  createGarden: async function createGarden(garden) {
    const [rows] = await connection.query(
      `INSERT INTO garden_manager (user_id, garden_name, garden_content) VALUES(?,?,?)`,
      [garden.user_id, garden.garden_name, garden.garden_content],
    );
    return rows;
  },
  getMySavedPlants: async function getMySavedPlants(userid) {
    const [rows] = await connection.query(
      `SELECT * FROM saved_plants JOIN plants ON saved_plants.plant_id = plants.id WHERE saved_plants.user_id = ?`,
      [userid],
    );
    return rows;
  },
  savePlant: async function savePlant(userid, plantid) {
    const [existing] = await connection.query(
      `SELECT * FROM saved_plants WHERE user_id = ? AND plant_id = ?`,
      [userid, plantid],
    );

    if (existing.length > 0) {
      const [rows] = await connection.query(
        `DELETE FROM saved_plants WHERE user_id = ? AND plant_id = ?`,
        [userid, plantid],
      );
      return { action: "removed", result: rows };
    } else {
      const [rows] = await connection.query(
        `INSERT INTO saved_plants (user_id, plant_id) VALUES(?,?)`,
        [userid, plantid],
      );
      return { action: "added", result: rows };
    }
  },
  getGardensByUserId: async function getGardensByUserId(userId) {
    const [rows] = await connection.query(
      `SELECT * FROM garden_manager WHERE user_id = ?`,
      [userId],
    );
    return rows;
  },
  getGardenById: async function getGardenById(id, userId) {
    const [rows] = await connection.query(
      `SELECT * FROM garden_manager WHERE id = ? AND user_id = ?`,
      [id, userId],
    );
    return rows;
  },
  getAllWorksAndTools: async function getAllWorksAndTools() {
    const [rows] = await connection.query(`SELECT * FROM worksandtools`);
    return rows;
  },
  getGardens: async (userId) => {
    const [rows] = await connection.query(
      "SELECT * FROM garden_manager WHERE user_id = ?",
      [userId],
    );
    return rows;
  },
  getAllPlants: async () => {
    const [rows] = await connection.query("SELECT * FROM plants");
    return rows;
  },
  deleteGarden: async (id, userId) => {
    const [rows] = await connection.query(
      "DELETE FROM garden_manager WHERE id = ? AND user_id = ?",
      [id, userId],
    );
    return rows;
  },
  updateGarden: async (garden, userId) => {
    const [rows] = await connection.query(
      "UPDATE garden_manager SET garden_content = ? , garden_name = ? WHERE id = ? AND user_id = ?",
      [garden.content, garden.name, garden.id, userId],
    );
    return rows;
  },
  getUserByUsername: async function getUserByUsername(username) {
    const [rows] = await connection.query(
      `SELECT * FROM users WHERE username = ? LIMIT 1`,
      [username],
    );
    return rows;
  },
  createUser: async function createUser(username, passwordHash) {
    const [rows] = await connection.query(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      [username, passwordHash],
    );
    return rows;
  },
  storeRefreshToken: async (userId, tokenHash) => {
    await connection.query(
      `INSERT INTO refresh_tokens (user_id, token_hash, created_at) VALUES (?, ?, NOW())`,
      [userId, tokenHash],
    );
  },
  getLatestRefreshToken: async (userId) => {
    const [rows] = await connection.query(
      `SELECT * FROM refresh_tokens WHERE user_id = ? ORDER BY created_at DESC LIMIT 1`,
      [userId],
    );
    return rows[0];
  },
  deleteRefreshTokens: async (userId) => {
    await connection.query(`DELETE FROM refresh_tokens WHERE user_id = ?`, [
      userId,
    ]);
  },
  getMySavedIdeas: async function getMySavedIdeas(userid) {
    const [rows] = await connection.query(
      `SELECT * FROM saved_ideas JOIN ideas ON saved_ideas.idea_id = ideas.id WHERE saved_ideas.user_id = ?`,
      [userid],
    );
    return rows;
  },
  saveIdea: async (userid, ideaid) => {
    const [existing] = await connection.query(
      `SELECT * FROM saved_ideas WHERE user_id = ? AND idea_id = ?`,
      [userid, ideaid]
    );

    if (existing.length > 0) {
      const [rows] = await connection.query(
        `DELETE FROM saved_ideas WHERE user_id = ? AND idea_id = ?`,
        [userid, ideaid]
      );
      return { action: "removed", result: rows };
    } else {
      const [rows] = await connection.query(
        `INSERT INTO saved_ideas (user_id, idea_id) VALUES (?, ?)`,
        [userid, ideaid]
      );
      return { action: "added", result: rows };
    }
  },
  getUserById: async (userId) => {
    const [rows] = await connection.query(
      `SELECT id, username, password FROM users WHERE id = ? LIMIT 1`,
      [userId]
    );
    return rows[0];
  },
  updateUsername: async (userId, newUsername) => {
    const [rows] = await connection.query(
      `UPDATE users SET username = ? WHERE id = ?`,
      [newUsername, userId]
    );
    return rows;
  },
  updatePassword: async (userId, newPasswordHash) => {
    const [rows] = await connection.query(
      `UPDATE users SET password = ? WHERE id = ?`,
      [newPasswordHash, userId]
    );
    return rows;
  },
};
