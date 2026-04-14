document.addEventListener("DOMContentLoaded", () => {
    const body = document.body

    const TopNavbar = document.createElement("nav")
    TopNavbar.setAttribute("id","top-navbar")
    TopNavbar.setAttribute("class","top-navbar")

    const settingsBtn = document.createElement("a")
    settingsBtn.setAttribute("id","settings_Btn")
    settingsBtn.textContent = "Settings"
    TopNavbar.appendChild(settingsBtn)

    const homeBtn = document.createElement("a")
    homeBtn.setAttribute("id","home_Btn")
    homeBtn.textContent = "Home"
    TopNavbar.appendChild(homeBtn)

    const ideasBtn = document.createElement("a")
    ideasBtn.setAttribute("id","goto_Ideas")
    ideasBtn.textContent = "Ideas"
    TopNavbar.appendChild(ideasBtn)

    const plantfinderBtn = document.createElement("a")
    plantfinderBtn.setAttribute("id","goto_PlantFinder")
    plantfinderBtn.textContent = "Plants"
    TopNavbar.appendChild(plantfinderBtn)

    const knowledgesBtn = document.createElement("a")
    knowledgesBtn.setAttribute("id","goto_Knowledge")
    knowledgesBtn.textContent = "Knowledges"
    TopNavbar.appendChild(knowledgesBtn)

    const gardensBtn = document.createElement("a")
    gardensBtn.setAttribute("id","goto_Gardens")
    gardensBtn.textContent = "Gardens"
    TopNavbar.appendChild(gardensBtn)

    const loginBtn = document.createElement("a")
    loginBtn.setAttribute("id","logIn_Btn")
    loginBtn.textContent = "Login / Register"
    TopNavbar.appendChild(loginBtn)

    body.appendChild(TopNavbar)
})