const GardenModel = require('../GardenModell/GardenPlannerMODELL')

exports.showMyGardensPage = (req,res) => {
    res.render("myGardens", {})
}

//showing all the pages

exports.showIdeasPage = (req,res) => {
    res.render("ideas", {})
}
exports.showKnowledgesPage = (req,res) => {
    res.render("knowledges", {})
}
exports.showMySavedPlantsPage = (req,res) => {
    res.render("savedPlants", {})
}

//showing the ideas and knowledges on their pages
exports.GetAllIdeas = async (req,res) => {
    const IdeasData = await GardenModel.GetAllIdeas()
    res.json(IdeasData)
}
exports.GetAllKnowledges = async (req,res) => {
    const KnowledgesData = await GardenModel.GetAllKnowledges()
    res.json(KnowledgesData)
}
exports.GetMySavedPlants = async (req,res) => {
    const savedPlantsData = await GardenModel.GetMySavedPlants()
    res.json(savedPlantsData)
}
exports.showPlantFinder = async (req,res) => {
    const plantData = await GardenModel.GetSearchedPlantDetails()
    res.json(plantData)
}