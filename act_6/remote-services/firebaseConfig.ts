// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  initializeAuth,
} from "firebase/auth";
// @ts-ignore: los tipos de RN no se resuelven desde "firebase/auth"
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import { Firestore, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx_VBGgiXSj1eeqHMOb1YmL4ZNCeUviM4",
  authDomain: "fran-incident-vault.firebaseapp.com",
  projectId: "fran-incident-vault",
  storageBucket: "fran-incident-vault.firebasestorage.app",
  messagingSenderId: "1072387563248",
  appId: "1:1072387563248:web:4355eaad77b341fe1fac35",
  measurementId: "G-WZHZ53BEJY",
};

// Initialize App (Singleton for hot-reload safety)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with AsyncStorage Persistence for React Native / Expo
let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  auth = getAuth(app);
}
// Initialize Cloud Firestore Database
const db: Firestore = getFirestore(app);

// console.log(db)
export { app, auth, db };

