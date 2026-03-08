import { GoogleGenAI, Type } from "@google/genai";
import { UserMetrics, Swaps, RecipeResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function customizeRecipe(
  dishName: string,
  metrics: UserMetrics,
  swaps: Swaps
): Promise<RecipeResult> {
  const prompt = `
    Dish: ${dishName}
    User Metrics: BMI ${metrics.bmi.toFixed(1)}, Daily Calorie Goal ${metrics.calorieGoal} kcal
    Selected Swaps: 
    - Rice: ${swaps.riceType}
    - Cooking Method: ${swaps.cookingMethod}
    - Ingredient Alternatives: ${swaps.alternatives}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are the Makan Sejahtera Architect. Take the dish_name, user_metrics (BMI/Calories), and selected_swaps to return a modified recipe in structured JSON. Ensure the recipe is healthy and culturally authentic but optimized for the user's health goals.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          modifiedName: { type: Type.STRING },
          architectNote: { type: Type.STRING },
          ingredients: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          nutrition: {
            type: Type.OBJECT,
            properties: {
              calories: { type: Type.NUMBER },
              protein: { type: Type.NUMBER },
              fat: { type: Type.NUMBER },
              carbs: { type: Type.NUMBER },
              fiber: { type: Type.NUMBER }
            },
            required: ["calories", "protein", "fat", "carbs", "fiber"]
          }
        },
        required: ["modifiedName", "architectNote", "ingredients", "steps", "nutrition"]
      }
    }
  });

  return JSON.parse(response.text);
}
