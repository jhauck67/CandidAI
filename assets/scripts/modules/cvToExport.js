//§==============================================
//§               CV TO EXPORT                   
//§     (Capture des inputs et rendu statique)   
//§==============================================

// FUNCTION                                      
//* ------------- createElement -----------------
const createElement = (tag, className, container, content = null) => {
    const element = document.createElement(tag);
    element.className = className;

    if(content) {
        element.textContent = content;
    }

    container.appendChild(element);
    return element;
};

//* ------------- captureSkills -----------------
const captureSkills = (containerClass) => {
    const skillsList = [];
    const container = document.querySelector(containerClass);
    
    // Si le conteneur existe, on cherche les items DEDANS
    if (container) {
        const skillItems = container.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            const nameInput = item.querySelector('.skill-name');
            const levelDisplay = item.querySelector('.level-display');
            
            if (nameInput && levelDisplay) {
                skillsList.push({
                    name: nameInput.value, 
                    level: levelDisplay.textContent 
                });
            }
        });
    }
    return skillsList;
};

//* ------------ captureLanguages ---------------
const captureLanguages = () => {
    const languagesList = [];
    const languageItems = document.querySelectorAll('.language-item');

    languageItems.forEach(languageItem => {
        const nameElement = languageItem.querySelector('.language-name');
        const levelElement = languageItem.querySelector('.language-level-text');
        // ⚠️ Correction : on récupère le texte, c'est ce qu'on compare !
        const textLevel = levelElement?.textContent.trim().toLowerCase() || ''; 
        
        let numericLevel = 0; // Initialisation du niveau numérique à 0 par défaut

        // 2. Correction des conditions : on utilise 'if/else if' et on assigne la variable, 
        // PAS de 'return' ici !
        if(textLevel === 'scolaire') {
            numericLevel = 30;
        } else if(textLevel === 'intermédiaire') {
            numericLevel = 60;
        } else if(textLevel === 'courant') { // Exemple pour un niveau 'Courant'
            numericLevel = 85; 
        } else if(textLevel === 'bilingue') { // Exemple pour un niveau 'Bilingue'
            numericLevel = 100;
        }

        // 3. On ne push que si les éléments existent et que le nom n'est pas vide
        if (nameElement && textLevel) {
            languagesList.push({
                // On utilise .textContent ici pour récupérer la valeur de l'élément (comme vous l'aviez fait)
                name: nameElement.textContent, 
                textLevel: textLevel,
                level: numericLevel // Le niveau numérique que l'on vient de calculer
            });
        }
    });
    
    // 1. Retourne le tableau rempli à la fonction appelante
    return languagesList;
};

//* ----------  captureExperiences --------------
const captureExperiences = () => {
    const experiencesList = [];

    const expItems = document.querySelectorAll('.exp-container');
    expItems.forEach(expItem => {
        const expTitle = expItem.querySelector('input.expTitle');
        const expCompany = expItem.querySelector('.expCompany');
        const expDuration = expItem.querySelector('.expDuration');
        const expLocation = expItem.querySelector('.expLocation');
        
        const highlightsList = [];
        
        const highlights = expItem.querySelectorAll('.highlightLi');
        highlights.forEach(highlightItem => {
            const highlight = highlightItem.querySelector('.highlightInput');
        highlightsList.push(highlight.value);
        });

        if (expTitle && expCompany && expDuration && expLocation && highlightsList) {
            experiencesList.push({
                title: expTitle.value,
                company: expCompany.value,
                duration: expDuration.value,
                location: expLocation.value,
                highlights: highlightsList
            });
        }
    });
    return experiencesList;
};

//* ----------- captureFormations ---------------
const captureFormations = () => {
    const formationsList = [];

    const formItems = document.querySelectorAll('.form-container');
    formItems.forEach(formItem => {
        const formTitle = formItem.querySelector('.form-title-input');
        const formDuration = formItem.querySelector('.form-duration-input');
        const formInstitution = formItem.querySelector('.form-institution-input');

        if (formTitle && formDuration && formInstitution) {
            formationsList.push({
                title: formTitle.value,
                duration: formDuration.value,
                institution: formInstitution.value
            });
        }
    });
    return formationsList;
};

