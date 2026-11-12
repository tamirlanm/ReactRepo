import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export function signup(email, password) {
  return createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export function login(email, password) {
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function logout() {
  return signOut(auth);
}

export function subscribeToAuthChanges(
  onChange,
  onError
) {
  return onAuthStateChanged(
    auth,
    onChange,
    onError
  );
}

export function getAuthErrorMessage(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Password must meet the security requirements.";

    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password.";

    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled.";

    case "auth/popup-blocked":
      return "Please allow pop-ups in your browser.";

    case "auth/unauthorized-domain":
      return "This domain is not authorized in Firebase.";

    case "auth/network-request-failed":
      return "Network error. Check your internet connection.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    default:
      return error.message || "Authentication failed.";
  }
}
