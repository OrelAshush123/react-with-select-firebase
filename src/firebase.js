import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCa9oge7RcR3IAxP365hx1Kd5oHHmQZqo4",
  authDomain: "sal-fire.firebaseapp.com",
  projectId: "sal-fire",
  storageBucket: "sal-fire.appspot.com",
  messagingSenderId: "131150866049",
  appId: "1:131150866049:web:0264f1d0ee42d423494f80",
  measurementId: "G-NQWM7SC84L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
//const analytics = getAnalytics(app);