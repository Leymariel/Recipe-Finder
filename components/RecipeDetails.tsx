// app/recipeDetais.tsx
import { useRouter } from 'next/navigation';
import { Recipe } from '../pages/index';
import React from 'react';

interface RecipeDetailsProps {
  recipe: Recipe;
  recipeSteps: string;
}

export default function RecipeDetails({ recipe, recipeSteps }: RecipeDetailsProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto py-8">
      <button onClick={handleBack} className="mb-4">
        &larr; Back
      </button>
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="mb-8" />
      <div dangerouslySetInnerHTML={{ __html: recipe.summary }}></div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Instructions</h2>
      <div>{recipeSteps}</div>
    </div>
  );
}