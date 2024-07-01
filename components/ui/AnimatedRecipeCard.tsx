import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from "@/types/types";

interface AnimatedRecipeCardProps {
  recipe: Recipe;
  onPress: (recipe: Recipe) => void;
  index: number;
}

const AnimatedRecipeCard: React.FC<AnimatedRecipeCardProps> = ({ recipe, onPress, index }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [animatedValue, index]);

  return (
    <Animated.View
      style={{
        opacity: animatedValue,
        transform: [{ translateY: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }],
      }}
    >
      <RecipeCard recipe={recipe} onPress={() => onPress(recipe)} />
    </Animated.View>
  );
};

export default AnimatedRecipeCard;