//* ------------ getFinalCVvalue ----------------
export const getFinalCVvalue = () => {
    const technicalSkills = captureSkills('.cv-technical-skills-container');
    const softSkills = captureSkills('.cv-soft-skills-container');

    const languagesData = captureLanguages();

    const cvProfile = document.getElementById('cv-profil-textarea');

    const experiencesData = captureExperiences();
    
    const formationsData = captureFormations();

    const finalCV = {
        header:  {
            firstName: cvFirstNameInput.value,
            lastName: cvLastNameInput.value,
            work: cvWorkInput.value
        },
        personnalInfos: {
            address: cvAddressInput.value,
            phone: cvPhoneInput.value,
            email: cvEmailInput.value,
            drivingLicense: cvDrivingLicenseInput.value,
            availability: cvAvailabilityInput.value
        },
        skills: {
            technical: technicalSkills,
            soft: softSkills
        },
        languages: languagesData,
        profile: cvProfile.value,
        experiences: experiencesData,
        formations: formationsData
    }
    return finalCV;
};

//* ------------- renderSkills ------------------
const renderSkills = (skillsArray, container) => {
    skillsArray.forEach(skill => {
        const percentage = skill.level;
        
        // Création du conteneur de la langue
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        // 1. Nom et Niveau textuel
        skillItem.innerHTML = `
            <span class="skill-name">${skill.name}</span>
            <div class="skill-bar-track">
                <div class="skill-bar-fill" style="width: ${percentage};"></div>
            </div>
        `;
        container.appendChild(skillItem);
    });
};

//* ------------ renderLanguages ----------------
const renderLanguages = (languagesArray, container) => {
    languagesArray.forEach(lang => {
        const percentage = lang.level;
        
        // Création du conteneur de la langue
        const langItem = document.createElement('div');
        langItem.className = 'language-item';
        
        // 1. Nom et Niveau textuel
        langItem.innerHTML = `
            <span class="language-name">${lang.name}</span>
            <span class="language-level-text">${lang.textLevel}</span>
            <div class="language-bar-track">
                <div class="language-bar-fill" style="width: ${percentage}%;"></div>
            </div>
        `;
        container.appendChild(langItem);
    });
};

//* ----------- renderExperiences ---------------
const renderExperiences = (experiencesArray, container) => {
    experiencesArray.forEach(exp => {
        const expContainer = createElement('div', 'exp-container no-break-inside', container);
            const expTitle = createElement('h4', 'expTitle', expContainer);
                createElement('div', 'expTitle', expTitle, exp.title);
                createElement('div', 'expCompany', expTitle, exp.company);
            const legende = createElement('p', 'legende', expContainer);
                createElement('div', 'expDuration', legende, exp.duration);
                createElement('div', 'expLocation', legende, exp.location);
            const highlightsUl = createElement('ul', 'highlightsUl', expContainer);
                exp.highlights.forEach(highlight => {
                    createElement('li', 'highlightLi', highlightsUl, highlight)
                });
    });
};

//* ----------- renderFormations ----------------
const renderFormations = (formationsArray, container) => {
    formationsArray.forEach(form => {
        const formContainer = createElement('div', 'form-container no-break-inside', container);
            createElement('h4', 'form-title', formContainer, form.title);
            const formDesc = createElement('div', 'form-descr', formContainer);
                createElement('div', 'form-duration', formDesc, form.duration);
                createElement('div', 'form-institution', formDesc, form.institution);
    });
};

