const mysql = require("mysql2/promise")
const connection = mysql.createPool({
   host: process.env.db.host,
   user: process.env.db.user,
   password: process.env.db.password,
   database: process.env.db.database
})

module.exports = {
    //GetAllIdeas: async function GetAllIdeas() {
    //    const [rows] = await connection.query(`SELECT * FROM ideas`)
    //    return rows
    //},
    //GetAllKnowledges : async function GetAllKnowledges() {
    //  const [rows] = await connection.query(`SELECT * FROM knowledges`)
    //  return rows
    //},
    // GetSearchedPlantDetails : async function GetSearchedPlantDetails(commonName,botanicalName,type,water,sunlight,soil,planting,harvesting) {
    //     const [rows] = await connection.query(`SELECT * FROM plants WHERE commonName = ? OR botanicalName = ? OR type = ? OR water = ? OR sunlight = ? OR soil = ? OR planting = ? OR harvesting = ?`, [commonName, botanicalName, type, water, sunlight, soil, planting, harvesting])
    //     console.log(rows[0])
    //     return rows[0]
    // },
    // AddNewgarden : async function CreateGarden(id,userID,plantID,size) {
    //     const [rows] = await connection.query(`INSERT INTO gardens VALUES(?,?,?,?)`,[id,userID,plantID,size])
    //     return rows
    // },
    // GetMySavedPlants : async function GetMySavedPlants() {
    //     const [rows] = await connection.query(`SELECT * FROM savedPlants`)
    //     return rows
    // },
    // GetMyGardens : async function GetMyGardens() {
    //     const [rows] = await connection.query(`SELECT * FROM gardens`)
    //     return rows
    // },
    // GetAllWorksAndTools : async function GetAllWorksAndTools() {
    //     const [rows] = await connection.query(`SELECT * FROM worksAndTools`)
    //     return rows
    // },
    // CreateUser : async function CreateUser(user) {
    //     const {id,username,password} = user
    //     const [rows] = await connection.query(`INSERT INTO users VALUES(?,?,?)`,[id,username,password])
    //     return rows
    // }
}