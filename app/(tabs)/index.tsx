import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import RecipeCard from '@/components/RecipeCard';
import RecipeDetailsModal from '@/components/RecipeDetailsModal';
import CategorySelection from '@/components/categorySelection'; 
import SearchBar from '@/components/SearchBar'; 
import { Recipe } from '@/types/types';
import { db } from '@/firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('Hot');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]); 
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]); 

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [searchText, recipes, selectedCategory]);

  const fetchRecipes = async () => {
    try {
      const recipeList: Recipe[] = [];
      const temp = await getDocs(collection(db, 'recipes'));
      temp.forEach(doc => {
        recipeList.push({ id: doc.id, ...doc.data() } as Recipe);
      });
      setRecipes(recipeList);
    } catch (error) {
      console.error('Error fetching recipes: ', error);
    }
  };

  const filterRecipes = () => {
    let filtered = recipes;

    if (searchText) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory) {
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
      <Text style={styles.welcomeText}>
        Ready to
        <Text style={styles.feastText}> FEAST?</Text>
        <Text style={styles.feastText}>😋</Text>
      </Text>
      <SearchBar searchText={searchText} onSearchTextChange={setSearchText} />
      <Text style={styles.exploreText}>
        Explore Our Delicious Categories! 🍉
      </Text>
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
  recipesSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
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
