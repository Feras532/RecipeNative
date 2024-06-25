import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { Recipe } from './dummyRecipes';

interface RecipeDetailsModalProps {
  visible: boolean;
  recipe: Recipe | null;
  onClose: () => void;
}

const RecipeDetailsModal: React.FC<RecipeDetailsModalProps> = ({ visible, recipe, onClose }) => {
  const [userRating, setUserRating] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  if (!recipe) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalImage}>
          <Image source={recipe.imageUrl} style={styles.modalImage} />
        </View>
        <ScrollView style={styles.modalContent}>
          <View style={styles.modalDetails}>
            <Text style={styles.modalTitle}>{recipe.title}</Text>
            <View style={styles.ratingAndCalories}>
              <View style={styles.detailItem}>
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text style={styles.detailText}>{recipe.rating}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="flame" size={20} color="#FF4500" />
                <Text style={styles.detailText}>{recipe.calories} kcal</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name='time' size={16} color='#388ce0' />
                <Text style={styles.detailText}>{recipe.time} min</Text>
              </View>

            </View>
            <Text style={styles.modalSectionTitle}>Ingredients:</Text>
            {recipe.ingredients?.map((ingredient, index) => (
              <Text key={index} style={styles.ingredient}>{ingredient}</Text>
            ))}
            <Text style={styles.modalSectionTitle}>Steps:</Text>
            {recipe.steps?.map((step, index) => (
              <Text key={index} style={styles.step}>{index + 1}. {step.description}</Text>
            ))}
            <View style={styles.userRatingSection}>
              <Text style={styles.userRatingText}>Did you like the recipe?</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                    <Ionicons
                      name={userRating >= star ? 'star' : 'star-outline'}
                      size={30}
                      color="#FFD700"
                      style={styles.starIcon}
                    />
                  </TouchableOpacity>
                ))}

              </View>
            </View>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff1d0',
  },
  modalImage: {
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalDetails: {
    width: '100%',
  },
  detailText: {
    fontSize: 18,
    color: '#444',
    marginLeft: 5,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalSectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  ingredient: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    textAlign: 'left',
  },
  step: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    textAlign: 'left',
  },
  closeButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#B24B3D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingAndCalories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userRatingSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  userRatingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  starIcon: {
    marginHorizontal: 5,
  },
});

export default RecipeDetailsModal;
