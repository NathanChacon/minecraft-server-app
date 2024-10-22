// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider()

export {
    auth,
    googleAuthProvider
}