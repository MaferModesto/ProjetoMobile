// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK0RLJQ5X82Jd6gXLoMOCNhSBOgzDBNl0",
  authDomain: "mobileprojeto-9821f.firebaseapp.com",
  projectId: "mobileprojeto-9821f",
  storageBucket: "mobileprojeto-9821f.firebasestorage.app",
  messagingSenderId: "622866867594",
  appId: "1:622866867594:web:3b8dea02d4a48327b25473"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db};