const GardenModel = require('../GardenModell/GardenPlannerMODELL')

//showing the ideas and knowledges on their pages

exports.GetAllIdeas = async (req,res) => {
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
    var commonNameSearch = req.body.commonName
    var botanicalNameSearch = req.body.botanicalName
    var typeSearch = req.body.type
    var waterSearch = req.body.water
    var sunlightSearch = req.body.sunlight
    var soilSearch = req.body.soil
    var plantingSearch = req.body.planting
    var harvestingSearch = req.body.harvesting
    const plantData = await GardenModel.GetSearchedPlantDetails()
    res.json(plantData)
}
exports.GetMySavedPlants = async (req,res) => {
    const savedPlantsData = await GardenModel.GetMySavedPlants()
    res.json(savedPlantsData)
}
exports.GetMyGardens = async (req,res) => {
    const myGardensData = await GardenModel.GetMySavedPlants()
    res.json(myGardensData)
}
exports.GetAllWorksAndTools = async (req,res) => {
    const worksAndToolsData = await GardenModel.GetAllWorksAndTools()
    res.json(worksAndToolsData)
}