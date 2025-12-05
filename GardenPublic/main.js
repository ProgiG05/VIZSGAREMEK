document.addEventListener("DOMContentLoaded", async () => {
    const responseIdeas = await fetch('/api/ideas/showIdeasData', {
        method: "GET",
        headers : {"Content-Type" : "application/json"}
    })
    const responseKnowledges = await fetch('/api/knowledges/showKnowledgesData', {
        method: "GET",
        headers : {"Content-Type" : "application/json"}
    })

    const ListOfIdeas = responseIdeas.json()
    const ListOfKnowledges = responseKnowledges.json()

    const IdeasCardContainer = document.getElementById("main-container")
    const KnowledgesCardContainer = document.getElementById("main-container")

    ListOfIdeas.forEach(idea => {
        const OneIdeaCard = document.createElement("div")
        OneIdeaCard.setAttribute("OneIdeaCard")

        const OneIdeaTitle = document.createElement("h2")

        const OneIdeaSunlight = document.createElement("p")
        const OneIdeaWater = document.createElement("p")
        const OneIdeaMaintenance = document.createElement("p")

        
    });
    ListOfKnowledges.forEach(knowledge => {
        const OneKnowledgeCard = document.createElement("div")
        // OneKnowledgeCard.setAttribute("OneKnowledgeCard")
        const OneKnowledgeTitle = document.createElement("h2")
        // OneKnowledgeTitle.setAttribute("OneKnowledgeTitle")
        const OneKnowledgeDescription = document.createElement("p")
        // OneKnowledgeDescription.setAttribute("OneKnowledgeDescription")
        
        OneKnowledgeTitle.textContent = `${knowledge.title}`
        OneKnowledgeDescription.textContent = `${knowledge.description}`

        OneKnowledgeCard.appendChild(OneKnowledgeTitle)
        OneKnowledgeCard.appendChild(OneKnowledgeDescription)
    });
})