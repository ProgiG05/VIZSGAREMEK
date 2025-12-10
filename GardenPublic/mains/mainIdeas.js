document.addEventListener("DOMContentLoaded", async () => {
    const responseIdeas = await fetch('/api/showAllIdeas/all', {
        method: "GET",
        headers : {"Content-Type" : "application/json"}
    })
    const ListOfIdeas = await responseIdeas.json()
    const IdeasCardContainer = document.getElementById("main-container-ideas")
    ListOfIdeas.forEach(idea => {
        // if (idea.id % 2 == 0) {
        //     put the idea-card into the right container if the idea id is even
        // }
        // else{
        //     put the idea-card into the left container if the idea id is odd
        // }

        const OneIdeaCard = document.createElement("div")
        OneIdeaCard.setAttribute("class","OneIdeaCard")

        const OneIdeaTitle = document.createElement("h2")
        OneIdeaTitle.textContent = `${idea.title}`
        OneIdeaTitle.setAttribute("class","OneIdeaTitle")
        OneIdeaCard.appendChild(OneIdeaTitle)

        const OneIdeaPlants = document.createElement("p")
        OneIdeaPlants.textContent = `${idea.plants}`
        OneIdeaPlants.setAttribute("class","OneIdeaPlants")
        OneIdeaCard.appendChild(OneIdeaPlants)

        const detailsList = document.createElement("ul")
        detailsList.setAttribute("class","detailsList")

        const OneIdeaSunlight = document.createElement("li")
        OneIdeaSunlight.textContent = `${idea.sunlight}`
        OneIdeaSunlight.setAttribute("class","detailsListItem")
        detailsList.appendChild(OneIdeaSunlight)

        const OneIdeaWater = document.createElement("li")
        OneIdeaWater.textContent = `${idea.water}`
        OneIdeaWater.setAttribute("class","detailsListItem")
        detailsList.appendChild(OneIdeaWater)

        const OneIdeaMaintenance = document.createElement("li")
        OneIdeaMaintenance.textContent = `${idea.maintenance}`
        OneIdeaMaintenance.setAttribute("class","detailsListItem")
        detailsList.appendChild(OneIdeaMaintenance)
        
        OneIdeaCard.appendChild(detailsList)

        IdeasCardContainer.appendChild(OneIdeaCard)
    });
})