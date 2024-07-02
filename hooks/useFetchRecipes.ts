import { useState, useEffect, useCallback } from 'react';
import { db } from '@/firebaseConfig';
import { collection, query, orderBy, limit, startAfter, getDocs, where } from 'firebase/firestore';
import { Recipe } from '@/types/types';

// number of recipes will load in eaach loading ;)
const PAGE_SIZE = 10;

const useFetchRecipes = (searchText: string, selectedCategory: string) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  // State to keep track of the last visible document for pagination
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Effect to fetch recipes when searchText or selectedCategory changes
  useEffect(() => {
    fetchRecipes();
  }, [searchText, selectedCategory]);

  // Function to fetch recipes
  const fetchRecipes = async (isLoadMore = false) => {
    // Set appropriate loading state
    if (isLoadMore) {
      setIsFetchingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const recipesRef = collection(db, 'recipes'); 
      let recipesQuery;

      // Build the query based on searchText and selectedCategory
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

      // Handle pagination
      if (isLoadMore && lastVisible) {
        recipesQuery = query(
          recipesRef,
          orderBy('title'),
          startAfter(lastVisible),
          limit(PAGE_SIZE)
        );
      }

      // Execute the query and map the results
      const documentSnapshots = await getDocs(recipesQuery);
      const newRecipes: Recipe[] = documentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Recipe));

      // Update the last visible document for pagination
      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);

      if (isLoadMore) {
        setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
        setIsFetchingMore(false);
      } else {
        setRecipes(newRecipes);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching recipes: ", error);
    }
  };

  // Function to load more recipes for pagination
  const loadMoreRecipes = useCallback(async () => {
    if (lastVisible) {
      await fetchRecipes(true);
    }
  }, [lastVisible, searchText, selectedCategory]);


  return { recipes, loading, isFetchingMore, loadMoreRecipes };
};

export default useFetchRecipes;
