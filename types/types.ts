export interface User {
    name: string;
    age: string;
    bio: string;
    country: string;
  }

  export interface Recipe {
    id: string;
    imageUrl: string; 
    title: string;
    rating: number; 
    calories: number;
    time: number; // Time in minutes
    categories: string[];
    ingredients: string[];
    steps: { description: string }[];
    // Optional fieldsS
    cuisineType?: string; 
    author?: string;
  }
  
  