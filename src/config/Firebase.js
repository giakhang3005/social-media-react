// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDDwqOuTBK224qFRm3HRJj5puTNBrO0gw",
  authDomain: "fir-social-media-prj.firebaseapp.com",
  projectId: "fir-social-media-prj",
  storageBucket: "fir-social-media-prj.appspot.com",
  messagingSenderId: "889841238039",
  appId: "1:889841238039:web:73f87d04fa62041ad39c52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);