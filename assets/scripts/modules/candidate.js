//§==============================================
//§                CANDIDATE                     
//§==============================================


// FUNCTION                                      
export const initCandidate = () => {
    const annonceInput = document.getElementById('annonce');
    const cvOutput = document.getElementById('response');
    const generateBtn = document.getElementById('generateBtn');

    generateBtn.addEventListener('click', async () => {
        const annonce = annonceInput.value;

        cvOutput.value = "Génération en cours...";

        try {
            const res = await fetch('http://localhost:3000/generate-cv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ annonce }),
            });
            const data = await res.json();
            cvOutput.value = data.cv;
        } catch (err) {
            console.error(err);
            cvOutput.value = "Erreur lors de la génération.";
        }
    });
};
