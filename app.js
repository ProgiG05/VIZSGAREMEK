const express = require('express')
const app = new express()
const GardenRoutes = require("./GardenRoutes/GardenPlannerROUTES")
const bodyParser = require("body-parser")

app.use(bodyParser.json())

app.set("view engine","ejs")
app.set("views","./GardenViews")
app.use(express.static('GardenPublic'))
app.use(express.urlencoded({extended:true}))

app.use('/',GardenRoutes, (req,res) => {res.render("index")})

app.use('/showIdeasPage',(req,res) => {res.render("ideas")})
app.use('/showIdeasData/all', GardenRoutes)

app.use('/showKnowledgesPage',(req,res) => {res.render("knowledges")})
app.use('/showKnowledgesData/all',GardenRoutes)

app.use('/api/showPlantFinder',GardenRoutes)

app.use('/api/showMySavedPlantsPage',(req,res) => {res.render("savedPlants")})
app.use('/api/showMySavedPlants/all',GardenRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`)
})