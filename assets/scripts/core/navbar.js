//§==============================================
//§                  NAVBAR                      
//§==============================================

// FUNCTION                                      

//*--------------- initNavbar -------------------
export const initNavbar = (navSelector, linkSelector, sectionSelector, burgerControls = null) => {
    // Variables 
    const navbar = document.querySelector(navSelector); 
    const links = document.querySelector(linkSelector); 
    const sections = document.querySelector(sectionSelector);

    if (!navbar) return;

    // Functions 
    //* --- setActiveLink ---
    const setActiveLink = (clickedLink) => {
        links.forEach(link => link.classList.toggle('active', link === clickedLink));
    };

    //* --- showSection ---
    const showSection = (targetId) => {
        sections.forEach(section => {
            section.classList.toggle('active', section.id === targetId);
        });
    };

    //* --- handleNavClick ---
    const handleNavClick = (e) => {
        const link = e.target.closest(linkSelector);
        if(!link) return;

        const targetId = link.dataset.link;
        setActiveLink(link);
        showSection(targetId);

        if(burgerControls) burgerControls.close();
    };

    // Event Listener 
    navbar.addEventListener('click', handleNavClick);
};

