const express = require('express')
const GardenController = require("../GardenControll/GardenPlannerCONTROLL")
const router = express.Router()


router.get('/', GardenController.showMainPage)
router.get('/newGardens', GardenController.showNewGardensPage)
router.get('/myGardens', GardenController.showMyGardensPage)
router.get('/savedPlants', GardenController.showSavedPlantsPage)
router.get('/ideas', GardenController.showIdeasPage)
router.get('/knowledges', GardenController.showKnowledgesPage)

router.get('/ideas/showIdeasData',GardenController.GetAllIdeas)
router.get('/knowledges/showKnowledgesData',GardenController.GetAllKnowledges)


module.exports = router