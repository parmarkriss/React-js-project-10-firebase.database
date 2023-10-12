// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRb3-RLwInWlamJtkIL475cIKca8aluUg",
  authDomain: "todo-list-3fb0c.firebaseapp.com",
  projectId: "todo-list-3fb0c",
  storageBucket: "todo-list-3fb0c.appspot.com",
  messagingSenderId: "130927834491",
  appId: "1:130927834491:web:a84d181756808edbb839de",
  measurementId: "G-ZEPVM9M0KC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);