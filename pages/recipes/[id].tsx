// pages/recipes/[recipeId].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';


const RecipeDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query;  // Retrieve id from the URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        if (!id || typeof id !== 'string') return; // Ensure id is a string and is defined
        const fetchRecipe = async () => {
          setLoading(true);
          try {
            const docRef = doc(db, 'favorites', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setRecipe(docSnap.data()); // Assumes recipe data is stored directly in the document
            } else {
              console.log("No such recipe found!");
            }
          } catch (error) {
            console.error("Error fetching recipe from Firestore:", error);
          }
          setLoading(false);
        };
    
        fetchRecipe();
      }, [id]);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (!recipe) {
        return <div>Recipe not found.</div>;
      }
    
      return (
        <div>
          <h1>{recipe.title}</h1>
          <img src={recipe.image} alt={recipe.title} />
          <div dangerouslySetInnerHTML={{ __html: recipe.recipe }} />
        </div>
      );
    };
    
    export default RecipeDetailsPage;