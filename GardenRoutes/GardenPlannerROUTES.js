const express = require('express')
const GardenController = require("../GardenControll/GardenPlannerCONTROLL")
const router = express.Router()

router.get('/', GardenController.showMainPage)
router.get('/newGardens', GardenController.showNewGardensPage)
router.get('/myGardens', GardenController.showMyGardensPage)
router.get('/savedPlants', GardenController.showSavedPlantsPage)

router.get('/ideas/showIdeasData/all', GardenController.GetAllIdeas)
router.get('/knowledges/showKnowledgesData/all', GardenController.GetAllKnowledges)

module.exports = router