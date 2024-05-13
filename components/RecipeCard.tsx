import React from 'react';
import { useRouter } from 'next/router'; // Corrected from next/navigation to next/router
import { Recipe } from '../pages/index';

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite: (recipe: Recipe) => void;
  isFavorite: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onToggleFavorite, isFavorite }) => {
  const router = useRouter();

  const handleCardClick = () => {
    // Navigate to the recipe detail page with recipe.id
    router.push(`/recipes/${recipe.id}`);
  };

  const handleStarClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation(); // Prevent the card click event from firing when the star is clicked
    onToggleFavorite(recipe);
  };

  return (
    <div className="cursor-pointer border border-gray-200 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg overflow-hidden" onClick={handleCardClick}>
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <svg
          onClick={handleStarClick}
          className={`star-icon h-6 w-6 ${isFavorite ? 'text-yellow-400' : 'text-gray-400'} transition duration-150 ease-in-out transform hover:scale-125`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{recipe.title}</h3>
        <p className="text-gray-600 text-sm">{recipe.summary}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
