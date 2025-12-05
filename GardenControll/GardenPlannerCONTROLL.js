const GardenModel = require('../GardenModell/GardenPlannerMODELL')

//showing all the pages
exports.showMainPage = (req,res) => {
    res.render("index", {})
}
exports.showNewGardensPage = (req,res) => {
    res.render("newGarden", {})
}
exports.showMyGardensPage = (req,res) => {
    res.render("myGardens", {})
}
exports.showSavedPlantsPage = (req,res) => {
    res.render("savedPlants", {})
}
exports.showIdeasPage = (req,res) => {
    res.render("ideas", {})
}
exports.showKnowledgesPage = (req,res) => {
    res.render("knowledge", {})
}

//showing the ideas and knowledges on their pages
exports.GetAllIdeas = async (req,res) => {
    const IdeasData = GardenModel.GetAllIdeas()
    res.json(IdeasData)
}
exports.GetAllKnowledges = async (req,res) => {
    const KnowledgesData = GardenModel.GetAllKnowledges()
    res.json(KnowledgesData)
}