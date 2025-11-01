//§==============================================
//§                CANDIDATE                     
//§==============================================

// VARIABLES                                     
const exportPdfBtn = document.getElementById('exportPdfBtn');

//FUNCTIONS  ----- Utils Functions -----         
//* ----- renderHeaderAndPersonalInfos ----------
const renderHeaderAndPersonalInfos = (data) => {
    // Header
    const cvFirstNameInput = document.getElementById('cvFirstNameInput');
    cvFirstNameInput.value = `${data.header.firstName}`;
    const cvLastNameInput = document.getElementById('cvLastNameInput');
    cvLastNameInput.value = `${data.header.lastName}`;
    const cvWorkInput = document.getElementById('cvWorkInput');
    cvWorkInput.value = `${data.header.work}`;
    // Personal Infos
    const cvAddressInput = document.getElementById('cvAddressInput');
    cvAddressInput.value = `${data.personalInfos.address}`;
    const cvPhoneInput = document.getElementById('cvPhoneInput');
    cvPhoneInput.value = `${data.personalInfos.phone}`;
    const cvEmailInput = document.getElementById('cvEmailInput');
    cvEmailInput.value = `${data.personalInfos.email}`;
    const cvDrivingLicenseInput = document.getElementById('cvDrivingLicenseInput');
    cvDrivingLicenseInput.value = `${data.personalInfos.drivingLicense}`;
    const cvAvailabilityInput = document.getElementById('cvAvailabilityInput');
    cvAvailabilityInput.value = `${data.personalInfos.availability}`;
};

//* --------- renderProfileSummary --------------
const renderProfileSummary = (data) => {
    const cvProfilTextarea = document.getElementById('cv-profil-textarea');
    cvProfilTextarea.value = `${data.profileSummary}`;
};

//* ------------- renderSkills ------------------
const renderSkills = (skillsArray, containerClass) => {
    const container = document.querySelector(containerClass);
    if(!container) return;

    // Nettoyer l'ancien contenu
    container.innerHTML = '';
    
    // Valeur par défaut de tous les curseurs
    const defaultValue = 75;

    skillsArray.forEach(skillName => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';

        // 1. Nom de la compétence
        const nameInput = document.createElement('textarea');
        nameInput.className = 'skill-name';
        nameInput.value = skillName;

        // 2. Curseur (Input Range)
        const rangeInput = document.createElement('input');
        rangeInput.type = 'range';
        rangeInput.min = '0';
        rangeInput.max = '100';
        rangeInput.value = defaultValue;
        rangeInput.className = 'skill-level-range';
        rangeInput.setAttribute('data-skill-name', skillName); // Stockage de l'info

        // 3. Affichage de la valeur (%)
        const levelDisplay = document.createElement('span');
        levelDisplay.className = 'level-display';
        levelDisplay.textContent = `${defaultValue}%`;

        // 4. Événement pour mettre à jour la valeur (%) en temps réel
        rangeInput.addEventListener('input', (event) => {
            levelDisplay.textContent = `${event.target.value}%`;
        });

        // Assemblage
        skillItem.appendChild(nameInput);
        skillItem.appendChild(rangeInput);
        skillItem.appendChild(levelDisplay);
        container.appendChild(skillItem);
    });
};

//* ----------- renderExperiences ---------------
const renderExperiences = (experiencesArray) => {
    const container = document.querySelector('.cv-experiences-container');
    if(!container) return;

    container.innerHTML = '';

    experiencesArray.forEach(exp => {

        const expContainer = document.createElement('div');
        expContainer.className = 'exp-container';

        // 1. Nom de l'exp et employeur
        const titleH4 = document.createElement('h4');
        titleH4.className = 'expTitle';
        const expTitle = document.createElement('input');
        expTitle.type = 'text';
        expTitle.className = 'expTitle';
        expTitle.value = `${exp.title}`;
        const expCompany = document.createElement('input');
        expCompany.type = 'text';
        expCompany.className = 'expCompany';
        expCompany.value = `${exp.company}`;

        titleH4.appendChild(expTitle);
        titleH4.appendChild(expCompany);

        // 2. Période et lieu
        const paragraphe = document.createElement('p');
        paragraphe.className = 'legende';
        const expDuration = document.createElement('input');
        expDuration.type = 'text';
        expDuration.className = 'expDuration';
        expDuration.value = `${exp.duration}`;
        const expLocation = document.createElement('input');
        expLocation.type = 'text';
        expLocation.className = 'expLocation';
        expLocation.value = `${exp.location}`;
        paragraphe.appendChild(expDuration);
        paragraphe.appendChild(expLocation);

        // 3. Highlights
        const highlightsUl = document.createElement('ul');
        highlightsUl.className = 'highlightsUl';

        exp.highlights.forEach(highlight => {
            const highlightLi = document.createElement('li');
            highlightLi.className = 'highlightLi';

            const highlightInput = document.createElement('textarea');
            highlightInput.className = 'highlightInput';
            highlightInput.value = `${highlight}`;

            highlightLi.appendChild(highlightInput);
            highlightsUl.appendChild(highlightLi);
        });

        // 4. Assemblage
        expContainer.appendChild(titleH4);
        expContainer.appendChild(paragraphe);
        expContainer.appendChild(highlightsUl);

        container.appendChild(expContainer);
    });
};

