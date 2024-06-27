import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import RecipeCard from '@/components/RecipeCard';
import {Recipe} from "@/types/types"
import Accordion from 'react-native-collapsible/Accordion';
import RecipeDetailsModal from '@/components/RecipeDetailsModal';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";

const SECTIONS = [
  {
    title: '⭐',
    content: [],
  },
  {
    title: '⭐⭐',
    content: [],
  },
  {
    title: '⭐⭐⭐',
    content: [],
  },
  {
    title: '⭐⭐⭐⭐',
    content: [],
  },
  {
    title: '⭐⭐⭐⭐⭐',
    content: [],
  },
];

export default function Profile() {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [profileData, setProfileData] = useState<any>({ name: '', age: '', bio: '', country: '' });
  useEffect(() => {
    const fetchProfileData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setProfileData(userDoc.data());
        }
      }
    };
    fetchProfileData();
  }, []);

  const handleRecipePress = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecipe(null);
  };

  const renderHeader = (section: { title: string; content: any[] }) => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.sectionHeader}>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (section: { title: string; content: any[] }) => {
    return (
      <View style={styles.recipeContainer}>
        {section.content.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} onPress={() => handleRecipePress(recipe)} />
        ))}
      </View>
    );
  };

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* USER DETAILS */}
        <Image source={require('../../assets/images/man.png')} style={styles.profileImage} />
        <Text style={styles.name}>{profileData.name}</Text>
        <Text style={styles.age}>{profileData.age}</Text>
        <Text style={styles.bio}>{profileData.bio}</Text>
        <Text style={styles.location}>{profileData.country}</Text>

        {/* USER RATINGS */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>My Ratings:</Text>
          <Accordion
            sections={SECTIONS}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={(sections) => setActiveSections(sections)}
          />
        </View>

        {/* Recipe Details Modal */}
        <RecipeDetailsModal visible={modalVisible} recipe={selectedRecipe} onClose={closeModal} />
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
    width: 212,
    height: 250,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  age: {
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  recipeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});
