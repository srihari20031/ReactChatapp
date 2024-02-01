// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBH7XupSNM2H8Q6s_WyIQpVGWUZWA4d3ds",
  authDomain: "react-chatapp-a95d6.firebaseapp.com",
  projectId: "react-chatapp-a95d6",
  storageBucket: "react-chatapp-a95d6.appspot.com",
  messagingSenderId: "493952678856",
  appId: "1:493952678856:web:d5286aeb868981331b9efd",
  measurementId: "G-KT6XNZFBC3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
