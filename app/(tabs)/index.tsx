import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import RecipeCardRow from '@/components/RecipeCardRow';
import RecipeDetailsModal from '@/components/RecipeDetailsModal';
import CategorySelection from '@/components/CategorySelection';
import SearchBar from '@/components/SearchBar';
import { Recipe } from '@/types/types';
import { db } from '@/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import RecipeCard from '@/components/RecipeCard';
import CustomText from '@/components/ui/CustomText';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('New');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'recipes'), (snapshot) => {
      const updatedRecipes: Recipe[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Recipe));
      setRecipes(updatedRecipes);
      setFilteredRecipes(updatedRecipes);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [searchText, selectedCategory]);

  const filterRecipes = () => {
    let filtered = recipes;

    if (searchText) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory !== 'New') {
      filtered = filtered.filter(recipe =>
        recipe.categories.includes(selectedCategory)
      );
    }

    setFilteredRecipes(filtered);
  };

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
      <View style={styles.headerContainer}>
        <CustomText style={styles.welcomeText}>
          Recipe
          <CustomText style={styles.feastText}>Native</CustomText>
        </CustomText>
        <View style={styles.notificationContainer}>
          <Ionicons style={styles.bellIcon} size={25} name='notifications-outline'/>
          <View style={styles.notificationDot} />
        </View>
      </View>
      <CustomText style={styles.top3}>
        Top 3 Trending Recipes 🔥
      </CustomText>
      <RecipeCardRow recipes={recipes} onPress={handleRecipePress} />
      <CustomText style={styles.exploreText}>
        Explore Our Delicious Categories!
      </CustomText>
      <SearchBar searchText={searchText} onSearchTextChange={setSearchText} />
      <CategorySelection selectedCategory={selectedCategory} onCategoryPress={handleCategoryPress} />
      <View>
        <View style={styles.recipesSection}>
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} onPress={() => handleRecipePress(recipe)} />
          ))}
        </View>
      </View>
      <RecipeDetailsModal visible={modalVisible} recipe={selectedRecipe} onClose={closeModal} />
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'relative',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  top3: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'left',
    color: '#555',
  },
  exploreText: {
    fontSize: 18,
    textAlign: 'left',
    color: '#555',
  },
  notificationContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  bellIcon: {
    color: '#000',
  },
  notificationDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  welcomeText: {
    fontSize: 24,
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
  recipesSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#ff6347',
  },
});

export default HomeScreen;