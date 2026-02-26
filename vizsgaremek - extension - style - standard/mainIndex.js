const settingsBtn = document.getElementById('settings_Btn');
const sidePanel = document.getElementById('settings-sidepanel');
const darkBtn = document.getElementById('darkmode');
const cube = document.getElementById('cube');
document.addEventListener('DOMContentLoaded', () => {
    // cube.style.animation = 'rotate linear infinite'
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
document.getElementById("gardenMakerPage_Btn").addEventListener("mouseover", () => {
    cube.style.animation = 'rotate 30s linear infinite'
})
document.getElementById("gardenMakerPage_Btn").addEventListener("mouseleave", () => {
    cube.style.animation = ''
})



