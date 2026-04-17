// --- Knowledges cards read Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
        const loginBtn = document.getElementById("logIn_Btn");
        const accountHandler = (e) => {
            e.preventDefault();
            window.location.href = "/sites/accounts.html";
        };

        if (loginBtn) {
            loginBtn.innerHTML = `${user.username}`;
            loginBtn.addEventListener("click", accountHandler);
        }
    }

    const responseKnowledges = await fetch('/api/knowledge', {method : "GET" , headers : {"Content-Type" : "application/json"}})
    const ListOfKnowledges = await responseKnowledges.json()

    const KnowledgesCardContainer = document.getElementById("knowledges-container")
    const OneKnowledgeShowcasecont = document.getElementById("oneCardShowcase_cont")

    if (ListOfKnowledges.length > 0) {
        const randomNum = Math.floor(Math.random() * ListOfKnowledges.length)
        OneKnowledgeShowcasecont.appendChild(createKnowledgeCard(ListOfKnowledges[randomNum]))
    }

    ListOfKnowledges.forEach(knowledge => {
        KnowledgesCardContainer.appendChild(createKnowledgeSection(knowledge))
    });
})

function createKnowledgeSection(knowledge) {
    // 1. Create the horizontal container
    const OneKnowledgeSet = document.createElement("div")
    OneKnowledgeSet.setAttribute("class","OneKnowledgeSet")

    // 2. Create the Card Container
    const OneKnowledgeCard = document.createElement("div")
    OneKnowledgeCard.setAttribute("class","OneKnowledgeCard")

    // 3. Create content wrapper
    const cardContent = document.createElement("div")
    cardContent.setAttribute("class","card-content")

    // 4. Title & Summary creation
    const OneKnowledgeTitle = document.createElement("h2")
    OneKnowledgeTitle.setAttribute("class","OneKnowledgeTitle")
    OneKnowledgeTitle.textContent = `${knowledge.title}`

    const OneKnowledgeSummary = document.createElement('p')
    OneKnowledgeSummary.setAttribute('class','OneKnowledgeSummary')
    OneKnowledgeSummary.textContent = `${knowledge.summary}`

    // 5. Readmore & Close button creation
    const readMoreBtn = document.createElement('button')
    readMoreBtn.setAttribute('class','readMoreBtn')
    readMoreBtn.setAttribute('id','readMoreBtn')
    readMoreBtn.textContent = `>`

    const closeBtn = document.createElement("button")
    closeBtn.setAttribute('class','closeBtn')
    closeBtn.setAttribute('id','closeBtn')
    closeBtn.textContent = 'Close'

    const cardActions = document.createElement("div")
    cardActions.setAttribute("class","card-actions")

    const OneKnowledgeDescription = document.createElement("div")
    OneKnowledgeDescription.setAttribute("class","OneKnowledgeDescription")

    // 6. Button functions
    readMoreBtn.addEventListener('click', () => {
        // Add expanded class
        OneKnowledgeSet.classList.add('expanded')
        
        // Build description
        let descriptionBuffer = knowledge.description.split('.')
        OneKnowledgeDescription.innerHTML = ""
        
        for (let i = 0; i < descriptionBuffer.length; i++) {
            const paragraph = document.createElement('p')
            paragraph.setAttribute('class','OneKnowledgeParagraph')

            if (descriptionBuffer[i+1] !== undefined && descriptionBuffer[i] !== undefined) {
                paragraph.textContent = `${descriptionBuffer[i]}.${descriptionBuffer[i+1]}`
            }
            if (descriptionBuffer[i+1] === undefined) {
                paragraph.textContent = `${descriptionBuffer[i]}`
            }

            OneKnowledgeDescription.appendChild(paragraph)
        }
        
        // Add description and close button to card
        OneKnowledgeCard.appendChild(OneKnowledgeDescription)
        cardActions.appendChild(closeBtn)
        OneKnowledgeCard.appendChild(cardActions)
        
        // Hide readMoreBtn
        readMoreBtn.style.display = 'none'

        OneKnowledgeSet.removeChild(imageWrapper)
        OneKnowledgeCard.appendChild(imageWrapper)
    })
    
    closeBtn.addEventListener('click', () => {
        // Remove expanded class
        OneKnowledgeSet.classList.remove('expanded')
        
        // Hide and clear description
        OneKnowledgeDescription.innerHTML = ""
        cardActions.innerHTML = ""
        
        // Remove description and actions from card
        if (OneKnowledgeCard.contains(OneKnowledgeDescription)) {
            OneKnowledgeCard.removeChild(OneKnowledgeDescription)
        }
        if (OneKnowledgeCard.contains(cardActions)) {
            OneKnowledgeCard.removeChild(cardActions)
        }
        
        // Show readMoreBtn again
        readMoreBtn.style.display = ''

        OneKnowledgeSet.appendChild(imageWrapper)
        OneKnowledgeCard.removeChild(imageWrapper)
    })


    const imageWrapper = document.createElement("div")
    imageWrapper.setAttribute("class","OneKnowledgePictureWrapper")

    const imagePlace = document.createElement("img")
    imagePlace.setAttribute("class","OneKnowledgePicture")
    imagePlace.setAttribute("src", "../pics/gardenknowledges/" + knowledge.picture + ".png");

    imageWrapper.appendChild(imagePlace)
    
    // 7. Assembly
    cardContent.appendChild(OneKnowledgeTitle)
    cardContent.appendChild(OneKnowledgeSummary)
    OneKnowledgeCard.appendChild(cardContent)
    
    OneKnowledgeSet.appendChild(OneKnowledgeCard)
    OneKnowledgeSet.appendChild(readMoreBtn)
    OneKnowledgeSet.appendChild(imageWrapper)

    return OneKnowledgeSet
}

