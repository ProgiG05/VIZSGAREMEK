// --- Knowledges cards read Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
document.addEventListener("DOMContentLoaded", async () => {
    const responseKnowledges = await fetch('/api/knowledge', {method : "GET" , headers : {"Content-Type" : "application/json"}})
    const ListOfKnowledges = await responseKnowledges.json()
    const KnowledgesCardContainer = document.getElementById("main-container-knowledges")

    ListOfKnowledges.forEach(knowledge => {
        const OneKnowledgeCard = document.createElement("div")
        OneKnowledgeCard.setAttribute("class","OneKnowledgeCard")

        const OneKnowledgeTitle = document.createElement("h2")
        OneKnowledgeTitle.setAttribute("class","OneKnowledgeTitle")
        OneKnowledgeTitle.textContent = `${knowledge.title}`

        const OneKnowledgeSummary = document.createElement('p')
        OneKnowledgeSummary.setAttribute('class','OneKnowledgeSummary')
        OneKnowledgeSummary.textContent = `${knowledge.summary}`

        const readMoreBtn = document.createElement('button')
        readMoreBtn.setAttribute('class','readmoreBtn')
        readMoreBtn.setAttribute('id','readmoreBtn')
        readMoreBtn.textContent = 'Read more'

        const closeBtn = document.createElement("button")
        closeBtn.setAttribute('class','closeBtn')
        closeBtn.setAttribute('id','closeBtn')
        closeBtn.textContent = 'Close'

        readMoreBtn.addEventListener('click', () => {
            let descriptionBuffer = knowledge.description.split('.')
            for (let i = 0; i < descriptionBuffer.length; i++) {
                const paragraph = document.createElement('p')
                paragraph.setAttribute('class','OneKnowledgeParagraph')
                if ( descriptionBuffer[i+1] !== undefined) {paragraph.textContent = `${descriptionBuffer[i]}.${descriptionBuffer[i+1]}`}
                else{ paragraph.textContent = `${descriptionBuffer[i]}`}
                OneKnowledgeDescription.appendChild(paragraph)
            }
            OneKnowledgeDescription.appendChild(closeBtn)
            OneKnowledgeCard.removeChild(readMoreBtn)
            OneKnowledgeCard.appendChild(OneKnowledgeDescription)
        })
        closeBtn.addEventListener('click', () => {
            OneKnowledgeCard.appendChild(readMoreBtn)
            OneKnowledgeDescription.innerHTML = ""
            OneKnowledgeCard.removeChild(OneKnowledgeDescription)
        })
        const OneKnowledgeDescription = document.createElement("div")
        OneKnowledgeDescription.setAttribute("class","OneKnowledgeDescription")
        OneKnowledgeCard.appendChild(OneKnowledgeTitle)
        OneKnowledgeCard.appendChild(OneKnowledgeSummary)
        OneKnowledgeCard.appendChild(readMoreBtn)
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
document.getElementById("goup-btn").addEventListener("click", () => {
    window.scrollTo({top:0, behavior: 'smooth'})
})
// --- Parallax effect Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
const backhill = document.getElementById('backhill')
const middlehill = document.getElementById('middlehill')
const fronthill = document.getElementById('fronthill')
const navbar = document.getElementById('top-navbar')
window.addEventListener('scroll', () => {
    let scrollHeight = window.scrollY
    backhill.style.marginBottom = scrollHeight * 0.15 + 'px'
    middlehill.style.marginBottom = scrollHeight * 0.1 + 'px'
    fronthill.style.marginBottom = scrollHeight * 0.08 + 'px'
    if (Math.round(scrollHeight,2) <= 200) {navbar.style.position = 'fixed'}
    else{navbar.style.position = 'absolute'}
})