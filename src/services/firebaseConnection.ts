import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSzQvcKchX0dwitjcTxJRw7I1I7aXFxjA",
  authDomain: "solidaria-af25c.firebaseapp.com",
  projectId: "solidaria-af25c",
  storageBucket: "solidaria-af25c.appspot.com",
  messagingSenderId: "903823566511",
  appId: "1:903823566511:web:e8f283d3dfe53ed3fe965a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
