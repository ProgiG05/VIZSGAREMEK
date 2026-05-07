const express = require("express");
const GardenController = require("../controllers/garden-controller");
const authenticateToken = require("../controllers/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Public
 *     description: Public data endpoints
 *   - name: Authentication
 *     description: Authentication endpoints
 *   - name: Authenticated
 *     description: Authenticated user endpoints
 */

/**
 * @swagger
 * /api/ideas:
 *   get:
 *     summary: Get all ideas
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Ideas fetched successfully
 *       500:
 *         description: Could not load ideas
 */
router.get("/ideas", GardenController.getAllIdeas);

/**
 * @swagger
 * /api/knowledge:
 *   get:
 *     summary: Get all knowledges
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Knowledges fetched successfully
 *       500:
 *         description: Could not load knowledges
 */
router.get("/knowledge", GardenController.getAllKnowledges);


/**
 * @swagger
 * /api/plants:
 *   get:
 *     summary: Get all plants
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Plants fetched successfully
 *       500:
 *         description: Could not load plants
 */
router.get("/plants", GardenController.getAllPlants);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: testuser
 *               password:
 *                 type: string
 *                 example: secret123
 *               rememberMe:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Missing or invalid input
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Login failed
 */
router.post("/login", GardenController.login);

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: newuser
 *               password:
 *                 type: string
 *                 example: strongpass123
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Invalid username or password input
 *       409:
 *         description: Username already taken
 *       500:
 *         description: Registration failed
 */
router.post("/register", GardenController.register);

/**
 * @swagger
 * /api/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Invalid token
 */
router.post("/refresh", GardenController.refresh);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       500:
 *         description: Logout failed
 */
router.post("/logout", GardenController.logout);

/**
 * @swagger
 * /api/gardens/newgarden:
 *   post:
 *     summary: Add a new garden
 *     tags: [Authenticated]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - garden_name
 *               - garden_content
 *             properties:
 *               garden_name:
 *                 type: string
 *                 example: My Balcony Garden
 *               garden_content:
 *                 type: string
 *                 example: Tomatoes, basil, and peppers
 *     responses:
 *       200:
 *         description: Garden created successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Please log in to access this feature
 *       500:
 *         description: Could not create garden
 */
router.post("/gardens/newgarden",authenticateToken,GardenController.addNewGarden,
);

/**
 * @swagger
 * /api/savedplants:
 *   get:
 *     summary: Get my saved plants
 *     tags: [Authenticated]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Saved plants fetched successfully
 *       401:
 *         description: Please log in to access this feature
 *       500:
 *         description: Could not load saved plants
 */
router.get("/savedplants",authenticateToken,GardenController.getMySavedPlants);

/**
 * @swagger
 * /api/saveplants:
 *   post:
 *     summary: Save a plant
 *     tags: [Authenticated]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plant_id
 *             properties:
 *               plant_id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Plant saved successfully
 *       400:
 *         description: Plant ID is required
 *       401:
 *         description: Please log in to access this feature
 *       500:
 *         description: Could not save plant
 */
router.post("/saveplants", authenticateToken, GardenController.savePlant);

/**
 * @swagger
 * /api/savedideas:
 *   get:
 *     summary: Get my saved ideas
 *     tags: [Authenticated]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Saved ideas fetched successfully
 *       401:
 *         description: Please log in to access this feature
 *       500:
 *         description: Could not load saved ideas
 */
router.get("/savedideas",authenticateToken,GardenController.getMySavedIdeas);

/**
 * @swagger
 * /api/saveideas:
 *   post:
 *     summary: Save an idea
 *     tags: [Authenticated]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Idea saved successfully
 *       400:
 *         description: Idea ID is required
 *       401:
 *         description: Please log in to access this feature
 *       500:
 *         description: Could not save idea
 */
router.post("/saveideas", authenticateToken, GardenController.saveIdea);

/**
 * @swagger
 * /api/gardens:
 *   get:
 *     summary: Get my gardens
 *     tags: [Authenticated]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Gardens fetched successfully
 *       401:
 *         description: Please log in to access this feature
 *       500:
 *         description: Could not load your gardens
 */
router.get("/gardens", authenticateToken, GardenController.getMyGardens);

/**
 * @swagger
 * /api/gardens/{id}:
 *   get:
 *     summary: Get garden by ID
 *     tags: [Authenticated]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 1
 *     responses:
 *       200:
 *         description: Garden fetched successfully
 *       401:
 *         description: Please log in to access this feature
 *       404:
 *         description: Garden not found or access denied
 *       500:
 *         description: Could not load garden details
 */
router.get("/gardens/:id", authenticateToken, GardenController.getGardenById);

/**
 * @swagger
 * /api/gardens/{id}:
 *   put:
 *     summary: Update garden
 *     tags: [Authenticated]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - content
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Garden Name
 *               content:
 *                 type: string
 *                 example: Updated garden content
 *     responses:
 *       200:
 *         description: Garden updated successfully
 *       400:
 *         description: Garden ID, name, and content are required
 *       401:
 *         description: Please log in to access this feature
 *       500:
 *         description: Could not update garden
 */
router.put("/gardens/:id", authenticateToken, GardenController.updateGarden);

/**
 * @swagger
 * /api/gardens/{id}:
 *   delete:
 *     summary: Delete garden
 *     tags: [Authenticated]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 1
 *     responses:
 *       200:
 *         description: Garden deleted successfully
 *       401:
 *         description: Please log in to access this feature
 *       500:
 *         description: Could not delete garden
 */
router.delete("/gardens/:id", authenticateToken, GardenController.deleteGarden);

/**
 * @swagger
 * /api/profile/username:
 *   put:
 *     summary: Update username
 *     tags: [Authenticated]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newUsername
 *             properties:
 *               newUsername:
 *                 type: string
 *                 example: mynewname
 *     responses:
 *       200:
 *         description: Username updated successfully
 *       400:
 *         description: Invalid input or same as current username
 *       401:
 *         description: Please log in to access this feature
 *       409:
 *         description: Username already taken
 *       500:
 *         description: Could not update username
 */
router.put("/profile/username", authenticateToken, GardenController.updateUsername);

/**
 * @swagger
 * /api/profile/password:
 *   put:
 *     summary: Update password
 *     tags: [Authenticated]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: myoldpassword
 *               newPassword:
 *                 type: string
 *                 example: mynewpassword123
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid input or same as current password
 *       401:
 *         description: Current password incorrect or not logged in
 *       500:
 *         description: Could not update password
 */
router.put("/profile/password", authenticateToken, GardenController.updatePassword);

module.exports = router;
