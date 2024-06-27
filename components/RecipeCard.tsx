import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Recipe } from '@/types/types';

interface RecipeCardProps {
    recipe: Recipe;
    onPress: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.recipeCard}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: recipe.imageUrl }} style={styles.recipeImage} />
                </View>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <View style={styles.recipeInfo}>
                    <Text style={styles.recipeRating}>
                        <Ionicons name='star' size={16} color='#FFD700' />
                        {' '}{recipe.rating}
                    </Text>
                    <Text style={styles.recipeCalories}>
                        <Ionicons name='flame' size={16} color='#FF4500' />
                        {' '}{recipe.calories}
                    </Text>
                    <Text style={styles.recipeTime}>
                        <Ionicons name='time' size={16} color='#388ce0' />
                        {' '}{recipe.time}
                    </Text>
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
        resizeMode: 'contain',
    },
    recipeInfo: {
        padding: 10,
        fontSize: 30,
        color: '#888',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-between'
    },
    recipeTitle: {
        marginTop: 4,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    recipeRating: {
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#888',
    },
    recipeCalories: {
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#888',
    },
    recipeTime: {
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#888',
    },
});

export default RecipeCard;
export type { Recipe };
