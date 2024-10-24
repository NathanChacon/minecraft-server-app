// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your Firebase configuration object (from your Firebase console)
const firebaseConfig = {
    apiKey: "AIzaSyAMmWpONRKNao2zVzGcjpZ6mpXlPuarJdI",
    authDomain: "minecraft-server-br-31563.firebaseapp.com",
    projectId: "minecraft-server-br-31563",
    storageBucket: "minecraft-server-br-31563.appspot.com",
    messagingSenderId: "887060490980",
    appId: "1:887060490980:web:d992e659e54262334adaf1",
    measurementId: "G-CFJTHDZW78"
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export const storage = getStorage(app);