import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { auth, db } from '@/firebaseConfig';
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import RecipeCard from '@/components/RecipeCard';
import RecipeDetailsModal from '@/components/RecipeDetailsModal';
import { Recipe } from "@/types/types";

const Likes = () => {
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
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
      });

      return () => unsubscribe();
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

  if (!likedRecipes.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No liked recipes yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.recipesSection}>
          {likedRecipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} onPress={() => handleRecipePress(recipe)} />
          ))}
        </View>
      </ScrollView>
      <RecipeDetailsModal visible={modalVisible} recipe={selectedRecipe} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    flex: 1,
    padding: 4,
  },
  recipesSection: {
    marginTop: 60,
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
});

export default Likes;
