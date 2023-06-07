import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyAKzDRylyDT5fq4MzMXWLK5BD4v0M-WQq0",
  authDomain: "eventos-8f5a0.firebaseapp.com",
  projectId: "eventos-8f5a0",
  storageBucket: "eventos-8f5a0.appspot.com",
  messagingSenderId: "115558089444",
  appId: "1:115558089444:web:903e6530c88acbfc07e2f1",
  measurementId: "G-8M29HBNN5R",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app)
