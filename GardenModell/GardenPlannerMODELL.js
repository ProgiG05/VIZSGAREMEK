const mysql = require("mysql2/promise")
// const dotenv = require("dotenv")
const connection = mysql.createPool({
    // host: process.env.MSQL_HOST,
    // user: process.env.MSQL_USER,
    // password: process.env.MSQL_PASSWORD,
    // database: process.env.MSQL_DATABASE

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sproutifieddb'
})

module.exports = {
    GetAllIdeas: async function GetAllIdeas() {
        const [rows] = await connection.query(`SELECT * FROM ideas`)
        return rows
    },
    GetAllKnowledges : async function GetAllKnowledges() {
        const [rows] = await connection.query(`SELECT * FROM knowledges`)
        return rows
    },
    GetSearchedPlantDetails : async function GetSearchedPlantDetails(commonName,botanicalName,type,water,sunlight,soil,planting,harvesting) {
        const [rows] = await connection.query(`SELECT * FROM plants WHERE commonName = ? OR botanicalName = ? OR type = ? OR water = ? OR sunlight = ? OR soil = ? OR planting = ? OR harvesting = ?`, [commonName, botanicalName, type, water, sunlight, soil, planting, harvesting])
        return rows[0]
    },
    GetMySavedPlants : async function GetMySavedPlants() {
        const [rows] = await connection.query(`SELECT * FROM savedPlants`)
        return rows
    }
    // GetGarden : async function GetGarden(id) {
    //     const [rows] = await connection.query(`SELECT * FROM gardens WHERE id = ?`,[id])
    //     return rows[0]
    // },
    // CreateGarden : async function CreateGarden(id,userID,plantID,size) {
    //     const [rows] = await connection.query(`INSERT INTO gardens VALUES(?,?,?,?)`,[id,userID,plantID,size])
    //     return rows
    // },
    // CreateUser : async function CreateUser(id,username,password) {
    //     const [rows] = await connection.query(`INSERT INTO users VALUES(?,?,?)`,[id,username,password])
    //     return rows
    // }
}