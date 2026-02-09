
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getDailyAction = async (category: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a single, highly actionable, and empowering micro-action for an ambitious woman in the ${category} category. It must take less than 15 minutes and move her closer to her goals. Format as a short sentence.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            action: { type: Type.STRING },
            why: { type: Type.STRING }
          },
          required: ["action", "why"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini action error:", error);
    return {
      action: "Review your top 3 goals for the next month.",
      why: "Focus leads to momentum."
    };
  }
};
