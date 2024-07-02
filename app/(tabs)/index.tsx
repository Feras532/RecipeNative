// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import RecipeDetailsModal from '@/components/RecipeDetailsModal';
import CategorySelection from '@/components/CategorySelection';
import SearchBar from '@/components/SearchBar';
import CustomText from '@/components/ui/CustomText';
import { Ionicons } from '@expo/vector-icons';
import TopRatedRecipes from '@/components/TopRatedRecipes';
import useFetchRecipes from '@/hooks/useFetchRecipes';
import AnimatedRecipeCard from '@/components/ui/AnimatedRecipeCard';
import { Recipe } from '@/types/types';

const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('New');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchText, setSearchText] = useState('');
  const { recipes, loading, isFetchingMore, loadMoreRecipes } = useFetchRecipes(searchText, selectedCategory);

  const handleCategoryPress = (label: string) => {
    setSelectedCategory(label);
  };

  const handleRecipePress = (recipe: Recipe) => {
    if (!loading) {
      setSelectedRecipe(recipe);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecipe(null);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20 && !isFetchingMore) {
      loadMoreRecipes();
    }
  };

  return (
    <ScrollView style={styles.container} onScroll={handleScroll} scrollEventThrottle={16}>
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
      <TopRatedRecipes onPress={handleRecipePress} />
      <CustomText style={styles.exploreText}>
        Explore Our Delicious Categories🤩
      </CustomText>                   
      <SearchBar searchText={searchText} onSearchTextChange={setSearchText} />
      <CategorySelection selectedCategory={selectedCategory} onCategoryPress={handleCategoryPress} />
      <View>
        <View style={styles.recipesSection}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#B24B3D" />
            </View>
          ) : recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <AnimatedRecipeCard
                key={index}
                recipe={recipe}
                onPress={handleRecipePress}
                index={index}
              />
            ))
          ) : (
            <CustomText style={styles.noRecipesText}>No recipes found 😔</CustomText>
          )}
        </View>
      </View>
      {isFetchingMore && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#B24B3D" />
        </View>
      )}
      <RecipeDetailsModal visible={modalVisible} recipe={selectedRecipe} onClose={closeModal} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  headerContainer: {
    position: 'relative',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  exploreText: {
    marginBottom: 5,
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
    backgroundColor: '#B24B3D',
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'left',
    color: '#000',
  },
  feastText: {
    color: '#B24B3D',
  },
  recipesSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  noRecipesText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
