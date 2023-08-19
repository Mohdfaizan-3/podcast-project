import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8Mq6rrXDNJN9yNmURlEYctWKx-17kAKk",
  authDomain: "podcast-project-b252e.firebaseapp.com",
  projectId: "podcast-project-b252e",
  storageBucket: "podcast-project-b252e.appspot.com",
  messagingSenderId: "108261483185",
  appId: "1:108261483185:web:1ccb60a674206be6557890",
  measurementId: "G-SK2P8QJE4W",
};

export const app = initializeApp(firebaseConfig);

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const snapshot = await getDoc(userDocRef);

  if (!snapshot.exists()) {
    const { displayName, email,uid } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        uid,
        ...additionalInfo,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserFromEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
};

export const getAuthUserDoc = async (user) => {
  return getDoc(doc(db, "users", user.uid));
};

export const authChangeEventListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

export const signOutUser = async () => await signOut(auth);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
