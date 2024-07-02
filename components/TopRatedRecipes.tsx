import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Recipe } from '@/types/types';
import { db } from '@/firebaseConfig';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import CustomText from './ui/CustomText';

interface TopRatedRecipesProps {
  onPress: (recipe: Recipe) => void;
}

const TopRatedRecipes: React.FC<TopRatedRecipesProps> = ({ onPress }) => {
  const [topRecipes, setTopRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'recipes'), orderBy('totalLikes', 'desc'), limit(3));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const recipes: Recipe[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Recipe));
      setTopRecipes(recipes);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <CustomText style={styles.top3}>
        Top 3 Trending Recipes 🔥
      </CustomText>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#B24B3D" />
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topRecipes.map((recipe, index) => (
            <TouchableOpacity key={index} style={styles.recipeCard} onPress={() => onPress(recipe)}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: recipe.imageUrl }} style={styles.recipeImage} />
              </View>
              <View style={styles.details}>
                <CustomText style={styles.recipeTitle}>{recipe.title}</CustomText>
                <CustomText style={styles.authorText}>👨‍🍳 {recipe.author}</CustomText>
                <View style={styles.recipeInfo}>
                  <View style={styles.infoContainer}>
                    <Ionicons name='heart' size={30} color='#c25648' />
                    <CustomText style={styles.recipeRating}>{recipe.totalLikes > 0 ? recipe.totalLikes : "0"} Likes </CustomText>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginTop: 0,
  },
  top3: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'left',
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: '#B24B3D',
    elevation: 3,
    borderRadius: 10,
    marginVertical: 5,
    overflow: 'hidden',
    marginHorizontal: 3,
    width: 300,
    height: 150,
  },
  imageContainer: {
    width: '45%',
    height: '90%',
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 5,
    overflow: 'hidden',
    backgroundColor: '#c25648',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  details: {
    padding: 10,
    justifyContent: 'center',
    flex: 1,
  },
  recipeTitle: {
    fontSize: 20,
    color: '#fff',
  },
  authorText: {
    fontSize: 16,
    color: '#fff',
  },
  recipeInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 5,
    borderRadius: 20,
  },
  recipeRating: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
  },
});

export default TopRatedRecipes;