//* ------------ renderFormation ----------------
const renderFormation = (educationArray) => {
    const container = document.querySelector('.cv-formations-container');
    if(!container) return;

    container.innerHTML = '';

    educationArray.forEach(form => {
        const formContainer = document.createElement('div');
        formContainer.className = 'form-container';

        // 1. Nom de la formation
        const formTitle = document.createElement('h4');
        formTitle.className = 'form-title';
        const formTitleInput = document.createElement('input');
        formTitleInput.type = 'text';
        formTitleInput.className = 'form-title-input';
        formTitleInput.value = `${form.degree}`;
        formTitle.appendChild(formTitleInput);

        // 2. Description
        const formDescr = document.createElement('div');
        formDescr.className = 'form-descr';

        const formDurationInput = document.createElement('input');
        formDurationInput.type = 'text';
        formDurationInput.className = 'form-duration-input';
        formDurationInput.value = `${form.duration}`;

        const formInstitutionInput = document.createElement('input');
        formInstitutionInput.type = 'text';
        formInstitutionInput.className = 'form-institution-input';
        formInstitutionInput.value = `${form.institution}`;

        formDescr.appendChild(formDurationInput);
        formDescr.appendChild(formInstitutionInput);

        // 3. Assemblage
        formContainer.appendChild(formTitle);
        formContainer.appendChild(formDescr);

        container.appendChild(formContainer);
    })
};

//* ------ getLanguageLevelPercentage -----------
const getLanguageLevelPercentage = (level) => {
    // Adapter ces valeurs à ce que vous souhaitez afficher visuellement
    switch (level.toLowerCase()) {
        case 'scolaire':
            return 30; // 30% pour un niveau de base
        case 'notions':
            return 45;
        case 'intermédiaire':
            return 60;
        case 'courant':
            return 80;
        case 'bilingue':
        case 'maternel':
            return 100;
        default:
            return 20; // Niveau par défaut si non reconnu
    }
};

//* ------------ renderLanguages ----------------
const renderLanguages = (languagesArray) => {
    const container = document.querySelector('.cv-languages-container');
    if (!container) return; 

    container.innerHTML = ''; // Nettoyer l'ancien contenu

    languagesArray.forEach(lang => {
        const percentage = getLanguageLevelPercentage(lang.level);
        
        // Création du conteneur de la langue
        const langItem = document.createElement('div');
        langItem.className = 'language-item';
        
        // 1. Nom et Niveau textuel
        langItem.innerHTML = `
            <span class="language-name">${lang.language}</span>
            <span class="language-level-text">${lang.level}</span>
            <div class="language-bar-track">
                <div class="language-bar-fill" style="width: ${percentage}%;"></div>
            </div>
        `;
        
        container.appendChild(langItem);
    });
};

//* --------------- renderCV --------------------
const renderCV = (data) => {
    // Functions 
    renderHeaderAndPersonalInfos(data);
    renderProfileSummary(data);
    renderSkills(data.skills.technical, '.cv-technical-skills-container');
    renderSkills(data.skills.soft, '.cv-soft-skills-container');
    renderExperiences(data.experiences);
    renderFormation(data.education);
    renderLanguages(data.languages);
};


// FUNCTION  ----- Initialisation -----          
export const initCandidate = () => {
    // Variables 
    const candidateSection = document.querySelector('section#candidate');
    const candidateSectionTitle = document.querySelector('section#candidate h2');
    const annonceInput = document.getElementById('annonce');
    const message = document.getElementById('message');
    const generateBtn = document.getElementById('generateBtn');

    // Event Listener 
    generateBtn.addEventListener('click', async () => {
        // On récupère l'annonce
        const annonce = annonceInput.value;

        // On passe à l'écran "génération en cours..."
        candidateSectionTitle.textContent = "⚙️ Optimisation du CV en cours...";
        candidateSection.classList.remove('askingAnnonce');
        candidateSection.classList.add('generatingCV');


        try {
            message.innerHTML = `1/3. Analyse des mots-clés de l'annonce et ciblage des exigences... 🎯 <br>2/3. Préparation du prompt et envoi à l'IA... ⚡ <br>3/3. Rédaction et mise en forme des expériences clés... ✍️`;
            const res = await fetch('http://localhost:3000/generate-cv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ annonce }),
            });
            const data = await res.json();
            candidateSection.classList.remove('generatingCV');
            candidateSection.classList.add('displayResponse');
            candidateSectionTitle.textContent = `CV : ${data.cv.header.work}`;
            message.textContent = "Vérifier le CV généré et exporter le en PDF.";
            renderCV(data.cv);
        } catch (err) {
            console.error(err);
            console.log("Erreur lors de la génération.");
        }
    });
};

// EVENT LISTENER                                
exportPdfBtn.addEventListener('click', () => {
    console.log("Le bouton fonctionne !");
    
});