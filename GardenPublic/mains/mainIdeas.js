document.addEventListener("DOMContentLoaded", async () => {
    const responseIdeas = await fetch('/api/showIdeasData/all', { method: "GET", headers : {"Content-Type" : "application/json"}})
    const ListOfIdeas = await responseIdeas.json()
    const IdeasCardContainer = document.getElementById("main-container-ideas")
    ListOfIdeas.forEach(idea => {

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
document.getElementById("goup-btn").addEventListener("click", () =>{
    window.scrollTo({top:0, behavior:"smooth"})
})
document.querySelectorAll(".detailsListItem").forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active")
    })
})
document.getElementById('sunlightFilter').addEventListener('change', function() {
    const selectedValue = this.value;
    const cards = document.querySelectorAll('.OneIdeaCard');
                
    cards.forEach(card => {
    const sunlight = card.querySelector('.detailsListItem').textContent.toLowerCase();
                    
    if (selectedValue === 'cover') {
        card.parentElement.style.display = 'block';
    } else if (sunlight.includes(selectedValue)) {
        card.parentElement.style.display = 'block';
    } else {
        card.parentElement.style.display = 'none';
    }
    });
});

// Apply same logic for water and maintenance filters
document.getElementById('waterFilter').addEventListener('change', function() {
    filterByAttribute(this.value, 1);
});

document.getElementById('maintenanceFilter').addEventListener('change', function() {
    filterByAttribute(this.value, 2);
});

function filterByAttribute(value, index) {
    const cards = document.querySelectorAll('.OneIdeaCard');
    cards.forEach(card => {
        const items = card.querySelectorAll('.detailsListItem');
        const attr = items[index].textContent.toLowerCase();
                    
        if (value === 'cover') {
            card.parentElement.style.display = 'block';
        } else if (attr.includes(value)) {
            card.parentElement.style.display = 'block';
        } else {
            card.parentElement.style.display = 'none';
        }
    });
}