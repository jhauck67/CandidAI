//§==============================================
//§                   MAIN                       
//§==============================================

//*----------------------------------------------
//*                  IMPORTS
//*----------------------------------------------
import { initBurgerMenu } from "./core/burger.js";
import { initFooterYear } from "./core/footer.js";
import { initNavbar } from "./core/navbar.js";
import { initCandidate } from "./modules/candidate.js";
import { initProfile } from "./modules/profile.js";



//*----------------------------------------------
//*        INITIALISATION DES MODULES
//*----------------------------------------------
const burgerControls = initBurgerMenu('header', '.burger-menu');
initNavbar('nav', '.link', 'main section', burgerControls);
initFooterYear('.currentYear');
initProfile();
initCandidate();