// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your Firebase configuration object (from your Firebase console)
import { firebaseConfig as devConfig } from "./firebaseconfig.dev";
import { firebaseConfig as prodConfig } from "./firebaseconfig.prod";



const firebaseConfig = process.env.REACT_APP_ENV === "production" ? prodConfig : devConfig;


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);

export const storage = getStorage(app);



