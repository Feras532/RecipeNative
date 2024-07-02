import { useState, useCallback } from 'react';
import { db } from '@/firebaseConfig';
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { Recipe } from '@/types/types';

const PAGE_SIZE = 10;

const usePaginateRecipes = (lastVisible: any) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const loadMoreRecipes = useCallback(async () => {
    if (lastVisible) {
      setIsFetchingMore(true);
      try {
        const recipesRef = collection(db, 'recipes');
        const recipesQuery = query(
          recipesRef,
          orderBy('title'),
          startAfter(lastVisible),
          limit(PAGE_SIZE)
        );

        const documentSnapshots = await getDocs(recipesQuery);
        const newRecipes: Recipe[] = documentSnapshots.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Recipe));

        setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
        setIsFetchingMore(false);
      } catch (error) {
        console.error("Error loading more recipes: ", error);
        setIsFetchingMore(false);
      }
    }
  }, [lastVisible]);

  return { recipes, isFetchingMore, loadMoreRecipes };
};

export default usePaginateRecipes;
