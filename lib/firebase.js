// lib/firebase.js

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqSA600wraKc-xoTR-lxkZRmrglvAy4kc",
  authDomain: "thenuxhost.firebaseapp.com",
  projectId: "thenuxhost",
  storageBucket: "thenuxhost.firebasestorage.app",
  messagingSenderId: "320806299904",
  appId: "1:320806299904:web:69e26180ac4affe31d2be5",
  measurementId: "G-3ZM5N59GZB"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
