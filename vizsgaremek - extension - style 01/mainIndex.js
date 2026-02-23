document.addEventListener('DOMContentLoaded', () => {
    const settingsBtn = document.getElementById('settings_Btn');
    const sidePanel = document.getElementById('settings-sidepanel');
    const darkBtn = document.getElementById('darkmode');
    const body = document.body;

    // Create a span inside settings button for the middle hamburger line
    const middleLine = document.createElement('span');
    settingsBtn.appendChild(middleLine);

    // 1. Toggle Side Panel
    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidePanel.classList.toggle('active');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidePanel.contains(e.target) && sidePanel.classList.contains('active')) {
            sidePanel.classList.remove('active');
        }
    });

    // 2. Dark Mode Toggle
    // Set initial icon
    darkBtn.innerHTML = '🌙'; 
    
    darkBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if(body.classList.contains('dark-mode')) {
            darkBtn.innerHTML = '☀️';
            darkBtn.style.background = '#f1c40f';
        } else {
            darkBtn.innerHTML = '🌙';
            darkBtn.style.background = '#166534';
        }
    });

    // 3. Smooth Scroll Enhancement
    // Ensure all internal links scroll smoothly
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 4. Placeholder Content Generation
    // Just to make the layout look "alive" immediately
    const showcase = document.getElementById('showcase-container');
    for(let i = 0; i < 4; i++) {
        let card = document.createElement('div');
        card.style.background = 'rgba(255,255,255,0.3)';
        card.style.borderRadius = '20px';
        card.style.border = '1px solid white';
        showcase.appendChild(card);
    }
});