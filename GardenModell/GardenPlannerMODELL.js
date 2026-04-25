const mysql = require("mysql2/promise")
const connection = mysql.createPool({   
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})


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
    harvesting LIKE ?`


module.exports = {
    GetAllIdeas: async() => {
        const [rows] = await connection.query(`SELECT * FROM ideas`)
        return rows
    },
    GetAllKnowledges : async function GetAllKnowledges() {
     const [rows] = await connection.query(`SELECT * FROM knowledges`)
     return rows
    },
    GetSearchedPlantDetails : async function GetSearchedPlantDetails(commonName, botanicalName, origin, type, water, sunlight, soil, indoor, seeds, planting, pruning, harvesting) {
        const [rows] = await connection.query(plant_search_query, [commonName, botanicalName, origin, type, water, sunlight, soil, indoor, seeds, planting, pruning, harvesting])
        console.log(rows)
        return rows
    },
    AddNewgarden : async function CreateGarden(garden) {
        const [rows] = await connection.query(`INSERT INTO garden_manager (user_id, garden_name, garden_content) VALUES(?,?,?)`,[garden.user_id, garden.garden_name, garden.garden_content])
        return rows
    },
    GetMySavedPlants : async function GetMySavedPlants(userid) {
        const [rows] = await connection.query(`SELECT * FROM saved_plants WHERE user_id = ?`, [userid])
        return rows
    },
    SavePlant : async function SavePlant(userid, plantid) {
        const [rows] = await connection.query(`INSERT INTO saved_plants (user_id, plant_id) VALUES(?,?)`, [userid, plantid])
        return rows
    },
    GetGardensByUserId : async function GetGardensByUserId(userId) {
        const [rows] = await connection.query(`SELECT * FROM garden_manager WHERE user_id = ?`, [userId])
        return rows
    },
    GetGardenById : async function GetGardenById(id, userId) {
        const [rows] = await connection.query(`SELECT * FROM garden_manager WHERE id = ? AND user_id = ?`, [id, userId])
        return rows
    },
    GetAllWorksAndTools : async function GetAllWorksAndTools() {
        const [rows] = await connection.query(`SELECT * FROM worksandtools`)
        return rows
    },
    GetGardens: async (userId) => {
        const [rows] = await connection.query('SELECT * FROM garden_manager WHERE user_id = ?', [userId])
        return rows
    },
    GetAllPlants: async () => {
        const [rows] = await connection.query('SELECT * FROM plants')
        return rows
    },
    DeleteGarden: async (id, userId) => {
        const [rows] = await connection.query('DELETE FROM garden_manager WHERE id = ? AND user_id = ?', [id, userId])
        return rows
    },
    UpdateGarden: async (garden, userId) => {
        const [rows] = await connection.query('UPDATE garden_manager SET garden_content = ? , garden_name = ? WHERE id = ? AND user_id = ?', [garden.content, garden.name, garden.id, userId])
        return rows
    },
    GetUserByUsername: async function GetUserByUsername(username) {
        const [rows] = await connection.query(
            `SELECT * FROM users WHERE username = ? LIMIT 1`,
            [username]
        )
        return rows
    },
    CreateUser: async function CreateUser(username, passwordHash) {
        const [rows] = await connection.query(
            `INSERT INTO users (username, password) VALUES (?, ?)`,
            [username, passwordHash]
        )
        return rows
    },
}