document.addEventListener("DOMContentLoaded", async () => {
    const responseIdeas = await fetch('/api/showAllIdeas/all', {
        method: "GET",
        headers : {"Content-Type" : "application/json"}
    })
    const ListOfIdeas = await responseIdeas.json()
    const IdeasCardContainer = document.getElementById("main-container-ideas")
    ListOfIdeas.forEach(idea => {
        const OneIdeaCard = document.createElement("div")
        OneIdeaCard.setAttribute("class","OneIdeaCard")

        const OneIdeaTitle = document.createElement("h2")
        OneIdeaTitle.textContent = `${idea.title}`
        OneIdeaTitle.setAttribute("class","OneIdeaTitle")

        const OneIdeaPlants = document.createElement("p")
        OneIdeaPlants.textContent = `${idea.plants}`
        OneIdeaPlants.setAttribute("class","OneIdeaPlants")


        const OneIdeaSunlight = document.createElement("li")
        OneIdeaSunlight.textContent = `${idea.sunlight}`
        OneIdeaSunlight.setAttribute("class","detailsListItem")

        const OneIdeaWater = document.createElement("li")
        OneIdeaWater.textContent = `${idea.water}`
        OneIdeaWater.setAttribute("class","detailsListItem")

        const OneIdeaMaintenance = document.createElement("li")
        OneIdeaMaintenance.textContent = `${idea.maintenance}`
        OneIdeaMaintenance.setAttribute("class","detailsListItem")

        const detailsList = document.createElement("ul")
        detailsList.setAttribute("class","detailsList")
        
        detailsList.appendChild(OneIdeaSunlight)
        detailsList.appendChild(OneIdeaWater)
        detailsList.appendChild(OneIdeaMaintenance)

        //adding the title(h2),plants(p), details list(ul) containing the sunlight(li),water(li),maintenance(li) 
        OneIdeaCard.appendChild(OneIdeaTitle)
        OneIdeaCard.appendChild(OneIdeaPlantsList)
        OneIdeaCard.appendChild(detailsList)
        IdeasCardContainer.appendChild(OneIdeaCard)
    });
})