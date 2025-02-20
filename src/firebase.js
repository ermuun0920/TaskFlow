// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW7dJSF9e2kWsPf5V2PGodMlsEtM6eCJw",
  authDomain: "taskflow-89a07.firebaseapp.com",
  projectId: "taskflow-89a07",
  storageBucket: "taskflow-89a07.firebasestorage.app",
  messagingSenderId: "599230912429",
  appId: "1:599230912429:web:b244287b2f7f730949b324"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);