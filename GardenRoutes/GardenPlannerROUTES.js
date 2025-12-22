const express = require('express')
const GardenController = require("../GardenControll/GardenPlannerCONTROLL")
const router = express.Router()

router.get('/', GardenController.showMainPage)
router.get('/showMyGardens', GardenController.showMyGardensPage)

router.get('/api/showMySavedPlants/all',GardenController.GetMySavedPlants)
router.get('/api/showPlantFinder', GardenController.showPlantFinder)
router.get('/showIdeasData/all', GardenController.GetAllIdeas)
router.get('/showKnowledgesData/all', GardenController.GetAllKnowledges)

module.exports = router