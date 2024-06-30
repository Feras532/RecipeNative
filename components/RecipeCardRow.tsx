import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Recipe } from '@/types/types';

interface RecipeCardRowProps {
    recipes: Recipe[];
    onPress: (recipe: Recipe) => void;
}

const RecipeCardRow: React.FC<RecipeCardRowProps> = ({ recipes, onPress }) => {
    // Sort recipes by likes in descending order and take the top 3
    const topRecipes = recipes.sort((a, b) => b.totalLikes - a.totalLikes).slice(0, 3);

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {topRecipes.map((recipe, index) => (
                    <TouchableOpacity key={index} style={styles.recipeCard} onPress={() => onPress(recipe)}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: recipe.imageUrl }} style={styles.recipeImage} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.recipeTitle}>{recipe.title}</Text>
                            <Text style={styles.authorText}>👨‍🍳 {recipe.author}</Text>
                            <View style={styles.recipeInfo}>
                                <View style={styles.infoContainer}>
                                    <Ionicons name='heart' size={30} color='#c25648' />
                                    <Text style={styles.recipeRating}>{recipe.totalLikes > 0 ? recipe.totalLikes : "0"} Likes </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        marginVertical: 10,
    },
    recipeCard: {
        flexDirection: 'row',
        backgroundColor: '#B24B3D',
        elevation: 3,
        borderRadius: 10,
        marginVertical: 5,
        overflow: 'hidden',
        marginHorizontal: 3,
        width: 300,
        height: 150,
    },
    imageContainer: {
        width: '45%',
        height: '90%',
        borderRadius: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 5,
        overflow: 'hidden',
        backgroundColor: '#c25648',
    },
    recipeImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    details: {
        padding: 10,
        justifyContent: 'center',
        flex: 1,
    },
    recipeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    authorText: {
        fontSize: 16,
        color: '#fff',
    },
    recipeInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 5,
        borderRadius: 20,
    },
    recipeRating: {
        fontSize: 16,
        color: '#000',
        marginLeft: 5,
    },
    recipeCalories: {
        fontSize: 16,
        color: '#000',
        marginLeft: 5,
    },
    recipeTime: {
        fontSize: 16,
        color: '#000',
        marginLeft: 5,
    },
});

export default RecipeCardRow;
