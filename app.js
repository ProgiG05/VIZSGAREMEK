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

app.use('/ideas/api',GardenRoutes)
app.use('/ideas/showIdeasData/all', (req,res) => {res.render("ideas")})
app.use('/knowledges/api',GardenRoutes)
app.use('/knowledges/showKnowledgesData/all', (req,res) => {res.render("knowledges")})

app.listen(3000, () => {
    console.log('Server running http://localhost:3000')
})