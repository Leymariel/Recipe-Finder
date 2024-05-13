// utils/generateRecipe.ts
import { db } from './firebaseConfig';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { generateRecipe } from './openaiAPI';
import { Recipe } from '../pages/index';

export const getOrGenerateRecipe = async (recipe: Recipe): Promise<string> => {
  const recipesRef = collection(db, 'recipes');
  const recipeRef = doc(recipesRef, recipe.id);
  const recipeDoc = await getDoc(recipeRef);

  if (recipeDoc.exists()) {
    // Recipe exists in the database, return the stored recipe steps
    return recipeDoc.data().recipeSteps;
  } else {
    // Recipe doesn't exist, generate new recipe steps using OpenAI API
    try {
      const generatedSteps = await generateRecipe(recipe.title);
      await setDoc(recipeRef, { recipeSteps: generatedSteps });
      return generatedSteps;
    } catch (error) {
      console.error('Failed to generate recipe steps:', error);
      throw new Error('Failed to fetch recipe. Please check the logs for more details.');
    }
  }
};