//§==============================================
//§                  BURGER                      
//§==============================================

// FUNCTION                                      

//*------------- initBurgerMenu -----------------
export const initBurgerMenu = (headerSelector, burgerSelector) => {
    // Variables 
    const header = document.querySelector(headerSelector);
    const burgerMenu = document.querySelector(burgerSelector);

    if (!header || !burgerMenu) return;

    // Function 
    const toggleBurgerMenu = () => {
        const isOpen = header.classList.toggle('open');
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    };

    // Event Listener 
    burgerMenu.addEventListener('click', toggleBurgerMenu);

    // Return 
    return {
        close: () => {
            header.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    };
};
