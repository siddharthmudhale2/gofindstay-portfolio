// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoy7IDU12SoyXGWi7KYJiEujBWRdnmqdk",
  authDomain: "gofindstay-9bade.firebaseapp.com",
  projectId: "gofindstay-9bade",
  storageBucket: "gofindstay-9bade.appspot.com", // ✅ FIXED
  messagingSenderId: "994769379929",
  appId: "1:994769379929:web:43c503ae598cba012b0748",
  measurementId: "G-TSZCN08XT1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
