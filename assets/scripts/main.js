//§==============================================
//§                   MAIN                       
//§==============================================

//*----------------------------------------------
//*                  IMPORTS
//*----------------------------------------------
import { initBurgerMenu } from "./core/burger";
import { initFooterYear } from "./core/footer";
import { initNavbar } from "./core/navbar";


//*----------------------------------------------
//*        INITIALISATION DES MODULES
//*----------------------------------------------
const burgerControls = initBurgerMenu('header', '.burger-menu');
initNavbar('nav', '.link', 'main section', burgerControls);
initFooterYear('.currentYear');