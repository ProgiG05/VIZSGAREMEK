const express = require('express')
const GardenController = require("../GardenControll/GardenPlannerCONTROLL")
const authenticateToken = require("../GardenControll/authMiddleware")
const router = express.Router()

router.get('/ideas', GardenController.GetEveryIdea)

router.get('/knowledge', GardenController.GetAllKnowledges)

router.post('/gardens/newgarden', authenticateToken, GardenController.AddNewgarden)

router.get('/plantfinder', GardenController.GetSearchedPlantDetails)

router.get('/savedplants', authenticateToken, GardenController.GetMySavedPlants)

router.post('/saveplants', authenticateToken, GardenController.SavePlant)

router.get('/worktools', GardenController.GetAllWorksAndTools)

router.get('/plants', GardenController.GetAllPlants)

router.get('/gardens', authenticateToken, GardenController.GetMyGardens)

router.get('/gardens/:id', authenticateToken, GardenController.GetGardenById)

router.delete('/gardens/:id', authenticateToken, GardenController.DeleteGarden)

router.post('/gardens/:id', authenticateToken, GardenController.UpdateGarden)
router.post('/login', GardenController.Login)
router.post('/register', GardenController.Register)

module.exports = router