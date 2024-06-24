import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';

interface Recipe {
  imageUrl: any;
  title: string;
  rating: number;
  calories: number;
  ingredients: string[];
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
    backgroundColor: '#ffff',
  },
  modalContent: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  modalImage: {
    alignItems: 'center',
    minWidth: 100,

  },
  modalDetails: {
    width: '100%',
    backgroundColor: "#e3e3e3",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '100%'
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    textAlign: 'left',
  },
  closeButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#ff6347',
    padding: 10,
    alignSelf: 'center',
    width: '40%',
    borderRadius: 4
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RecipeDetailsModal;
