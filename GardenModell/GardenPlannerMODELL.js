const mysql = require("mysql2")
const connection = createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"ideasandknowledgestestingdb"
})

const queryOne = `SELECT * FROM ideas`
const queryTwo = `SELECT * FROM knowledge`

module.exports = {
    GetAllIdeas: async function GetAllIdeas() {
        const [rows] = await connection.query(queryOne)
        return rows
    },
    GetAllKnowledges : async function GetAllKnowledges() {
        const [rows] = await connection.query(queryTwo)
        return rows
    }
}