// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS2OzC9OkSRU3T1ZhtsLxzKF9tZ6jS-b0",
  authDomain: "photofolio-ad078.firebaseapp.com",
  projectId: "photofolio-ad078",
  storageBucket: "photofolio-ad078.firebasestorage.app",
  messagingSenderId: "717526626953",
  appId: "1:717526626953:web:b08361a9354f8257ebcc58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
