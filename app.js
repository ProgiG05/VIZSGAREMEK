const express = require('express')
const app = new express()
const GardenRoutes = require("./GardenRoutes/GardenPlannerROUTES")
const bodyParser = require("body-parser")

app.use(bodyParser.json())

app.set("view engine","ejs")
app.set("views","./GardenViews")
app.use(express.static('GardenPublic'))
app.use(express.urlencoded({extended:true}))

// Mount API routes first
app.use('/', GardenRoutes)

// Explicit page routes
app.get('/', (req, res) => { res.render('index') })
app.get('/showIdeasPage', (req, res) => { res.render('ideas') })
app.get('/showKnowledgesPage', (req, res) => { res.render('knowledges') })

// (API routes are defined inside the router at /api/...)

app.get('/showGardenMakerPage', (req,res) => {res.render("newGarden")})
app.use('/api/addNewGarden',GardenRoutes)

app.use('/api/showPlantFinder',GardenRoutes)

app.get('/showMySavedPlantsPage',(req,res) => {res.render("savedPlants")})
app.use('/api/showMySavedPlants/all',GardenRoutes)

app.get('/showMyGardensPage',(req,res) => {res.render("myGardens")})
app.use('/api/showMyGardensPage/all',GardenRoutes)

app.get('/showGardeningWorksAndToolsPage',(req,res) => {res.render("WorksAndTools")})
app.use('/api/showGardeningWorksAndTools/all',GardenRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`)
})