document.addEventListener("DOMContentLoaded", async () => {
    const responseKnowledges = await fetch('/api/knowledge', {method : "GET" , headers : {"Content-Type" : "application/json"}})
    const ListOfKnowledges = await responseKnowledges.json()
    const KnowledgesCardContainer = document.getElementById("main-container-knowledges")
    ListOfKnowledges.forEach(knowledge => {
        const OneKnowledgeCard = document.createElement("div")
        OneKnowledgeCard.setAttribute("class","OneKnowledgeCard")
        const OneKnowledgeTitle = document.createElement("h2")
        OneKnowledgeTitle.setAttribute("class","OneKnowledgeTitle")
        const OneKnowledgeDescription = document.createElement("p")
        OneKnowledgeDescription.setAttribute("class","OneKnowledgeDescription")
        
        OneKnowledgeTitle.textContent = `${knowledge.title}`
        OneKnowledgeDescription.textContent = `\t${knowledge.description.replace(".",".\n\t")}`

        OneKnowledgeCard.appendChild(OneKnowledgeTitle)
        OneKnowledgeCard.appendChild(OneKnowledgeDescription)

        KnowledgesCardContainer.appendChild(OneKnowledgeCard)
    });
})

document.getElementById("goup-btn").addEventListener("click", () => {
    window.scrollTo({top:0, behavior: 'smooth'})
})