//* ------------ makeCvToExport -----------------
export const makeCvToExport = (finalCV) => {
    const container = document.getElementById('cvContent');
    //* Sidebar
    const cvSidebar = createElement('div', 'cv-sidebar', container);
        // Header
        const cvHeaderSection = createElement('div', 'cv-header-section cv-section', cvSidebar);
            createElement('div', 'cv-first-name', cvHeaderSection, finalCV.header.firstName);
            createElement('div', 'cv-last-name', cvHeaderSection, finalCV.header.lastName);
            createElement('div', 'cv-work', cvHeaderSection, finalCV.header.work);
        
        // Personal Infos
        const cvPersonalInfos = createElement('div', 'cv-personal-infos-section cv-section', cvSidebar);
            createElement('h3', 'cvH3', cvPersonalInfos, 'Informations personnelles');
            createElement('div', 'cv-personalInfos', cvPersonalInfos, finalCV.personnalInfos.address);
            createElement('div', 'cv-personalInfos', cvPersonalInfos, finalCV.personnalInfos.phone);
            createElement('div', 'cv-personalInfos', cvPersonalInfos, finalCV.personnalInfos.email);
            createElement('h4', 'cvH4', cvPersonalInfos, 'Permis de conduire :');
            createElement('div', 'cv-personalInfos', cvPersonalInfos, finalCV.personnalInfos.drivingLicense);
            createElement('h4', 'cvH4', cvPersonalInfos, 'Disponibilité :');
            createElement('div', 'cv-personalInfos', cvPersonalInfos, finalCV.personnalInfos.availability);
        
        // Skills
        const cvSkills = createElement('div', 'cv-skills-section cv-section', cvSidebar);
            createElement('h3', 'cvH3', cvSkills, 'Compétences');
            createElement('h4', 'cvH4', cvSkills, 'techniques');
            const technicalSkills = createElement('div', 'cv-technical-skills-container', cvSkills);
                renderSkills(finalCV.skills.technical, technicalSkills);
            createElement('h4', 'cvH4', cvSkills, 'transférables');
            const softSkills = createElement('div', 'cv-soft-skills-container', cvSkills);
                renderSkills(finalCV.skills.soft, softSkills);
        
        // Languages
        const cvLanguagesContainer = createElement('div', 'cv-languages-section cv-section', cvSidebar);
            createElement('h3', 'cvH3', cvLanguagesContainer, 'Langues');
            const cvLanguages = createElement('div', 'cv-languages-container', cvLanguagesContainer)
                renderLanguages(finalCV.languages, cvLanguages);

    //* Main
    const cvMain = createElement('div', 'cv-main', container);
        // Profil
        const cvProfil = createElement('div', 'cv-profil-section cv-section', cvMain);
            const cvProfilTitle = createElement('div', 'cv-profil-section-title cv-main-title', cvProfil);
                cvProfilTitle.innerHTML = `
                <img src="./assets/img/icons/svgs/profil.svg" width="30" height="30" alt="logo de profil">
                `;
                createElement('h3', 'cvH3main', cvProfilTitle, 'Profil');
            createElement('div', 'cv-main-content', cvProfil, finalCV.profile);

        // Experiences
        const cvExperiences = createElement('div', 'cv-experiences-section cv-section', cvMain);
            const cvExperiencesTitle = createElement('div', 'cv-experiences-section-title cv-main-title', cvExperiences);
                cvExperiencesTitle.innerHTML = `
                <img src="./assets/img/icons/svgs/experience.svg" width="30" height="30" alt="logo d'experiences">
                `;
                createElement('h3', 'cvH3main', cvExperiencesTitle, 'Expérience professionnelle');
            const cvExperiencesMain = createElement('div', 'cv-experiences-container cv-main-content', cvExperiences);
                renderExperiences(finalCV.experiences, cvExperiencesMain);

        // Formations
        const cvFormations = createElement('div', 'cv-formations-section cv-section', cvMain);
            const cvFormationsTitle = createElement('div', 'cv-formations-section-title cv-main-title', cvFormations);
                cvFormationsTitle.innerHTML = `
                <img src="./assets/img/icons/svgs/formation.svg" width="30" height="30" alt="logo de formations">
                `;
                createElement('h3', 'cvH3main', cvFormationsTitle, 'Formation');
            const cvFormationsMain = createElement('div', 'cv-formations-container cv-main-content', cvFormations);
                renderFormations(finalCV.formations, cvFormationsMain);
};