function createKnowledgeCard(knowledge) {
    // 1. Create the Main Card Container
    const OneKnowledgeCard = document.createElement("div")
    OneKnowledgeCard.setAttribute("class","ShowCaseOneKnowledgeCard")

    // 2. Title & Summary creation
    const OneKnowledgeTitle = document.createElement("h2")
    OneKnowledgeTitle.setAttribute("class","ShowCaseOneKnowledgeTitle")
    OneKnowledgeTitle.textContent = `${knowledge.title}`

    const OneKnowledgeSummary = document.createElement('p')
    OneKnowledgeSummary.setAttribute('class','ShowCaseOneKnowledgeSummary')
    OneKnowledgeSummary.textContent = `${knowledge.summary}`

    //3. Assembly
    OneKnowledgeCard.appendChild(OneKnowledgeTitle)
    OneKnowledgeCard.appendChild(OneKnowledgeSummary)

    const imageWrapper = document.createElement("div")
    imageWrapper.setAttribute("class","ShowCaseOneKnowledgePictureWrapper")

    const imagePlace = document.createElement("img")
    imagePlace.setAttribute("class","ShowCaseOneKnowledgePicture")
    imagePlace.setAttribute("src", "../pics/gardenknowledges/" + knowledge.picture + ".png");

    imageWrapper.appendChild(imagePlace)

    OneKnowledgeCard.appendChild(imageWrapper)

    return OneKnowledgeCard
}



// --- Localstorage Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
window.onload = () => {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        darkBtn.classList.add('dark-active');
    }
};
// --- Side Panel Toggle ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

const settingsBtn = document.getElementById('settings_Btn');
const sidePanel = document.getElementById('settings-sidepanel');
const closePanel = document.getElementById('closeSidePanel');

settingsBtn.addEventListener('click', () => {
    sidePanel.style.transition = '0.4s all ease'
    sidePanel.style.left = 0
});
closePanel.addEventListener('click', () => {
    sidePanel.style.transition = '0.4s all ease'
    sidePanel.style.left = "-22.5rem"
});

// --- Dark Mode Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
const body = document.body;
const darkBtn = document.getElementById('darkmode');

darkBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    darkBtn.classList.toggle('dark-active');
    
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
// --- Scroll up btn & scroll down btn Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

document.getElementById("toup").addEventListener("click", () => {
    window.scrollTo({top:0, behavior: 'smooth'})
})

document.getElementById("showContainer").addEventListener("click", () => {
    document.getElementById("knowledges-container").scrollIntoView({behavior:"smooth"})
})