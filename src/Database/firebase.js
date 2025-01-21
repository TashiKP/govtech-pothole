// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9cuutvbNGHhdLPn8f4nVcUeV-i6hD9-c",
  authDomain: "pothole-govtech.firebaseapp.com",
  projectId: "pothole-govtech",
  storageBucket: "pothole-govtech.firebasestorage.app",
  messagingSenderId: "835687148428",
  appId: "1:835687148428:web:d116dbb976d65385ab84a9",
  measurementId: "G-6002B8EWRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);