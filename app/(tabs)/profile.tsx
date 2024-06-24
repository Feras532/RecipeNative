import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import RecipeCard from '@/components/RecipeCard';
import { burgerRecipe, noodlesRecipe, saladRecipe, tacoRecipe } from '@/components/dummyRecipes';

const dummyProfileData = {
  name: 'Feras Alferas',
  email: 'Feras.Alsinan@lazywait.com',
  bio: 'Food enthusiast with a knack for discovering and sharing delicious recipes.',
  location: 'Qatif, Saudi Arabia',
  favoriteRecipes: [
    { ...burgerRecipe },
    { ...noodlesRecipe },
  ],
  savedRecipes: [
    { ...saladRecipe },
    { ...tacoRecipe },
  ],
  recentActivity: [
    'Liked Spicy Noodles recipe',
    'Saved Caesar Salad recipe',
    'Commented on Fish Tacos recipe',
  ],
};

export default function Profile() {
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../../assets/images/man.png")} style={styles.profileImage} />
        <Text style={styles.name}>{dummyProfileData.name}</Text>
        <Text style={styles.email}>{dummyProfileData.email}</Text>
        <Text style={styles.bio}>{dummyProfileData.bio}</Text>
        <Text style={styles.location}>{dummyProfileData.location}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Favorite Recipes</Text>
          {dummyProfileData.favoriteRecipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Saved Recipes</Text>
          {dummyProfileData.savedRecipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Recent Activity</Text>
          {dummyProfileData.recentActivity.map((activity, index) => (
            <Text key={index} style={styles.activity}>{activity}</Text>
          ))}
        </View>
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 26,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
  bio: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  location: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    width: '100%',
    marginTop: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  activity: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    textAlign: 'left',
  },
});

