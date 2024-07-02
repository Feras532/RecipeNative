import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { recipes } from "./recipes";
import * as dotenv from "dotenv";

dotenv.config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storeRecipes = async () => {
  const recipesCollection = collection(db, "recipes");

  for (let i = 0; i < 100; i++) {
    for (const recipe of recipes) {
      try {
        await addDoc(recipesCollection, recipe);
        console.log(`Recipe '${recipe.title}' added successfully.`);
      } catch (error) {
        console.error(`Error adding recipe '${recipe.title}': `, error);
      }
    }
  }
};

storeRecipes().then(() => {
  console.log("All recipes have been added 1,000 times.");
}).catch((error) => {
  console.error("Error adding recipes: ", error);
});
