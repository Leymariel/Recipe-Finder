// api.ts
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_SPOON_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const searchRecipes = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query: query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};
