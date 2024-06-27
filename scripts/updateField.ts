import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteField } from "firebase/firestore";
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

async function addTotalReviewsField() {
  try {
    const recipesCollection = collection(db, 'recipes');
    const snapshot = await getDocs(recipesCollection);
    snapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, { totalReviews: 0 });
      console.log(`Updated recipe "${doc.id}" with totalReviews`);
    });
    console.log('All recipes have been updated with totalReviews');
  } catch (error) {
    console.error('Error updating recipes: ', error);
  }
}

async function removeFieldsFromRecipes() {
  try {
    const recipesCollection = collection(db, 'recipes');
    const snapshot = await getDocs(recipesCollection);
    snapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        rating: deleteField(),
        totalReviews: deleteField(),
        totalRates: deleteField()
      });
      console.log(`Updated recipe "${doc.id}" by removing fields`);
    });
    console.log('All recipes have been updated to remove specified fields');
  } catch (error) {
    console.error('Error updating recipes: ', error);
  }
}

removeFieldsFromRecipes();