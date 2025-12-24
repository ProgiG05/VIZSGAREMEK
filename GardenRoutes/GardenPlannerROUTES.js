const express = require('express')
const GardenController = require("../GardenControll/GardenPlannerCONTROLL")
const router = express.Router()

router.get('/api/showIdeasData/all', GardenController.GetAllIdeas)

router.get('/api/showKnowledgesData/all', GardenController.GetAllKnowledges)

router.post('/api/addNewGarden',GardenController.AddNewGarden)

router.get('/api/showPlantFinder',GardenController.GetSearchedPlantDetails)

router.get('/api/showMySavedPlants/all',GardenController.GetMySavedPlants)

router.get('/api/showGardeningWorksAndTools/all',GardenController.GetMyGardens)

router.get('/api/showGardeningWorksAndTools/all',GardenController.GetAllWorksAndTools)

module.exports = router