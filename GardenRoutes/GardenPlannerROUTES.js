const express = require('express')
const GardenController = require("../GardenControll/GardenPlannerCONTROLL")
const router = express.Router()

router.get('/ideas', GardenController.GetEveryIdea)

router.get('/knowledge', GardenController.GetAllKnowledges)

router.post('/gardens/newgarden', GardenController.AddNewgarden)

router.get('/plantfinder', GardenController.GetSearchedPlantDetails)

router.get('/savedplants', GardenController.GetMySavedPlants)

router.get('/worktools', GardenController.GetAllWorksAndTools)

router.get('/plants', GardenController.GetAllPlants)

router.get('/gardens', GardenController.GetMyGardens)

router.get('/gardens/:id', GardenController.GetGardenById)

router.delete('/gardens/:id', GardenController.DeleteGarden)

router.post('/gardens/:id', GardenController.UpdateGarden)
router.post('/login', GardenController.Login)
router.post('/register', GardenController.Register)

module.exports = router