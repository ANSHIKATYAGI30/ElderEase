
import { GoogleGenAI } from "@google/genai";
import { Resident, LanguageCode } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIResponse = async (
  resident: Resident, 
  userInput: string, 
  language: LanguageCode
) => {
  const languageNames: Record<LanguageCode, string> = {
    en: 'English',
    hi: 'Hindi',
    bn: 'Bengali',
    mr: 'Marathi',
    ml: 'Malayalam'
  };

  const systemPrompt = `
    You are "Ease", a compassionate, polite, and slow-speaking AI companion for elderly individuals.
    Resident Profile:
    - Name: ${resident.name}
    - Age: ${resident.age}
    - Medical Background: ${resident.medicalHistory.join(', ')} (Use for context only, do not diagnose).
    
    Rules:
    1. Always respond in ${languageNames[language]}.
    2. Be supportive, polite, and use simple language.
    3. If the user mentions pain, falling, or feeling very unwell, gently suggest pressing the SOS button or waiting for a caregiver.
    4. DO NOT provide medical prescriptions or diagnoses.
    5. Maintain a calm and reassuring tone.
    6. Keep responses brief (under 50 words) to avoid overwhelming the user.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userInput,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    return response.text || "I am here for you. How can I help today?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having a little trouble connecting. Please know I am still here for you.";
  }
};
