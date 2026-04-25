const express = require("express");
const GardenController = require("../controllers/garden-controller");
const authenticateToken = require("../controllers/authMiddleware");

const router = express.Router();

// Public data endpoints

router.get("/ideas", GardenController.getAllIdeas);
router.get("/knowledge", GardenController.getAllKnowledges);
router.get("/plantfinder", GardenController.getSearchedPlantDetails);
router.get("/worktools", GardenController.getAllWorksAndTools);
router.get("/plants", GardenController.getAllPlants);

// Authentication endpoints

router.post("/login", GardenController.login);
router.post("/register", GardenController.register);
router.post("/refresh", GardenController.refresh);
router.post("/logout", GardenController.logout);

// Authenticated endpoints

router.post(
  "/gardens/newgarden",
  authenticateToken,
  GardenController.addNewGarden,
);
router.get(
  "/savedplants",
  authenticateToken,
  GardenController.getMySavedPlants,
);
router.post("/saveplants", authenticateToken, GardenController.savePlant);
router.get("/gardens", authenticateToken, GardenController.getMyGardens);
router.get("/gardens/:id", authenticateToken, GardenController.getGardenById);
router.put("/gardens/:id", authenticateToken, GardenController.updateGarden);
router.delete("/gardens/:id", authenticateToken, GardenController.deleteGarden);

module.exports = router;
