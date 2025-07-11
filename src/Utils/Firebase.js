// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDucCp6uQlDnzJ-WGJRsG8_SKT3cOR5-Oo",
  authDomain: "devtinder-81456.firebaseapp.com",
  projectId: "devtinder-81456",
  storageBucket: "devtinder-81456.firebasestorage.app",
  messagingSenderId: "336544768747",
  appId: "1:336544768747:web:0dd31013efa735c0ead4ae",
  measurementId: "G-SFJH2K40S0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();