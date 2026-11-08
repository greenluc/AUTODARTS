import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB6nMPsOeIrFxY8Z5KoU9FrrjTOt2dsEOk",
    authDomain: "dart-karriere-app.firebaseapp.com",
    projectId: "dart-karriere-app",
    storageBucket: "dart-karriere-app.firebasestorage.app",
    messagingSenderId: "482180485781",
    appId: "1:482180485781:web:715af732dda4885a5d419c"
};

const app = initializeApp(firebaseConfig);

// Exporte für die index.html
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

console.log("Firebase Pro-Verbindung aktiv (Firestore-Mode)!");
