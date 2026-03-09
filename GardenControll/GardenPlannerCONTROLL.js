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
exports.AddNewGarden = async (req,res) => {
    
}
exports.GetSearchedPlantDetails = async (req,res) => {
    const {commonName, botanicalName, type, water, sunlight, soil, planting, harvesting} = req.query
    const plantData = await GardenModel.GetSearchedPlantDetails(commonName, botanicalName, type, water, sunlight, soil, planting, harvesting)
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

