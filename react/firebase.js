import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCnQrGubAylMcLfPEBS2ph3duj8RqPmvCc",
  authDomain: "sonix-music-app.firebaseapp.com",
  projectId: "sonix-music-app",
  storageBucket: "sonix-music-app.firebasestorage.app",
  messagingSenderId: "458868872360",
  appId: "1:458868872360:web:f1ad2776586791e412de9d",
  measurementId: "G-3BHE3VT5DL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {auth}
