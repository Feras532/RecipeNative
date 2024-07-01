import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { auth, db } from '@/firebaseConfig';
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import RecipeDetailsModal from '@/components/RecipeDetailsModal';
import { Recipe } from "@/types/types";
import CustomText from '@/components/ui/CustomText';
import SearchBar from "@/components/SearchBar";
import AnimatedRecipeCard from '@/components/ui/AnimatedRecipeCard';

const Likes = () => {
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);

      const unsubscribe = onSnapshot(userRef, async (userDoc) => {
        const userData = userDoc.data();

        if (userData?.likes?.length) {
          const likedRecipeIds = userData.likes.map((like: any) => like.recipeId);
          const recipesCollection = collection(db, 'recipes');

          const likedRecipesPromises = likedRecipeIds.map(async (recipeId: string) => {
            const recipeDoc = await getDoc(doc(recipesCollection, recipeId));
            return { id: recipeDoc.id, ...recipeDoc.data() } as Recipe;
          });

          const likedRecipes = await Promise.all(likedRecipesPromises);
          setLikedRecipes(likedRecipes);
        } else {
          setLikedRecipes([]);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleRecipePress = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecipe(null);
  };

  const filteredLikedRecipes = likedRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B24B3D" />
        <CustomText style={styles.loadingText}>Loading your liked recipes...</CustomText>
      </View>
    );
  }

  if (!likedRecipes.length) {
    return (
      <View style={styles.container}>
        <CustomText style={styles.emptyText}>No liked recipes yet 😔</CustomText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomText style={styles.headerText}>Your Liked Recipes ❤️</CustomText>
      <CustomText style={styles.totalLikesText}>Total Likes: {likedRecipes.length}</CustomText>
      <SearchBar searchText={searchText} onSearchTextChange={setSearchText} />
      <ScrollView>
        <View style={styles.recipesSection}>
          {filteredLikedRecipes.map((recipe, index) => (
            <AnimatedRecipeCard
              key={index}
              recipe={recipe}
              onPress={handleRecipePress}
              index={index}
            />
          ))}
        </View>
      </ScrollView>
      <RecipeDetailsModal visible={modalVisible} recipe={selectedRecipe} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    padding: 10,
  },
  recipesSection: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
  },
  totalLikesText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#888',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#888',
  },
});

export default Likes;
