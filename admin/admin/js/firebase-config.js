import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8uZDSlXt9Jfglhh47zyo0wjdRxHuFMRc",
  authDomain: "mk-school-300b3.firebaseapp.com",
  projectId: "mk-school-300b3",
  storageBucket: "mk-school-300b3.firebasestorage.app",
  messagingSenderId: "153218908826",
  appId: "1:153218908826:web:c71655455007f525431523",
  measurementId: "G-6959G49TVX"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
