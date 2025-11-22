const express = require('express')
const GardenController = require("../GardenControll/GardenPlannerCONTROLL")
const router = express.Router()

// router.get('/',GardenController.showGardens)
// router.get('/showSavedPlants', GardenController.showSavedPlants)
router.get('/',GardenController.showIdeas)
// router.get('/',GardenController.showKnowledge)
// router.post('/addProject',GardenController.addProject)
// router.post('/removeProject',GardenController.removeProject)
// router.post('/addLifestyle',GardenController.addLifestyle)
// router.post('/addPlant',GardenController.addPlant)
// router.post('/removePlant',GardenController.removePlant)
// router.post('/addWork',GardenController.addWork)
// router.post('/removeWork',GardenController.removeWork)

module.exports = router