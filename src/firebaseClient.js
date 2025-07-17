// firebaseClient.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxZxwUigphrduqGgaI2eLQ26Ih0Xg4jDU",
  authDomain: "shadowchat-c6934.firebaseapp.com",
  projectId: "shadowchat-c6934",
  storageBucket: "shadowchat-c6934.firebasestorage.app",
  messagingSenderId: "1039979778568",
  appId: "1:1039979778568:web:0c5a557ef325c94fa877bd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
