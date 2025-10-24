import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });


app.post("/generate-cv", async (req, res) => {
  const { annonce } = req.body;

  try {
    const prompt = `Génère un CV adapté pour cette annonce : ${annonce}`;

    // 🎯 CHANGEMENT ICI : Utilisation de client.models.generateContent
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash", // Utilisons un modèle performant
      contents: prompt,
    });

    // 🎯 CHANGEMENT ICI : L'extraction de la réponse peut varier, mais celle-ci est standard
    const cv = response.text; 
    
    res.json({ cv });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur API Gemini" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
