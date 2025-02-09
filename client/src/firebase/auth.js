import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

export const doSignInWithGithub = async () => {
  try {
    const provider = new GithubAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in with Github: ", error);
    throw error;
  }
};

export const doSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};

export const doPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email: ", error);
    throw error;
  }
};

export const doPasswordUpdate = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
  } catch (error) {
    console.error("Error updating password: ", error);
    throw error;
  }
};
