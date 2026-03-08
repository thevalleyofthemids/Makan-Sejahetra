export interface UserMetrics {
  height: number;
  weight: number;
  calorieGoal: number;
  bmi: number;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Swaps {
  riceType: 'brown' | 'cauliflower' | 'white';
  cookingMethod: 'air-fried' | 'grilled' | 'traditional';
  alternatives: 'diluted-santan' | 'low-fat-milk' | 'traditional';
}

export interface RecipeResult {
  modifiedName: string;
  architectNote: string;
  ingredients: string[];
  steps: string[];
  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
  };
}
