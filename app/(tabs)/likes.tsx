import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Modal } from 'react-native';
import { auth, db } from '@/firebaseConfig';
import { collection, doc, getDoc } from "firebase/firestore";
import RecipeCard from '@/components/RecipeCard';
import RecipeDetailsModal from '@/components/RecipeDetailsModal';
import { Recipe } from "@/types/types";

const Likes = () => {
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchLikedRecipes = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
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
        }
      }
    };

    fetchLikedRecipes();
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
      <FlatList
        data={likedRecipes}
        renderItem={({ item }) => <RecipeCard recipe={item} onPress={() => handleRecipePress(item)} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <RecipeDetailsModal visible={modalVisible} recipe={selectedRecipe} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff1d0',
    padding: 20,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Likes;
