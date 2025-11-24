import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMissionReport = async (
  zone: string,
  weather: { wind: number; temp: number; rad: number },
  minerals: string[]
): Promise<string> => {
  try {
    const prompt = `
      Act as a planetary geologist AI system "COSMO".
      Generate a concise, technical field report for ${zone}.
      Data:
      - Wind: ${weather.wind} km/h
      - Temp: ${weather.temp} F
      - Radiation: ${weather.rad} uSv
      - Dominant Minerals: ${minerals.join(", ")}.

      Format the response as a short scientific status update (max 100 words) focusing on safety and sample viability.
      Do not use markdown formatting like **bold**, just plain text.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Unable to establish link with orbit. Report generation failed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "COMMUNICATION ERROR: Offline mode active. Cached data unavailable.";
  }
};