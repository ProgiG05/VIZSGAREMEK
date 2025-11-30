const express = require('express')
const GardenController = require("../GardenControll/GardenPlannerCONTROLL")
const router = express.Router()


router.get('/', GardenController.showMainPage)
router.get('/newGardens', GardenController.showNewGardensPage)
router.get('/myGardens', GardenController.showMyGardensPage)
router.get('/savedPlants', GardenController.showSavedPlantsPage)
router.get('/ideas', GardenController.showIdeasPage)
router.get('/knowledges', GardenController.showKnowledgesPage)


// router.get('/showSavedPlantsData', GardenController.showSavedPlantsData)
// router.get('/showIdeasData',GardenController.showIdeasData)
// router.get('/showKnowledgesData',GardenController.showKnowledgesData)


module.exports = router