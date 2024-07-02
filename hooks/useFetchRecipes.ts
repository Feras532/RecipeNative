import { useState, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { Recipe } from '@/types/types';

const PAGE_SIZE = 10;

const useFetchRecipes = (searchText: string, selectedCategory: string) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<any>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const recipesRef = collection(db, 'recipes');
        let recipesQuery;

        if (searchText && selectedCategory && selectedCategory !== 'New') {
          recipesQuery = query(
            recipesRef,
            where('title', '>=', searchText),
            where('title', '<=', searchText + '\uf8ff'),
            where('categories', 'array-contains', selectedCategory),
            orderBy('title'),
            limit(PAGE_SIZE)
          );
        } else if (searchText) {
          recipesQuery = query(
            recipesRef,
            where('title', '>=', searchText),
            where('title', '<=', searchText + '\uf8ff'),
            orderBy('title'),
            limit(PAGE_SIZE)
          );
        } else if (selectedCategory && selectedCategory !== 'New') {
          recipesQuery = query(
            recipesRef,
            where('categories', 'array-contains', selectedCategory),
            orderBy('title'),
            limit(PAGE_SIZE)
          );
        } else {
          recipesQuery = query(recipesRef, orderBy('title'), limit(PAGE_SIZE));
        }

        const documentSnapshots = await getDocs(recipesQuery);
        const newRecipes: Recipe[] = documentSnapshots.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Recipe));

        setRecipes(newRecipes);
        setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes: ", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchText, selectedCategory]);

  return { recipes, loading, lastVisible };
};

export default useFetchRecipes;
