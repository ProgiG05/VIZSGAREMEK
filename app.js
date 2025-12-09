const express = require('express')
const app = new express()
const GardenRoutes = require("./GardenRoutes/GardenPlannerROUTES")
const bodyParser = require("body-parser")

app.use(bodyParser.json())

app.set("view engine","ejs")
app.set("views","./GardenViews")
app.use(express.static('GardenPublic'))
app.use(express.urlencoded({extended:true}))

app.use('/',GardenRoutes)

app.use('/showIdeasPage',(req,res) => {res.render("ideas")})
app.use('/api',GardenRoutes)
app.use('/showIdeasData/all', GardenRoutes)

app.use("/showKnowledgesPage",(req,res) => {res.render("knowledges")})
app.use('/api',GardenRoutes)
app.use('/showKnowledgesData/all',GardenRoutes)

app.listen(3000, () => {
    console.log('Server running http://localhost:3000')
})