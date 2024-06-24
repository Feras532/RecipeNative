import React, { useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RecipeCard, { Recipe } from '@/components/RecipeCard';
import { ThemedView } from '@/components/ThemedView';
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

const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryPress = (label: string) => {
    setSelectedCategory(label);
  };

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedText style={styles.welcomeText}>Welcome Feras 👋</ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((category, index) => (
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
          <RecipeCard recipe={burgerRecipe} />
          <RecipeCard recipe={noodlesRecipe} />
          <RecipeCard recipe={saladRecipe} />
          <RecipeCard recipe={tacoRecipe} />
          <RecipeCard recipe={burgerRecipe} />
          <RecipeCard recipe={tacoRecipe} />
          <RecipeCard recipe={burgerRecipe} />
          <RecipeCard recipe={burgerRecipe} />
          <RecipeCard recipe={saladRecipe} />
          <RecipeCard recipe={burgerRecipe} />
          <RecipeCard recipe={burgerRecipe} />
          {/* Add more components */}
        </ThemedView>
      </View>
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
    backgroundColor: '#ffffff', // Default background color
  },
  selectedCategoryInner: {
    backgroundColor: '#dbdbdb', // Selected background color
  },
  categoryEmoji: {
    fontSize: 30,
  },
  categoryLabel: {
    fontSize: 14,
    marginTop: 5,
    color: '#000000',
  },
  recipesContainer: {
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
