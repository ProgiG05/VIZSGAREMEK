const express = require('express')
const app = new express()
const GardenRoutes = require("./GardenRoutes/GardenPlannerROUTES")
const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(express.static('GardenPublic'))
app.use(express.static('GardenPublic/sites', { extensions: ['html'] }))
app.use(express.urlencoded({ extended: true }))
app.use('/api', GardenRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`)
})