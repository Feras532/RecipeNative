import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/components/dummyRecipes';
import { ThemedView } from '@/components/ThemedView';
import RecipeDetailsModal from '@/components/RecipeDetailsModal';
import { burgerRecipe, noodlesRecipe, saladRecipe, tacoRecipe } from '@/components/dummyRecipes';

// Dummy data
const categories = [
  { emoji: '🍳', label: 'Breakfast' },
  { emoji: '🍔', label: 'Lunch' },
  { emoji: '🍝', label: 'Dinner' },
  { emoji: '🍰', label: 'High Cal' },
  { emoji: '🥗', label: 'Low Cal' },
  { emoji: '🍏', label: 'Healthy' },
  { emoji: '⚡', label: 'Fast' },
];
// Dummy Data
const recipes = [
  burgerRecipe,
  noodlesRecipe,
  saladRecipe,
  tacoRecipe,
  burgerRecipe,
  tacoRecipe,
  burgerRecipe,
  burgerRecipe,
  saladRecipe,
  burgerRecipe,
  burgerRecipe,
];

const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleCategoryPress = (label: string) => {
    setSelectedCategory(label);
  };

  const handleRecipePress = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecipe(null);
  };

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#2b2b2b' }}>
      <ThemedText style={styles.welcomeText}>Welcome Feras 👋</ThemedText>
      <ThemedText style={styles.questionText}>What do you like to munch on? 👀</ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories && categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryButton}
            onPress={() => handleCategoryPress(category.label)}
          >
            <View style={[
              styles.categoryInner,
              selectedCategory === category.label && styles.selectedCategoryInner,
            ]}>
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
            </View>
            <ThemedText style={styles.categoryLabel}>{category.label}</ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View>
        <ThemedText style={styles.sectionTitle}>Popular Recipes</ThemedText>
        <ThemedView style={styles.recipesSection}>
          {recipes && recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} onPress={() => handleRecipePress(recipe)} />
          ))}
        </ThemedView>
      </View>

      <RecipeDetailsModal visible={modalVisible} recipe={selectedRecipe} onClose={closeModal} />
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center',
    color: '#ff6347',
  },
  questionText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: '#000',
  },
  categoryScroll: {},
  recipesSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  categoryButton: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  categoryInner: {
    borderRadius: 50,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#525252',
    backgroundColor: '#ffffff', // Default background color
  },
  selectedCategoryInner: {
    backgroundColor: '#fff1d0', // Selected background color
  },
  categoryEmoji: {
    fontSize: 30,
  },
  categoryLabel: {
    fontSize: 14,
    marginTop: 5,
    color: '#000000',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#ff6347',
  },
});

export default HomeScreen;
