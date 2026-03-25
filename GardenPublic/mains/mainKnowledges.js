// --- Knowledges cards read Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
document.addEventListener("DOMContentLoaded", async () => {
    const responseKnowledges = await fetch('/api/knowledge', {method : "GET" , headers : {"Content-Type" : "application/json"}})
    const ListOfKnowledges = await responseKnowledges.json()
    const KnowledgesCardContainer = document.getElementById("main-container-knowledges")

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


    ListOfKnowledges.forEach(knowledge => {
        const OneKnowledgeCard = document.createElement("div")
        OneKnowledgeCard.setAttribute("class","OneKnowledgeCard")
        const OneKnowledgeTitle = document.createElement("h2")
        OneKnowledgeTitle.setAttribute("class","OneKnowledgeTitle")

        const OneKnowledgeDescription = document.createElement("p")
        OneKnowledgeDescription.setAttribute("class","OneKnowledgeDescription")
        
        OneKnowledgeTitle.textContent = `${knowledge.title}`
        let descriptionBuffer = knowledge.description.split('.')
        for (let i = 0; i < descriptionBuffer.length; i++) {
            const paragraph = document.createElement('p')
            paragraph.setAttribute('class','OneKnowledgeParagraph')
            if (descriptionBuffer[i+1] !== undefined) {
                paragraph.textContent = `${descriptionBuffer[i]}.${descriptionBuffer[i+1]}`
            }
            else{
                paragraph.textContent = `${descriptionBuffer[i]}`
            }
            
            OneKnowledgeDescription.appendChild(paragraph)
        }

        OneKnowledgeCard.appendChild(OneKnowledgeTitle)
        OneKnowledgeCard.appendChild(OneKnowledgeDescription)

        KnowledgesCardContainer.appendChild(OneKnowledgeCard)
    });
})
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
// --- Scroll up btn Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// document.getElementById("goup-btn").addEventListener("click", () => {
//     window.scrollTo({top:0, behavior: 'smooth'})
// })
// --- Parallax effect Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
const backhill = document.getElementById('backhill')
const middlehill = document.getElementById('middlehill')
const fronthill = document.getElementById('fronthill')

const titles = document.getElementById('title-cont')

const navbar = document.getElementById('top-navbar')

window.addEventListener('scroll', () => {
    let scrollHeight = window.scrollY
    console.log(Math.round(scrollHeight,2))
    // backhill.style.left = scrollHeight * -1.5 + 'px'
    // middlehill.style.left = scrollHeight * 1.5 + 'px'

    if (Math.round(scrollHeight,2) <= 200) {
        navbar.style.position = 'fixed'
    }
    else{
        navbar.style.position = 'absolute'
    }
})