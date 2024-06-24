import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from './ThemedText';
import { Recipe } from './dummyRecipes';

interface RecipeCardProps {
    recipe: Recipe;
    onPress: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress }) => {
    const translateY = useRef(new Animated.Value(200)).current;

    useEffect(() => {
        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    }, [translateY]);

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.recipeCard}>
                <Animated.View style={[styles.imageContainer, { transform: [{ translateY }] }]}>
                    <Animated.Image source={recipe.imageUrl} style={styles.recipeImage} />
                </Animated.View>
                <View style={styles.recipeInfo}>
                    <ThemedText style={styles.recipeTitle}>{recipe.title}</ThemedText>
                    <ThemedText style={styles.recipeRating}>
                        <Ionicons name='star' size={16} color='#FFD700' />
                        {' '}{recipe.rating}
                    </ThemedText>
                    <ThemedText style={styles.recipeCalories}>
                        <Ionicons name='flame' size={16} color='#FF4500' />
                        {' '}{recipe.calories}
                    </ThemedText>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    recipeCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        elevation: 5,
        width: 172,
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        overflow: 'visible',
    },
    recipeImage: {
        width: "100%",
        height: 140,
    },
    recipeInfo: {
        padding: 10,
        alignItems: 'center',
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    recipeRating: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    recipeCalories: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
});

export default RecipeCard;
export type { Recipe };
