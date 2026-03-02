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
    GetSearchedPlantDetails : async function GetSearchedPlantDetails(commonName,botanicalName,type,water,sunlight,soil,planting,harvesting) {
        const [rows] = await connection.query(`SELECT * FROM plants WHERE commonName LIKE ? OR botanicalName LIKE ? OR type LIKE ? OR water LIKE ? OR sunlight LIKE ? OR soil LIKE ? OR planting LIKE ? OR harvesting LIKE ?`, [commonName, botanicalName, type, water, sunlight, soil, planting, harvesting])
        console.log(rows[0])
        return rows[0]
    },
    AddNewgarden : async function CreateGarden(id,userID,plantID,size) {
        const [rows] = await connection.query(`INSERT INTO gardens VALUES(?,?,?,?)`,[id,userID,plantID,size])
        return rows
    },
    GetMySavedPlants : async function GetMySavedPlants() {
        const [rows] = await connection.query(`SELECT * FROM savedPlants`)
        return rows
    },
    GetMyGardens : async function GetMyGardens() {
        const [rows] = await connection.query(`SELECT * FROM gardens`)
        return rows
    },
    GetAllWorksAndTools : async function GetAllWorksAndTools() {
        const [rows] = await connection.query(`SELECT * FROM worksAndTools`)
        return rows
    },
    CreateUser : async function CreateUser(user) {
        const {id,username,password} = user
        const [rows] = await connection.query(`INSERT INTO users VALUES(?,?,?)`,[id,username,password])
        return rows
    },
    GetGardens: async () => {
    const [rows] = await connection.query('SELECT * FROM gardenmanager')
    return rows
    },
    GetAllPlants: async () => {
        const [rows] = await connection.query('SELECT * FROM plants')
        return rows
    }
}