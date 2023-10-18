// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8c-RDe0LTTUBdTwEEO59lAjENXPR_lZ0",
  authDomain: "sdn301-7a072.firebaseapp.com",
  projectId: "sdn301-7a072",
  storageBucket: "sdn301-7a072.appspot.com",
  messagingSenderId: "815625247218",
  appId: "1:815625247218:web:d0f5eb71c8dcff4e77736b",
  measurementId: "G-612DMTJP9E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
