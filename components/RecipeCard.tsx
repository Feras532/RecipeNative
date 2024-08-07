import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Recipe } from '@/types/types';
import { db } from '@/firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import CustomText from './ui/CustomText';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress }) => {
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>(recipe);

  useEffect(() => {
    const recipeDocRef = doc(db, 'recipes', recipe.id);

    const unsubscribe = onSnapshot(recipeDocRef, (doc) => {
      if (doc.exists()) {
        setCurrentRecipe(doc.data() as Recipe);
      }
    });

    return () => unsubscribe();
  }, [recipe.id]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.recipeCard}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: currentRecipe.imageUrl }} style={styles.recipeImage} />
        </View>
        <CustomText style={styles.recipeTitle} numberOfLines={1} adjustsFontSizeToFit>
          {currentRecipe.title}
        </CustomText>
        <View style={styles.recipeInfo}>
          <CustomText style={styles.recipeRating}>
            <Ionicons name='heart' size={16} color='#FF4500' />{' '}
            {currentRecipe.totalLikes > 0 ? currentRecipe.totalLikes : "0"}
          </CustomText>
          <CustomText style={styles.recipeCalories}>
            <Ionicons name='flame' size={16} color='#ff8800' />{' '}
            {currentRecipe.calories}
          </CustomText>
          <CustomText style={styles.recipeTime}>
            <Ionicons name='time' size={16} color='#388ce0' />{' '}
            {currentRecipe.time}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
    width: 172,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    overflow: 'visible',
  },
  recipeImage: {
    width: "100%",
    height: 120,
    resizeMode: 'contain',
  },
  recipeInfo: {
    padding: 10,
    fontSize: 30,
    color: '#888',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between'
  },
  recipeTitle: {
    marginTop: 4,
    fontSize: 20,
    textAlign: 'center',
  },
  recipeRating: {
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#888',
  },
  recipeCalories: {
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#888',
  },
  recipeTime: {
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#888',
  },
});

export default RecipeCard;
