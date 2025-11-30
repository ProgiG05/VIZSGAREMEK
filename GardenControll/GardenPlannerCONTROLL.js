const GardenModel = require('../GardenModell/GardenPlannerMODELL')

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