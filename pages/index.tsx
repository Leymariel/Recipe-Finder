'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';
import { searchRecipes } from '../utils/SpoontacularApi';
import { collection, doc, setDoc, addDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../utils/firebaseConfig';
import { User } from 'firebase/auth';
import { generateRecipe } from '../utils/openaiAPI';
import RecipeCard from '../components/RecipeCard';
import React from 'react';

export interface Recipe {
  id: string;
  title: string;
  image: string;
  summary: string;
  recipeSteps: string;
}

const ingredientSuggestions = [
  'Chicken', 'Beef', 'Pork', 'Tofu', 'Salmon', 'Shrimp', 'Eggs',
  'Milk', 'Cheese', 'Yogurt', 'Butter', 'Bread', 'Rice', 'Pasta',
  'Potatoes', 'Sweet Potatoes', 'Broccoli', 'Carrots', 'Spinach', 'Tomatoes',
  'Onions', 'Garlic', 'Ginger', 'Basil', 'Parsley', 'Thyme', 'Rosemary',
  'Oregano', 'Cinnamon', 'Nutmeg', 'Paprika', 'Cumin', 'Turmeric', 'Soy Sauce',
  'Olive Oil', 'Vinegar', 'Honey', 'Maple Syrup', 'Chocolate', 'Vanilla Extract',
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const favoritesRef = collection(db, 'favorites');
        const q = query(favoritesRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const favoritesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title as string,
          image: doc.data().image as string,
          summary: doc.data().summary as string,
          recipeSteps: doc.data().recipeSteps as string,
        }));
        setFavorites(favoritesData as Recipe[]);
      }
    };
  
    fetchFavorites();
  }, [user]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const results = await searchRecipes(selectedIngredients.join(','));
      setRecipes(results);
    } catch (error) {
      console.error('Error searching recipes:', error);
      setRecipes([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    const filteredSuggestions = ingredientSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      e.preventDefault();
      setSelectedIngredients([...selectedIngredients, searchQuery.trim()]);
      setSearchQuery('');
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSelectedIngredients([...selectedIngredients, suggestion]);
    setSearchQuery('');
    setSuggestions([]);
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = [...selectedIngredients];
    updatedIngredients.splice(index, 1);
    setSelectedIngredients(updatedIngredients);
  };

  const addFavoriteCard = async (recipe: Recipe) => {
    if (user) {
      try {

        // Generate a recipe description
        const recipeDescription = await generateRecipe(recipe.title);

        const docRef = doc(collection(db, "favorites"), recipe.id.toString());  // Using recipe ID as the Firestore document ID
        const favoriteData = {
          userId: user.uid,
          title: recipe.title,
          image: recipe.image,
          summary: recipe.summary || '',
          recipe: recipeDescription  // Store the generated recipe
        };

      await setDoc(docRef, favoriteData);
      console.log('Favorite card added successfully with generated recipe!');
      } catch (error) {
        console.error('Error adding favorite card:', error);
      }
    }
  };

  const removeFavoriteCard = async (recipeId: string) => {
    try {
      const docRef = doc(db, "favorites", recipeId);
      await deleteDoc(docRef);
      console.log('Favorite card removed successfully!');
    } catch (error) {
      console.error('Error removing favorite card:', error);
    }
  };

  const handleToggleFavorite = async (recipe: Recipe) => {
    if (user) {
      const isFavorite = favorites.some((fav) => fav.id === recipe.id);
      if (isFavorite) {
        await removeFavoriteCard(recipe.id.toString());
        setFavorites(favorites.filter((fav) => fav.id !== recipe.id));
      } else {
        await addFavoriteCard(recipe);
        setFavorites([...favorites, recipe]);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Recipe Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section id="search" className="mb-12">
        <div className="bg-green-500 py-20 px-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-white">Find Your Perfect Recipe</h2>
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter ingredients"
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-green-800"
              />
              {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg shadow-lg z-10">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-green-800"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="flex items-center px-3 py-1 bg-white text-green-800 rounded-full"
                >
                  {ingredient}
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <button
              type="submit"
              className="mt-6 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section id="recipes" className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Search Results</h2>
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {recipes.map((recipe: Recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.some((fav: Recipe) => fav.id === recipe.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No recipes found. Please try a different search.</p>
        )}
      </section>

      <section id="favorites" className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Favorite Recipes</h2>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {favorites.map((recipe: Recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.some((fav: Recipe) => fav.id === recipe.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No favorite recipes found.</p>
        )}
      </section>
    </>
  );
}