// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getAuth,RecaptchaVerifier } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn8F9Um48xevEsIW74Sd9kSkaksOeM1bY",
  authDomain: "otp-verification-974f5.firebaseapp.com",
  projectId: "otp-verification-974f5",
  storageBucket: "otp-verification-974f5.appspot.com",
  messagingSenderId: "567070174200",
  appId: "1:567070174200:web:72e929c5978d47a0e2c40d",
  measurementId: "G-1KDVQQZW9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)