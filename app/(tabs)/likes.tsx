import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import { auth, db } from '@/firebaseConfig';
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import RecipeCard from '@/components/RecipeCard';
import RecipeDetailsModal from '@/components/RecipeDetailsModal';
import { Recipe } from "@/types/types";

const Likes = () => {
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B24B3D" />
        <Text style={styles.loadingText}>Loading your liked recipes...</Text>
      </View>
    );
  }

  if (!likedRecipes.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No liked recipes yet 😔</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Liked Recipes ❤️</Text>
      <Text style={styles.totalLikesText}>Total Likes: {likedRecipes.length}</Text>
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  totalLikesText: {
    fontSize: 20,
    fontWeight: 'bold',
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
