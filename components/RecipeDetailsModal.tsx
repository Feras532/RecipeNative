import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Image, Pressable, ScrollView } from 'react-native';
import { Recipe } from "@/types/types";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import CustomText from './ui/CustomText';
interface RecipeDetailsModalProps {
  visible: boolean;
  recipe: Recipe | null;
  onClose: () => void;
}

const RecipeDetailsModal: React.FC<RecipeDetailsModalProps> = ({ visible, recipe, onClose }) => {
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const user = auth.currentUser;

  useEffect(() => {
    if (recipe && user) {
      fetchUserLikeStatus();
      listenToRecipeUpdates();
    }
  }, [recipe, user]);

  const fetchUserLikeStatus = async () => {
    if (user && recipe) {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      const existingLike = userData?.likes?.find((like: any) => like.recipeId === recipe.id);
      setUserLiked(!!existingLike);
    }
  };

  const listenToRecipeUpdates = () => {
    if (recipe) {
      const recipeRef = doc(db, "recipes", recipe.id);
      onSnapshot(recipeRef, (doc) => {
        const data = doc.data();
        setTotalLikes(data?.totalLikes || 0);
      });
    }
  };

  const handleLike = async () => {
    if (user && recipe) {
      if (userLiked) {
        setUserLiked(false);
        setTotalLikes((prevLikes) => prevLikes - 1);
        await removeLike(recipe.id);
      } else {
        setUserLiked(true);
        setTotalLikes((prevLikes) => prevLikes + 1);
        await addLike(recipe.id);
      }
    }
  };

  const addLike = async (recipeId: string) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const recipeRef = doc(db, "recipes", recipeId);

    await updateDoc(userRef, {
      likes: arrayUnion({ recipeId })
    });

    await updateDoc(recipeRef, {
      totalLikes: totalLikes + 1
    });
  };

  const removeLike = async (recipeId: string) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const recipeRef = doc(db, "recipes", recipeId);

    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    const existingLike = userData?.likes?.find((like: any) => like.recipeId === recipeId);
    if (existingLike) {
      await updateDoc(userRef, {
        likes: arrayRemove(existingLike)
      });

      await updateDoc(recipeRef, {
        totalLikes: totalLikes - 1
      });
    }
  };

  if (!recipe) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <Image source={{ uri: recipe.imageUrl }} style={styles.modalImage} />
        <ScrollView style={styles.modalContent}>
          <View style={styles.modalDetails}>
            <CustomText style={styles.modalTitle}>{recipe.title}</CustomText>
            <CustomText style={styles.authorText}>👨🏻‍🍳 {recipe.author}</CustomText>
            <View style={styles.ratingAndCalories}>
              <View style={styles.detailItem}>
                <Ionicons name='flame' size={30} color='#ff5e00' />
                <CustomText style={styles.detailText}>{recipe.calories} Cal</CustomText>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name='time' size={30} color='#2e7bb3' />
                <CustomText style={styles.detailText}>{recipe.time} M</CustomText>
              </View>
              <View style={styles.detailItem}>
                <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
                  <Ionicons name={userLiked ? 'heart' : 'heart-outline'} size={30} color={userLiked ? '#FF4500' : '#888'} />
                  <CustomText style={styles.detailText}>{totalLikes > 0 ? `${totalLikes} Likes` : "0 Like"}</CustomText>
                </TouchableOpacity>
              </View>
            </View>
            <CustomText style={styles.modalSectionTitle}>Ingredients:</CustomText>
            <View style={styles.ingredientsContainer}>
              {recipe.ingredients?.map((ingredient, index) => (
                <View key={index} style={styles.ingredientContainer}>
                  <CustomText style={styles.ingredient}>{ingredient}</CustomText>
                </View>
              ))}
            </View>
            <CustomText style={styles.modalSectionTitle}>Steps:</CustomText>
            {recipe.steps?.map((step, index) => (
              <CustomText key={index} style={styles.step}>{index + 1}. {step.description}</CustomText>
            ))}
            <Pressable onPress={onClose} style={styles.closeButton}>
              <CustomText style={styles.closeButtonText}>Close</CustomText>
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
    width: '100%',
    height: 200,
    resizeMode: 'contain',
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
  modalTitle: {
    fontSize: 24,
    color: '#333',
    textAlign: 'left',
  },
  authorText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  ingredientContainer: {
    backgroundColor: '#fff1d0',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 16,
    color: '#555',
  },
  step: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    textAlign: 'left',
  },
  closeButton: {
    marginBottom: 30,
    backgroundColor: "#B24B3D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  ratingAndCalories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  detailItem: {
    backgroundColor: '#fcfcfc',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: '#999',
    shadowRadius: 4,
    elevation: 3,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    fontSize: 14,
    color: '#444',
    marginLeft: 5,
  },
  detailText: {
    fontSize: 18,
    color: '#444',
    marginLeft: 5,
  },
});

export default RecipeDetailsModal;
