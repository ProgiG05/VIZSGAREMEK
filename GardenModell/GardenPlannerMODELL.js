require('dotenv').config();
const mysql = require("mysql2/promise")
const connection = mysql.createPool({   
host:     process.env.DB_HOST,
user:     process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
port: process.env.DB_PORT
})

module.exports = {
    GetAllIdeas: async() => {
        const [rows] = await connection.query(`SELECT * FROM ideas`)
        return rows
    },
    GetAllKnowledges : async function GetAllKnowledges() {
     const [rows] = await connection.query(`SELECT * FROM knowledges`)
     return rows
    },
    GetSearchedPlantDetails : async function GetSearchedPlantDetails(commonName,type,water,sunlight,soil,planting,harvesting) {
        const [rows] = await connection.query(`SELECT * FROM plants WHERE common_name LIKE ? OR type LIKE ? OR water LIKE ? OR sunlight LIKE ? OR soil LIKE ? OR planting LIKE ? OR harvesting LIKE ?`, [commonName, type, water, sunlight, soil, planting, harvesting])
        console.log(rows)
        return rows
    },
    AddNewgarden : async function CreateGarden(garden) {
        const [rows] = await connection.query(`INSERT INTO garden_manager (user_id, garden_name, garden_content) VALUES(?,?,?)`,[garden.user_id, garden.garden_name, garden.garden_content])
        return rows
    },
    GetMySavedPlants : async function GetMySavedPlants() {
        const [rows] = await connection.query(`SELECT * FROM saved_plants`)
        return rows
    },
    GetMyGardens : async function GetMyGardens() {
        const [rows] = await connection.query(`SELECT * FROM garden_manager`)
        return rows
    },
    GetGardenById : async function GetGardenById(id) {
        const [rows] = await connection.query(`SELECT * FROM garden_manager WHERE id = ?`, [id])
        return rows
    },
    GetAllWorksAndTools : async function GetAllWorksAndTools() {
        const [rows] = await connection.query(`SELECT * FROM worksandtools`)
        return rows
    },
    CreateUser : async function CreateUser(user) {
        const {id,username,password} = user
        const [rows] = await connection.query(`INSERT INTO users (id,username,password) VALUES(?,?,?)`,[id,username,password])
        return rows
    },
    GetGardens: async () => {
    const [rows] = await connection.query('SELECT * FROM garden_manager')
    return rows
    },
    GetAllPlants: async () => {
        const [rows] = await connection.query('SELECT * FROM plants')
        return rows
    },
    DeleteGarden: async (id) => {
        const [rows] = await connection.query('DELETE FROM garden_manager WHERE id = ?', [id])
        return rows
    },
    UpdateGarden: async (garden) => {
        const [rows] = await connection.query('UPDATE garden_manager SET garden_content = ? , garden_name = ?, user_id = ? WHERE id = ?', [garden.content, garden.name, garden.user_id, garden.id])
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