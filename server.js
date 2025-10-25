//§==============================================
//§                  SERVER                      
//§==============================================

//*----------------------------------------------
//*                  IMPORTS
//*----------------------------------------------
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import fs from "fs"; // Module natif pour interagir avec le système de fichiers
import path from "path"; // Module pour gérer les chemins de fichiers
import { fileURLToPath } from 'url';

//*----------------------------------------------
//*          CONFIGURATION INITIALE
//*----------------------------------------------
dotenv.config(); // Charge les variables d'environnement du fichier .env (API KEY)

const app = express();
app.use(cors()); // Permet les requêtes inter-origines
app.use(express.json()); // Middleware pour parser les corps de requêtes en JSON

//*----------------------------------------------
//*   LECTURE DU PROFIL ET DU FORMAT DE REPONSE
//*----------------------------------------------
// Calcule le chemin absolu du répertoire actuel du fichier (requis pour ES Modules)
// La fonction fileURLToPath convertit correctement l'URL en chemin du système de fichiers local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Utilise la méthode standard

const profilePath = path.join(__dirname, 'assets', 'data', 'profile.json');
const schemaPath = path.join(__dirname, 'assets', 'data', 'responseFormat.json');

let monProfil = {};
let cvSchema = {};

try {
    // Lecture synchrone du fichier et conversion en objet JavaScript
    const profileData = fs.readFileSync(profilePath, 'utf8');
    monProfil = JSON.parse(profileData);
    console.log("✅ Profil utilisateur chargé avec succès.");
} catch (error) {
    console.error("❌ Erreur lors du chargement du fichier de profil :", error.message);
}

try {
    // Lecture du Schéma
    const schemaData = fs.readFileSync(schemaPath, 'utf8');
    cvSchema = JSON.parse(schemaData);
    console.log("✅ Schéma de réponse (responseFormat.json) chargé avec succès.");
} catch (error) {
    console.error("❌ Erreur lors du chargement d'un fichier JSON :", error.message);
}

// Initialisation du client Google GenAI avec la clé API
const client = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

//§==============================================
//§                ROUTES API                    
//§==============================================

//*----------------------------------------------
//*          ROUTE POST /generate-cv
//*----------------------------------------------
app.post("/generate-cv", async (req, res) => {
    const { annonce } = req.body;

    // NOUVEAUX CONSOLE.LOGS POUR VÉRIFICATION
    console.log("--- NOUVELLE REQUÊTE ---");
    console.log(`Annonce reçue (extrait): ${annonce.substring(0, 50)}...`);
    console.log(`Profil utilisateur chargé (Nom): ${monProfil.personalInfo.firstName} ${monProfil.personalInfo.lastName}`);
    console.log(`Schéma chargé (Clés principales): ${Object.keys(cvSchema)}`);

    try {
        const prompt = `En tant qu'expert en recrutement, ton rôle est d'analyser l'offre d'emploi ('ANNONCE D'EMPLOI') et d'en déduire les compétences clés requises chez l'utilisateur.

        INSTRUCTIONS CLÉS (À RESPECTER IMPÉRATIVEMENT) :
        1. Génère le contenu complet du CV en **respectant scrupuleusement le SCHÉMA JSON fourni**.
        2. NE JAMAIS inclure de prose, d'explication ou de texte supplémentaire. La réponse doit être **UNIQUEMENT** le JSON valide.
        3. Utilise uniquement les informations présentes dans le 'PROFIL UTILISATEUR'.
        4. NE JAMAIS inventer de poste, de date, ou d'expérience professionnelle qui ne figure pas dans le profil.
        5. Pour chaque section, adapte et reformule les descriptions (experiences, education) pour mettre en évidence les COMPÉTENCES TRANSFÉRABLES qui correspondent spécifiquement aux besoins de l'annonce.
        6. Le bloc "skills.technical" doit contenir un **maximum de 3 compétences clés** pertinentes pour l'annonce.
        7. Le bloc "skills.soft" doit contenir un **maximum de 3 compétences comportementales** pertinentes pour l'annonce.

        ANNONCE D'EMPLOI :
        ---
        ${annonce}
        ---

        PROFIL UTILISATEUR COMPLET :
        ---
        ${JSON.stringify(monProfil)}
        ---`; // Le prompt se termine ici.

        // Configuration pour la génération structurée
        const config = {
            responseMimeType: "application/json",
            responseSchema: {
                type: "object",
                properties: cvSchema // Ton schéma chargé est injecté ici !
            }
        };

        // Utilisation de client.models.generateContent avec la configuration
        const response = await client.models.generateContent({
            model: "gemini-2.5-flash", 
            contents: prompt,
            config: config, // Injection de la configuration
        });

        // La réponse sera un objet JSON valide, stocké dans `response.text`
        // Il est souvent nécessaire de le parser car `response.text` est une chaîne JSON
        const cvJsonString = response.text;

        // NOUVEAU CONSOLE.LOG POUR VÉRIFICATION
        console.log("Réponse JSON complète :\n", cvJsonString);

        const cv = JSON.parse(cvJsonString); 
        console.log("✅ JSON parsé avec succès. Titre du CV :", cv.header.work); 
        console.log("------------------------");
        
        // Renvoyer l'objet JSON généré, pas une simple chaîne de caractères
        res.json({ cv }); 
    } catch (err) {
        console.error("❌ Erreur lors de la génération du CV :", err);
        res.status(500).json({ error: "Erreur API Gemini ou erreur de parsing JSON" });
    }
});

//*----------------------------------------------
//*                 LANCEMENT
//*----------------------------------------------
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
