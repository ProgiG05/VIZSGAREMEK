const mysql = require("mysql2/promise")
const connection = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"ideasandknowledgestestingdb"
})

module.exports = {
    GetAllIdeas: async function GetAllIdeas() {
        const [rows] = await connection.query(`SELECT * FROM ideas`)
        console.log(rows)
        return rows
    },
    GetAllKnowledges : async function GetAllKnowledges() {
        const [rows] = await connection.query(`SELECT * FROM knowledge`)
        console.log(rows)
        return rows
    }
}