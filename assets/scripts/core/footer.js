//§==============================================
//§                  FOOTER                      
//§==============================================

// FUNCTION                                      

//*------------- initFooterYear -----------------
export const initFooterYear = (yearSelector) => {
    const yearEl = document.querySelector(yearSelector);
    if(yearEl) yearEl.textContent = new Date().getFullYear();
};

