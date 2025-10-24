//§==============================================
//§                 PROFILE                      
//§==============================================

// VARIABLES                                     
//* ------------- PersonalInfo ------------------
const lastNameInput = document.getElementById('lastName');
const firstNameInput = document.getElementById('firstName');
const addressInput = document.getElementById('address');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const linkedinInput = document.getElementById('linkedin');
const portfolioInput = document.getElementById('portfolio');
const dateOfBirthInput = document.getElementById('dateOfBirth');
const drivingLicenseInput = document.getElementById('drivingLicense');
//* ------------ initFormations -----------------
const formationsContainer = document.querySelector('.formations-container');
//* -------------- initSkills -------------------
const skillsContainer = document.querySelector('.skills-container');
//* ------------- initLanguages -----------------
const languagesContainer = document.querySelector('.languages-container');
//* ------------ initPreferences ----------------
const preferencesContainer = document.querySelector('.preferences-container');
const mobilityInput = document.getElementById('mobilityInput');
const availabilityInput = document.getElementById('availabilityInput');
//* ------------ initExperiences ----------------
const experiencesContainer = document.querySelector('.experiences-container');
// Création de l'ul générale
const experiencesGeneralUl = document.querySelector('.experiences-generalUl');

// FUNCTIONS ----- UTILS -----                   
//* -------------- createInput ------------------
const createInput = (type, name, container, value = null) => {
    const inputElement = document.createElement('input');
    inputElement.type = type;
    inputElement.name = name;
    inputElement.classList = name;
    if(value) {
        inputElement.value = value;
    }
    container.appendChild(inputElement);
    return inputElement;
};

//* ------------- createElement -----------------
const createElement = (tag, classList, container = skillsContainer) => {
    const createdElement = document.createElement(tag);
    createdElement.classList.add(classList);
    container.appendChild(createdElement);
    return createdElement;
};

//* ------------- fillTheSkills -----------------
const fillTheSkills = (data, domaine, titreH4) => {
    //* Création du conteneur
    const SkillsContainer = createElement('div', `${domaine}-skills-container`);
    //* Création du h4
    const containerTitle = createElement('h4', 'containerTitle');
    containerTitle.textContent = `${titreH4}`;
    //* Création des h5
    const technicalH5 = createElement('h5', 'technicalH5');
    technicalH5.textContent = 'Compétences techniques';
    const softH5 = createElement('h5', 'softH5');
    softH5.textContent = 'Compétences transférables';
    //* Récupération des données
    // Compétences techniques
    const technicalSkillsUl = createElement('ul', 'skillsUl');
    for(const skill of data.skills[domaine].technical) {
        const technicalSkillLi = createElement('li', 'skill');
        const technicalSkillInput = createInput('text', 'skill', technicalSkillLi, skill);
        technicalSkillsUl.appendChild(technicalSkillLi);
    }
    // Compétences transférables
    const softSkillsUl = createElement('ul', 'skillsUl');
    for(const skill of data.skills[domaine].soft) {
        const softSkillLi = createElement('li', 'skill');
        const softSkillInput = createInput('text', 'skill', softSkillLi, skill);
        softSkillsUl.appendChild(softSkillLi);
    }
    //* Remplissage du conteneur
    SkillsContainer.appendChild(containerTitle);
    SkillsContainer.appendChild(technicalH5);
    SkillsContainer.appendChild(technicalSkillsUl);
    SkillsContainer.appendChild(softH5);
    SkillsContainer.appendChild(softSkillsUl);
};

//* ------------ fillTheMissions ----------------
const fillTheMissions = (experienceContainer, experience) => {
    // Conteneur de missions
    const missionsUl = createElement('ul', 'missionsUl', experienceContainer);
    missionsUl.textContent = 'Missions :';
    // Missions
    for(const mission of experience.missions) {
        const missionLi = createElement('li', 'missionLi', missionsUl);
        const missionInput = createInput('text', 'missionInput', missionLi, mission);
    }
}

