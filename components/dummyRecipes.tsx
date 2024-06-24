import { Recipe } from "./RecipeCard";

export const burgerRecipe: Recipe = {
    imageUrl: require('@/assets/images/burger4card.png'),
    title: 'Delicious Burger',
    rating: 4.5,
    calories: 1100,
    ingredients: ["50g Meat","10g fat", "3g Salt"]
};
export const tacoRecipe: Recipe = {
    imageUrl: require('@/assets/images/taco4card.png'),
    title: 'Hot Taco',
    rating: 4.5,
    calories: 870,
    ingredients: []
};

export const noodlesRecipe: Recipe = {
    imageUrl: require('@/assets/images/noodles4card.png'),
    title: 'Japanese Noodles',
    rating: 4,
    calories: 600,
    ingredients: []
};
export const saladRecipe: Recipe = {
    imageUrl: require('@/assets/images/salad4card.png'),
    title: 'Easy Salad',
    rating: 5,
    calories: 30,
    ingredients: []
};
