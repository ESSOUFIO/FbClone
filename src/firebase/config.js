// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuc5bpZgbBdvMMTPk1AEcA55L84F1sQlw",
  authDomain: "fbclone-5ccaa.firebaseapp.com",
  projectId: "fbclone-5ccaa",
  storageBucket: "fbclone-5ccaa.appspot.com",
  messagingSenderId: "458804330476",
  appId: "1:458804330476:web:05decbd54087aeb1ddcac9",
  measurementId: "G-ELX7FX6CNG",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
