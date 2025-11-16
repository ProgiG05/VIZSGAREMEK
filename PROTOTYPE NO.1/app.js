const express = require('express')
const app = new express()
const GardenRoutes = require("./GardenRoutes/GardenPlannerROUTES")

app.set("view engine","ejs")
app.set("views","./views")

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

// app.use('/',GardenRoutes)

// app.use('/addProject',GardenRoutes)
// app.use('/removeProject',GardenRoutes)

// app.use('/addLifestyle',GardenRoutes)

// app.use('/addPlant',GardenRoutes)
// app.use('/removePlant',GardenRoutes)
// app.use('/addWork',GardenRoutes)
// app.use('/removeWork',GardenRoutes)


app.listen(3000, () => {
    console.log('Server running http://localhost:3000')
})