export interface Recipe {
    imageUrl: any;
    title: string;
    rating: number;
    calories: number;
    ingredients: string[];
    steps: { description: string }[];
  }
  
  export const burgerRecipe: Recipe = {
    imageUrl: require('@/assets/images/burger4card.png'),
    title: 'Delicious Burger',
    rating: 4.5,
    calories: 1100,
    ingredients: ["50g Meat", "10g fat", "3g Salt"],
    steps: [
      { description: "Mix meat with fat and salt." },
      { description: "Shape into patties." },
      { description: "Grill until cooked through." },
      { description: "Assemble the burger with your favorite toppings." },
      { description: "Assemble the burger with your favorite toppings." },
      { description: "Assemble the burger with your favorite toppings." },
      { description: "Assemble the burger with your favorite toppings." },
      { description: "Assemble the burger with your favorite toppings." },
      { description: "Assemble the burger with your favorite toppings." },
      { description: "Assemble the burger with your favorite toppings." },
      { description: "Assemble the burger with your favorite toppings." },
      { description: "Assemble the burger with your favorite toppings." },
      { description: "Assemble the burger with your favorite toppings." },
      { description: "Assemble the burger with your favorite toppings." },
    ]
  };
  
  export const tacoRecipe: Recipe = {
    imageUrl: require('@/assets/images/taco4card.png'),
    title: 'Hot Taco',
    rating: 4.5,
    calories: 870,
    ingredients: ["100g Ground beef", "1 Taco shell", "Lettuce", "Cheese", "Salsa"],
    steps: [
      { description: "Cook the ground beef until browned." },
      { description: "Place the beef into the taco shell." },
      { description: "Top with lettuce, cheese, and salsa." }
    ]
  };
  
  export const noodlesRecipe: Recipe = {
    imageUrl: require('@/assets/images/noodles4card.png'),
    title: 'Japanese Noodles',
    rating: 4,
    calories: 600,
    ingredients: ["200g Noodles", "Soy sauce", "Vegetables"],
    steps: [
      { description: "Boil the noodles until soft." },
      { description: "Stir-fry the vegetables." },
      { description: "Mix noodles with vegetables and soy sauce." }
    ]
  };
  
  export const saladRecipe: Recipe = {
    imageUrl: require('@/assets/images/salad4card.png'),
    title: 'Easy Salad',
    rating: 5,
    calories: 30,
    ingredients: ["Lettuce", "Tomatoes", "Cucumbers", "Olive oil", "Lemon juice"],
    steps: [
      { description: "Chop the lettuce, tomatoes, and cucumbers." },
      { description: "Mix all the vegetables together." },
      { description: "Drizzle with olive oil and lemon juice." }
    ]
  };
  