const settingsBtn = document.getElementById('settings_Btn');
const sidePanel = document.getElementById('settings-sidepanel');
const darkBtn = document.getElementById('darkmode');
const cube = document.getElementById('cube');

const ideasBtn = document.getElementById("goto_Ideas")
const plantfinderBtn = document.getElementById("goto_PlantFinder")
const knowledgesBtn = document.getElementById("goto_Knowledge")


ideasBtn.addEventListener("click", () => {
    window.scrollTo({top:750,behavior:"smooth"})
})
plantfinderBtn.addEventListener("click", () => {
    window.scrollTo({top:1400,behavior:"smooth"})
})
knowledgesBtn.addEventListener("click"  , () => {
    window.scrollTo({top:2250,behavior:"smooth"})
})
document.addEventListener('DOMContentLoaded', () => {

});
document.getElementById('settings_Btn').addEventListener('click',() => {
    sidePanel.style.transition = '0.4s all ease'
    sidePanel.style.left = 0
})
document.getElementById('closeSidePanel').addEventListener('click',() => {
    sidePanel.style.transition = '0.4s all ease'
    sidePanel.style.left = '-360px'
})

let isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkBtn.classList.add('dark-active');
}

document.getElementById('darkmode').addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkBtn.classList.add('dark-active');
    } else {
        document.body.classList.remove('dark-mode');
        darkBtn.classList.remove('dark-active');
    }
});

document.getElementById("gardenMakerPage_Btn").addEventListener("mouseover", () => {
    cube.style.animation = 'rotate 30s linear infinite'
})
document.getElementById("gardenMakerPage_Btn").addEventListener("mouseleave", () => {
    cube.style.animation = ''
})

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    })
})

const hiddenElements = document.querySelectorAll(".hidden")
hiddenElements.forEach((e) => observer.observe(e))

document.querySelectorAll(".detailsListItem").forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active")
    })
})
function toggleSaveState(buttonElement) {
    buttonElement.classList.toggle('saved');
}