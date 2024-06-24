import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';

interface Recipe {
  imageUrl: any;
  title: string;
  rating: number;
  calories: number;
  ingredients: string[];
  steps: { description: string }[];
}

interface RecipeDetailsModalProps {
  visible: boolean;
  recipe: Recipe | null;
  onClose: () => void;
}

const RecipeDetailsModal: React.FC<RecipeDetailsModalProps> = ({ visible, recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalImage}>
          <Image source={recipe.imageUrl} style={styles.modalImage} />
        </View>
        <View style={styles.modalContent}>
          <View style={styles.modalDetails}>
            <Text style={styles.modalTitle}>{recipe.title}</Text>
            <Text style={styles.modalSectionTitle}>Ingredients:</Text>
            {recipe.ingredients?.map((ingredient, index) => (
              <Text key={index} style={styles.ingredient}>{ingredient}</Text>
            ))}
            <Text style={styles.modalSectionTitle}>Steps:</Text>
            {recipe.steps?.map((step, index) => (
              <Text key={index} style={styles.step}>{index + 1}. {step.description}</Text>
            ))}
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalDetails: {
    width: '100%',
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
    backgroundColor: '#ff6347',
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
});

export default RecipeDetailsModal;
