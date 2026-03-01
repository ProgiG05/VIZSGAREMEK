const express = require('express')
const app = new express()
const GardenRoutes = require("./GardenRoutes/GardenPlannerROUTES")
const bodyParser = require("body-parser")

app.use(bodyParser.json())

app.set("view engine","ejs")
app.set("views","./GardenViews")
app.use(express.static('GardenPublic'))
app.use(express.urlencoded({extended:true}))
app.use('/api', GardenRoutes)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/GardenPublic/sites/index.html')
})

app.get('/showIdeasPage', (req, res) => res.sendFile(__dirname + '/GardenPublic/sites/ideas.html'))
app.get('/ideas.html', (req, res) => res.sendFile(__dirname + '/GardenPublic/sites/ideas.html'))

app.get('/showKnowledgesPage', (req, res) => res.sendFile(__dirname + '/GardenPublic/sites/knowledges.html'))
app.get('/knowledges.html', (req, res) => res.sendFile(__dirname + '/GardenPublic/sites/knowledges.html'))

app.get('/showGardenMakerPage', (req, res) => res.sendFile(__dirname + '/GardenPublic/sites/newGarden.html'))
app.get('/gardenmaker', (req, res) => res.sendFile(__dirname + '/GardenPublic/sites/newGarden.html'))

app.get('/showMySavedPlantsPage', (req, res) => res.sendFile(__dirname + '/GardenPublic/sites/savedPlants.html'))
app.get('/savedplants', (req, res) => res.sendFile(__dirname + '/GardenPublic/sites/savedPlants.html'))

app.get('/showMyGardensPage', (req, res) => res.sendFile(__dirname + '/GardenPublic/sites/myGardens.html'))
app.get('/mygardens', (req, res) => res.sendFile(__dirname + '/GardenPublic/sites/myGardens.html'))

app.get('/showGardeningWorksAndToolsPage', (req, res) => res.sendFile(__dirname + '/GardenPublic/sites/WorksAndTools.html'))
app.get('/worksandtools', (req, res) => res.sendFile(__dirname + '/GardenPublic/sites/WorksAndTools.html'))

app.get('/plants.html', (req, res) => res.sendFile(__dirname + '/GardenPublic/sites/plants.html'))
app.get('/plantfinder', (req, res) => res.sendFile(__dirname + '/GardenPublic/sites/searchedPlants.html'))

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`)
})