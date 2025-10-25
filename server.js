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
//*             LECTURE DU PROFIL
//*----------------------------------------------
// Calcule le chemin absolu du répertoire actuel du fichier (requis pour ES Modules)
// La fonction fileURLToPath convertit correctement l'URL en chemin du système de fichiers local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Utilise la méthode standard

const profilePath = path.join(__dirname, 'assets', 'data', 'profile.json');

let monProfil = {};
try {
    // Lecture synchrone du fichier et conversion en objet JavaScript
    const profileData = fs.readFileSync(profilePath, 'utf8');
    monProfil = JSON.parse(profileData);
    console.log("✅ Profil utilisateur chargé avec succès.");
} catch (error) {
    console.error("❌ Erreur lors du chargement du fichier de profil :", error.message);
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

  try {
    const prompt = `En tant qu'expert en recrutement, ton rôle est d'analyser l'offre d'emploi ('ANNONCE D'EMPLOI') et d'en déduire les compétences clés requises chez l'utilisateur.

    INSTRUCTIONS CLÉS (À RESPECTER IMPÉRATIVEMENT) :
    1. Génère un CV complet et ciblé pour l'annonce, en utilisant uniquement les informations présentes dans le 'PROFIL UTILISATEUR'.
    2. NE JAMAIS, sous AUCUN prétexte, inventer de poste, de date, ou d'expérience professionnelle qui ne figure pas dans la section 'experiences' du PROFIL UTILISATEUR.
    3. Si l'annonce concerne le domaine ferroviaire, utiliser les connaissances ferroviaires comme 'Compétences Techniques' ou 'Formations' et non comme 'Expérience Professionnelle'.
    4. Adapte et reformule les descriptions d'expériences ('missions') pour mettre en évidence les COMPÉTENCES TRANSFÉRABLES qui correspondent spécifiquement aux besoins de l'annonce.
    5. Le CV doit être renvoyé en format texte simple (Markdown).

    ANNONCE D'EMPLOI :
    ---
    ${annonce}
    ---

    PROFIL UTILISATEUR COMPLET :
    ---
    ${JSON.stringify(monProfil)}
    ---

    Génère maintenant le contenu complet du CV.`;

    // Utilisation de client.models.generateContent
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash", // Utilisons un modèle performant
      contents: prompt,
    });

    // Extraction de la réponse peut varier, mais celle-ci est standard
    const cv = response.text; 
    
    res.json({ cv });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur API Gemini" });
  }
});

//*----------------------------------------------
//*                 LANCEMENT
//*----------------------------------------------
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
