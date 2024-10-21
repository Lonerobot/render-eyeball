// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration (from Firebase console)
const firebaseConfig = {
    apiKey: "AIzaSyABY-lTi_Cqmfi3Z3V_GGCyKj55rngiWXQ",
    authDomain: "render-eyeball-fb-react.firebaseapp.com",
    projectId: "render-eyeball-fb-react",
    storageBucket: "render-eyeball-fb-react.appspot.com",
    messagingSenderId: "926282959643",
    appId: "1:926282959643:web:f1b61e392ed36f9889e1be"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
