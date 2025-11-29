// create an API to access the database 

//fetch with the created API

//process the data fetched from the database

const {createPool} = require("mysql")
const pool = createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"gardenplannerdb",
    connectionLimit:10
})

const queryOne = `select * from ideas`
const queryTwo = `select * from knoledges`

pool.query(queryOne, (err,result,fiels) => {
    if (err) {
        return console.log(err)
    }
    else{
        return console.log(result)
    }
})

module.exports = pool