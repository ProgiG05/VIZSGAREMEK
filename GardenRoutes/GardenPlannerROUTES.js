const express = require('express')
const GardenController = require("../GardenControll/GardenPlannerCONTROLL")
const router = express.Router()

//router.get('/api/showIdeasData/all', GardenController.GetEveryIdea)
router.get('/ideas', GardenController.GetEveryIdea)

//router.get('/api/showKnowledgesData/all', GardenController.GetAllKnowledges)
router.get('/knowledge', GardenController.GetAllKnowledges)

//router.post('/api/addNewGarden',GardenController.AddNewGarden)
router.post('/garders', GardenController.AddNewGarden)

//router.get('/api/showPlantFinder',GardenController.GetSearchedPlantDetails)
router.get('/plantfinder', GardenController.GetSearchedPlantDetails)

//router.get('/api/showMySavedPlants/all',GardenController.GetMySavedPlants)
router.get('/savedplants', GardenController.GetMySavedPlants)

//router.get('/api/showGardeningWorksAndTools/all',GardenController.GetMyGardens)
router.get('/worktools', GardenController.GetAllWorksAndTools)


router.get('/getplants', GardenController.GetAllPlants)

router.get('/gardens', GardenController.GetMyGardens)

router.delete('/gardens/:id', GardenController.DeleteGarden)

module.exports = router