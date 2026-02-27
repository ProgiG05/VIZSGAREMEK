const settingsBtn = document.getElementById('settings_Btn');
const sidePanel = document.getElementById('settings-sidepanel');
const darkBtn = document.getElementById('darkmode');
const cube = document.getElementById('cube');
document.addEventListener('DOMContentLoaded', () => {

});
document.getElementById('settings_Btn').addEventListener('click',() => {
    sidePanel.style.transitionDuration = '0.2'
    sidePanel.style.transitionBehavior = 'ease-in'  
    sidePanel.style.left = 0
})
document.getElementById('closeSidePanel').addEventListener('click',() => {
    sidePanel.style.transitionDuration = '0.2'
    sidePanel.style.transitionBehavior = 'ease-in'
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