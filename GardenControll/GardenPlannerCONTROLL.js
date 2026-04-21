const GardenModel = require('../GardenModell/GardenPlannerMODELL')
const jwt = require('jsonwebtoken');
require('dotenv').config();

//showing the ideas and knowledges on their pages

exports.GetEveryIdea = async (req,res) => {
    const IdeasData = await GardenModel.GetAllIdeas()
    res.json(IdeasData)
}
exports.GetAllKnowledges = async (req,res) => {
    const KnowledgesData = await GardenModel.GetAllKnowledges()
    res.json(KnowledgesData)
}
exports.AddNewgarden = async (req, res) => {
    const garden = req.body;
    garden.user_id = req.user.id; // Ensure the garden is owned by the logged-in user
    const newGarden = await GardenModel.AddNewgarden(garden);
    res.json(newGarden);
};
exports.GetSearchedPlantDetails = async (req,res) => {
    const {commonName, botanicalName, origin, type, water, sunlight, soil, indoor, seeds, planting, pruning, harvesting} = req.query
    const plantData = await GardenModel.GetSearchedPlantDetails(commonName, botanicalName, origin, type, water, sunlight, soil, indoor, seeds, planting, pruning, harvesting)
    res.json(plantData)
}
exports.GetMySavedPlants = async (req,res) => {
    const savedPlantsData = await GardenModel.GetMySavedPlants()
    res.json(savedPlantsData)
}
exports.SavePlant = async (req,res) => {
    const {user_id, plant_id} = req.body
    const savedPlant = await GardenModel.SavePlant(user_id, plant_id)
    res.json(savedPlant)
}
exports.GetMyGardens = async (req, res) => {
    const userId = req.user.id;
    const myGardensData = await GardenModel.GetGardensByUserId(userId);
    res.json(myGardensData);
};

exports.GetGardenById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const gardenData = await GardenModel.GetGardenById(id, userId);
    
    if (!gardenData || gardenData.length === 0) {
        return res.status(404).json({ message: "Garden not found or access denied." });
    }
    
    res.json(gardenData[0]); // Return the first (and only) result
};
exports.GetAllWorksAndTools = async (req,res) => {
    const worksAndToolsData = await GardenModel.GetAllWorksAndTools()
    res.json(worksAndToolsData)
}
exports.GetAllPlants = async (req,res) => {
    const plantsData = await GardenModel.GetAllPlants()
    res.json(plantsData)
}
exports.DeleteGarden = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const deletedGarden = await GardenModel.DeleteGarden(id, userId);
    res.json(deletedGarden);
};

exports.UpdateGarden = async (req, res) => {
    const garden = req.body;
    const userId = req.user.id;
    const updatedGarden = await GardenModel.UpdateGarden(garden, userId);
    res.json(updatedGarden);
};
const argon2 = require('argon2')

exports.Register = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required' })
        }
        const passwordHash = await argon2.hash(password)
        await GardenModel.CreateUser(username, passwordHash)
        return res.status(201).json({ success: true, message: 'User registered successfully' })
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: 'Username already taken' })
        }
        console.error('Register error:', err)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

exports.Login = async (req, res) => {
    try {
        console.log("Login attempt body:", req.body);
        const { username, password } = req.body;
        if (!username || !password) {
            console.log("Missing username or password");
            return res.status(400).json({ success: false, message: 'Username and password are required' });
        }
        const rows = await GardenModel.GetUserByUsername(username);
        if (rows.length === 0) {
            console.log("User not found:", username);
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
        const user = rows[0];
        const passwordOk = await argon2.verify(user.password, password);
        if (!passwordOk) {
            console.log("Password mismatch for:", username);
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        // Create JWT Token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log("Login successful for:", username);
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token,
            user: { id: user.id, username: user.username }
        });
    } catch (err) {
        console.error('Login error details:', err);
        return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

