const express = require('express');
const GardenController = require('../GardenControll/GardenPlannerCONTROLL');
const authenticateToken = require('../GardenControll/authMiddleware');

const router = express.Router();


// Public data endpoints

router.get('/ideas', GardenController.GetEveryIdea);
router.get('/knowledge', GardenController.GetAllKnowledges);
router.get('/plantfinder', GardenController.GetSearchedPlantDetails);
router.get('/worktools', GardenController.GetAllWorksAndTools);
router.get('/plants', GardenController.GetAllPlants);


// Authentication endpoints

router.post('/login', GardenController.Login);
router.post('/register', GardenController.Register);
router.post('/refresh', GardenController.Refresh);
router.post('/logout', GardenController.Logout);


// Authenticated endpoints

router.post('/gardens/newgarden', authenticateToken, GardenController.AddNewgarden);
router.get('/savedplants', authenticateToken, GardenController.GetMySavedPlants);
router.post('/saveplants', authenticateToken, GardenController.SavePlant);
router.get('/gardens', authenticateToken, GardenController.GetMyGardens);
router.get('/gardens/:id', authenticateToken, GardenController.GetGardenById);
router.put('/gardens/:id', authenticateToken, GardenController.UpdateGarden);
router.delete('/gardens/:id', authenticateToken, GardenController.DeleteGarden);


module.exports = router;