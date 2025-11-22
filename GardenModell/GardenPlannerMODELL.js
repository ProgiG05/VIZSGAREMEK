// create an API to access the database 

//fetch with the created API

//process the data fetched from the database


const ideas = [
    {
        title: "Flower garden",
        description: "A colorful display of seasonal blooms arranged in layered beds to provide continuous color from spring through autumn. Designed for aesthetic appeal and pollinator attraction.",
        plants: ["peony", "lavender", "dahlia"]
    },
    {
        title: "Vegetable garden",
        description: "A productive layout that maximizes yield in raised beds with companion planting and succession crops to feed a small household throughout the growing season.",
        plants: ["tomato", "lettuce", "carrot"]
    },
    {
        title: "Herb terrace",
        description: "Compact terraced planters near the kitchen for easy harvesting. Focuses on culinary and medicinal herbs that thrive in well-drained soil and regular pruning.",
        plants: ["rosemary", "basil", "thyme"]
    },
    {
        title: "Pollinator patch",
        description: "A mixed planting of nectar-rich flowers and early-blooming bulbs to support bees, butterflies, and other beneficial insects from early spring to late summer.",
        plants: ["echinacea", "borage", "salvia"]
    },
    {
        title: "Xeriscape corner",
        description: "Low-water, low-maintenance planting using drought-tolerant species and mulch to conserve moisture. Ideal for hot, sunny spots and water-wise gardening.",
        plants: ["sedum", "lavender", "gaura"]
    },
    {
        title: "Shade garden",
        description: "A tranquil understory design using plants that thrive in dappled light, layered with groundcovers and textured foliage for year-round interest.",
        plants: ["hosta", "fern", "heuchera"]
    },
    {
        title: "Succulent rockery",
        description: "An architectural arrangement of succulents and sculptural stones on a sloped bed for excellent drainage and a modern, low-care aesthetic.",
        plants: [" sempervivum", "sedum", "aeonium"]
    },
    {
        title: "Native meadow",
        description: "A small native-plant meadow patch seeded to attract local wildlife, reduce maintenance, and provide seasonal structure and seed heads for winter interest.",
        plants: ["black-eyed susan", "little bluestem", "milkweed"]
    },
    {
        title: "Culinary herb spiral",
        description: "A spiral-shaped raised bed that creates multiple microclimates for a variety of herbs, making efficient use of vertical space while being visually striking.",
        plants: ["parsley", "chives", "oregano"]
    },
    {
        title: "Fragrant border",
        description: "A scented edge along a walkway composed of plants chosen for fragrance and form, offering sensory appeal for evening and daytime enjoyment.",
        plants: ["jasmine", "gardenia", "rose"]
    }
]

const knowledges = [
    {
        title: "Space gardening",
        description: "Researchers grow plants in microgravity to learn how food production could work on spacecraft and other planets. Experiments on the ISS use LED spectra, closed-loop watering, and recycled air and water to study root behavior, pollination methods, and how to maximize yield in very small volumes."
    },
    {
        title: "Japanese Zen garden",
        description: "Zen (karesansui) gardens use gravel, rocks, and minimal plantings to evoke landscapes and encourage contemplation. Raked gravel represents water, carefully placed stones suggest islands or mountains, and moss or a few pines provide subtle, symbolic living elements."
    },
    {
        title: "English cottage garden",
        description: "Originating in rural England, cottage gardens mix ornamental flowers, herbs, and edibles in dense, informal beds. The style emphasizes biodiversity, season-long blooms, heirloom varieties, and a layered, abundant look that attracts pollinators."
    },
    {
        title: "Mediterranean dry garden",
        description: "Designed for hot, dry climates, these gardens prioritize drought-tolerant plants (lavender, rosemary, olive) and water-conserving techniques like mulching and gravel beds. They balance seasonal color with low irrigation and typically use deep-rooted shrubs and aromatic foliage."
    },
    {
        title: "Permaculture guilds",
        description: "Permaculture arranges plants into guilds where each species provides functions (nitrogen fixation, pest repellence, mulch, pollinator food). A fruit tree guild, for example, might include a nitrogen-fixing shrub, groundcover, and dynamic accumulators to create a resilient, self-supporting mini-ecosystem."
    },
    {
        title: "Rooftop and container gardening",
        description: "Urban gardeners use containers and rooftop beds to grow food and ornamentals where ground space is limited. Lightweight soils, good drainage, wind protection, and efficient irrigation are key; these installations can reduce heat, improve air quality, and supply local produce."
    },
    {
        title: "Vertical gardens and living walls",
        description: "Vertical gardening maximizes small footprints by growing up: modular panels, pocket systems, and trellises create green walls that insulate buildings, filter air, and add biodiversity. Successful systems balance plant choice, irrigation, and maintenance access."
    },
    {
        title: "Tropical understory gardening",
        description: "Tropical gardens layer canopy trees, mid-story shrubs, and lush groundcovers to mimic rainforest structure. Shade-loving plants, high humidity, and rich organic soil create dramatic foliage contrasts, epiphyte displays, and year-round growth in warm climates."
    },
    {
        title: "Desert xeriscaping",
        description: "Xeriscaping uses native, drought-adapted plants, efficient irrigation design, and thoughtful hardscaping to create attractive low-water landscapes. Techniques include grouping by water need, using permeable surfaces, and incorporating heat-reflective materials and rock elements."
    },
    {
        title: "Hydroponics and aquaponics",
        description: "Soil-less systems grow plants in nutrient solutions (hydroponics) or combine plants with fish (aquaponics), where fish waste supplies nutrients. These high-efficiency methods allow faster growth, year-round production, and intensive yields in controlled environments."
    }
]


module.exports = {
    // showGardens: (req, res) => {
    //     // render index with ideas so templates that reference `ideas` don't error
    //     res.render('index', { ideas })
    // },
    // showSavedPlants: (req, res) => {
    //     res.render('savedPlants')
    // },
    showIdeas: () => ideas,
    // showKnowledges: () => knowledges,
    // addProject: (req, res) => {

    //     res.redirect('/')
    // },
    // removeProject: (req, res) => {

    //     res.redirect('/')
    // },
    // addLifestyle: (req, res) => {

    //     res.redirect('/')
    // },
    // addPlant: (req, res) => {

    //     res.redirect('/')
    // },
    // removePlant: (req, res) => {

    //     res.redirect('/')
    // },
    // addWork: (req, res) => {

    //     res.redirect('/')
    // },
    // removeWork: (req, res) => {

    //     res.redirect('/')
    // }
}