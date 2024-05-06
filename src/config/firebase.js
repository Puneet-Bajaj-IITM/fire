// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs76BjA5Wu9Qkrg_kZ24Hnh3K-CRhlcZ8",
  authDomain: "dna-questionnare.firebaseapp.com",
  projectId: "dna-questionnare",
  storageBucket: "dna-questionnare.appspot.com",
  messagingSenderId: "166030649937",
  appId: "1:166030649937:web:fc912ff92a5d0db0322670",
  measurementId: "G-EVPNNP8QZE"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);