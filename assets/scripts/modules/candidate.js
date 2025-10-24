//§==============================================
//§                CANDIDATE                     
//§==============================================


// FUNCTION                                      
export const initCandidate = () => {
    // Variables 
    const annonceInput = document.getElementById('annonce');
    const cvOutput = document.getElementById('response');
    const generateBtn = document.getElementById('generateBtn');

    // Event Listener 
    generateBtn.addEventListener('click', () => {
        console.log(annonceInput.value);
    });
};

