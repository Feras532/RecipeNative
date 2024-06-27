import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/components/dummyRecipes';
import RecipeDetailsModal from '@/components/RecipeDetailsModal';
import { burgerRecipe, noodlesRecipe, saladRecipe, tacoRecipe } from '@/components/dummyRecipes';

const categories = [
  { emoji: '🔥', label: 'Hot' },
  { emoji: '🍳', label: 'Breakfast' },
  { emoji: '🍔', label: 'Lunch' },
  { emoji: '🍝', label: 'Dinner' },
  { emoji: '🍰', label: 'High Cal' },
  { emoji: '🥗', label: 'Low Cal' },
  { emoji: '🍏', label: 'Healthy' },
  { emoji: '⚡', label: 'Fast' },
];

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>('Hot');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchText, setSearchText] = useState('');

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
      <Text style={styles.welcomeText}>
        Ready to
        <Text style={styles.feastText}> FEAST?</Text>
        <Text style={styles.categoryEmoji}>😋</Text>
      </Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#000" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search recipes..."
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <Text style={styles.exploreText}>
        Explore Our Delicious Categories! 🍉
      </Text>
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
            <Text style={styles.categoryLabel}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View>
        <View style={styles.recipesSection}>
          {recipes && recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} onPress={() => handleRecipePress(recipe)} />
          ))}
        </View>
      </View>

      <RecipeDetailsModal visible={modalVisible} recipe={selectedRecipe} onClose={closeModal} />
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#B24B3D",
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
  },
  exploreText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#000',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'left',
    color: '#000',
  },
  feastText: {
    color: '#B24B3D', // Color for "FEAST"
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
    borderColor: '#ccc',
    backgroundColor: '#ffffff', // Default background color
  },
  selectedCategoryInner: {
    backgroundColor: '#fff1d0', // Selected background color
    borderColor: "#B24B3D",
  },
  categoryEmoji: {
    fontSize: 30,
    lineHeight: 60,
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
