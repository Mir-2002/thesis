import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth } from "./firebase";

//Create a new user with an email and password using Firebase Authentication
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

//Sign in with an email and password using Firebase Authentication
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

//TO DO: Convert to HTTP Cookies for server-side Access Token Storage
//Sign in with Github using Firebase Authentication
export const doSignInWithGithub = async () => {
  try {
    const provider = new GithubAuthProvider();
    provider.addScope("repo");
    const userCredential = await signInWithPopup(auth, provider);

    const credential = GithubAuthProvider.credentialFromResult(userCredential);
    const token = credential.accessToken;

    localStorage.setItem("githubAccessToken", token);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in with Github: ", error);
    throw error;
  }
};

//Sign out using Firebase Authentication and remove the Github Access Token from local storage
export const doSignOut = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("githubAccessToken");
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};

//Send a password reset email using Firebase Authentication
export const doPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email: ", error);
    throw error;
  }
};

//Update the current user's password using Firebase Authentication
export const doPasswordUpdate = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
  } catch (error) {
    console.error("Error updating password: ", error);
    throw error;
  }
};
