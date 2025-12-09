document.addEventListener("DOMContentLoaded", async () => {
    const responseKnowledges = await fetch('/api/showKnowledgesData/all', {method : "GET" , headers : {"Content-Type" : "application/json"}})
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
        OneKnowledgeDescription.textContent = `${knowledge.description}`

        OneKnowledgeCard.appendChild(OneKnowledgeTitle)
        OneKnowledgeCard.appendChild(OneKnowledgeDescription)

        KnowledgesCardContainer.appendChild(OneKnowledgeCard)

        // KnowledgesCardContainer.innerHTML += 
        // `<div class="OneKnowledgeCard">
        //     <h2 class="OneKnowledgeTitle">${knowledge.title}</h2>
        //     <p class="OneKnowledgeDescription">${knowledge.description}</p>
        // </div>`
    });
})

document.getElementById("goup-btn").addEventListener("click", () => {
    window.scrollTo({top:0, behavior: 'smooth'})
})