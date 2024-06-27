import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { Recipe } from "@/types/types";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";

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
            <Text style={styles.modalTitle}>{recipe.title}</Text>
            <View style={styles.ratingAndCalories}>
              <View style={styles.detailItem}>
                <Ionicons name='heart' size={20} color='#FF4500' />
                <Text style={styles.detailText}>{totalLikes > 0 ? `${totalLikes} Likes` : "0 Like"}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name='flame' size={20} color='#FF4500' />
                <Text style={styles.detailText}>{recipe.calories} Kcal</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name='time' size={16} color='#388ce0' />
                <Text style={styles.detailText}>{recipe.time} Min</Text>
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
            <View style={styles.likeContainer}>
              <Text style={styles.userRatingText}>Did you like the recipe?</Text>
              <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
                <Ionicons name={userLiked ? 'heart' : 'heart-outline'} size={60} color={userLiked ? '#FF4500' : '#888'} />
              </TouchableOpacity>
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
  likeContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    fontSize: 18,
    color: '#444',
    marginLeft: 10,
  },
  userRatingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default RecipeDetailsModal;
