// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-blog-d5df2.firebaseapp.com",
  projectId: "mern-blog-d5df2",
  storageBucket: "mern-blog-d5df2.firebasestorage.app",
  messagingSenderId: "1050439104207",
  appId: "1:1050439104207:web:9b8cd4d4ffd897229fa9ba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);