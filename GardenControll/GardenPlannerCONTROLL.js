const GardenModel = require('../GardenModell/GardenPlannerMODELL')

exports.showIdeas = (req,res) => {
    const ide = GardenModel.showIdeas()
    res.render("index", {ideas: ide})
}
// exports.showKnowledge = (req,res) => {
//     const know = GardenModel.showKnowledges()
//     res.render('index', {knowledges : know})
// }