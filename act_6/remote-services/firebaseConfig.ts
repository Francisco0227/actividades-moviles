// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