//* ------------ init1experience ----------------
const init1experience = (experienceContainer, experience) => {
    // Titre de l'expérience
    const experienceTitleH4 = createElement('h4', 'titleH4', experienceContainer);
    const experienceTitleInput = createInput('text', 'title-input', experienceTitleH4, experience.title);
    // Employeur de l'expérience
    const experienceEmployerInput = createInput('text', 'employer-input', experienceTitleH4, experience.employer);
    // Durée de l'expérience
    const experienceDurationInput = createInput('text', 'duration-input', experienceTitleH4, experience.duration);
    // Dates de début et de fin
    const experienceStartEndDate = createElement('div', 'start-end-date', experienceContainer);
    const textDe = createElement('text', 'text', experienceStartEndDate);
    textDe.textContent = 'De';
    const experienceStartDateInput = createInput('text', 'startDate', experienceStartEndDate, experience.startDate);
    const textA = createElement('text', 'text', experienceStartEndDate);
    textA.textContent = 'à';
    const experienceEndDateInput = createInput('text', 'startDate', experienceStartEndDate, experience.endDate);
    // Missions
    fillTheMissions(experienceContainer, experience);
};

// FUNCTIONS ----- INITIALISATION -----          
//* ----------- initPersonalInfo ----------------
const initPersonalInfo = (data) => {
    lastNameInput.value = data.personalInfo.lastName;
    firstNameInput.value = data.personalInfo.firstName;
    addressInput.value = data.personalInfo.address;
    phoneInput.value = data.personalInfo.phone;
    emailInput.value = data.personalInfo.email;
    linkedinInput.value = data.personalInfo.linkedin;
    portfolioInput.value = data.personalInfo.portfolio;
    dateOfBirthInput.value = data.personalInfo.dateOfBirth;
    drivingLicenseInput.value = data.personalInfo.drivingLicense;
};

//* ------------ initFormations -----------------
const initFormations = (data) => {
    for(const formation of data.formations) {
        // Création du container .formation-container
        const formationContainer = document.createElement('div');
        formationContainer.classList.add('formation-container');

        // Création de l'input pour l'année du diplôme/licence
        createInput('number', 'formationYear', formationContainer, formation.year);

        // Création du container pour le nom du diplôme/licence
        createInput('text', 'formationDegree', formationContainer, formation.degree);

        // Création de l'input pour l'institution du diplôme/licence
        createInput('text', 'formationInstitution', formationContainer, formation.institution);

        // Mettre formation-container dans formationsContainer
        formationsContainer.appendChild(formationContainer);
    }
};

//* -------------- initSkills -------------------
const initSkills = (data) => {
    fillTheSkills(data, 'optique', '...en optique');
    fillTheSkills(data, 'ferroviaire', '...dans le ferroviaire');
    fillTheSkills(data, 'informatique', '...en informatique');
    fillTheSkills(data, 'polyvalent', '...polyvalentes');
};

//* ------------- initLanguages -----------------
const initLanguages = (data) => {
    const languageContainer = createElement('ul', 'language-container', languagesContainer);
    for(const language of data.languages) {
        const languageLi = createElement('li', 'languageLi', languageContainer);
        const languageInput = createInput('text', 'language', languageLi, language.language);
        const levelText = createElement('span', 'levelText', languageLi);
        levelText.textContent = 'niveau : ';
        const languageLevel = createInput('text', 'languageLevel', languageLi, language.level);
    };
};

//* ------------ initPreferences ----------------
const initPreferences = (data) => {
    mobilityInput.value = data.preferences.mobility;
    availabilityInput.value = data.preferences.availability;
};

//* ------------ initExperiences ----------------
const initExperiences = (data) => {
    // Génération des experiences
    for(const experience of data.experiences) {
        // Création du container par experience
        const experienceContainer = createElement('li', 'experience-container', experiencesGeneralUl);
        init1experience(experienceContainer, experience);
    };
};



//*-------------- initProfile -------------------
export const initProfile = () => {
    //* Récupération des données
    fetch('https://raw.githubusercontent.com/jhauck67/CandidAI/refs/heads/main/assets/data/profile.json')
    .then(response => response.json())
    .then(data => {
        initPersonalInfo(data);
        initFormations(data);
        initSkills(data);
        initLanguages(data);
        initPreferences(data);
        initExperiences(data);
    })
    .catch(error => console.error('Erreur de chargement du JSON : ', error));
};
