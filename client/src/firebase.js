// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-ed2ca.firebaseapp.com",
  projectId: "mern-estate-ed2ca",
  storageBucket: "mern-estate-ed2ca.appspot.com",
  messagingSenderId: "793482085525",
  appId: "1:793482085525:web:0511499e15f408a34e479c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);