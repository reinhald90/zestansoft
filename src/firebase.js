import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Konfigurasi web Firebase bersifat publik (bukan rahasia).
// Keamanan data diatur lewat Firestore Rules (lihat firestore.rules).
const firebaseConfig = {
  apiKey: "AIzaSyA-ApyBFaOswrH6gJod4Vgc5zqG-8LWgNw",
  authDomain: "zestansoft.firebaseapp.com",
  projectId: "zestansoft",
  storageBucket: "zestansoft.firebasestorage.app",
  messagingSenderId: "583171267247",
  appId: "1:583171267247:web:6d16d9783fe34d9a86125a",
  measurementId: "G-NM7WWTZTPD",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
auth.languageCode = "id";
