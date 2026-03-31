const GardenModel = require('../GardenModell/GardenPlannerMODELL')

//showing the ideas and knowledges on their pages

exports.GetEveryIdea = async (req,res) => {
    const IdeasData = await GardenModel.GetAllIdeas()
    res.json(IdeasData)
}
exports.GetAllKnowledges = async (req,res) => {
    const KnowledgesData = await GardenModel.GetAllKnowledges()
    res.json(KnowledgesData)
}
exports.AddNewgarden = async (req,res) => {
    const garden = req.body
    const newGarden = await GardenModel.AddNewgarden(garden)
    res.json(newGarden)
}
exports.GetSearchedPlantDetails = async (req,res) => {
    const {commonName, type, water, sunlight, soil, planting, harvesting} = req.query
    const plantData = await GardenModel.GetSearchedPlantDetails(commonName, type, water, sunlight, soil, planting, harvesting)
    res.json(plantData)
}
exports.GetMySavedPlants = async (req,res) => {
    const savedPlantsData = await GardenModel.GetMySavedPlants()
    res.json(savedPlantsData)
}
exports.GetMyGardens = async (req,res) => {
    const myGardensData = await GardenModel.GetGardens()
    res.json(myGardensData)
}
exports.GetGardenById = async (req,res) => {
    const {id} = req.params
    const gardenData = await GardenModel.GetGardenById(id)
    res.json(gardenData)
}
exports.GetAllWorksAndTools = async (req,res) => {
    const worksAndToolsData = await GardenModel.GetAllWorksAndTools()
    res.json(worksAndToolsData)
}
exports.GetAllPlants = async (req,res) => {
    const plantsData = await GardenModel.GetAllPlants()
    res.json(plantsData)
}
exports.DeleteGarden = async (req,res) => {
    const {id} = req.params
    const deletedGarden = await GardenModel.DeleteGarden(id)
    res.json(deletedGarden)
}
exports.UpdateGarden = async (req,res) => {
    const garden = req.body
    const updatedGarden = await GardenModel.UpdateGarden(garden)
    res.json(updatedGarden)
}
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
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required' })
        }
        const rows = await GardenModel.GetUserByUsername(username)
        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' })
        }
        const user = rows[0]
        const passwordOk = await argon2.verify(user.password, password)
        if (!passwordOk) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' })
        }
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: { id: user.id, username: user.username }
        })
    } catch (err) {
        console.error('Login error:', err)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

