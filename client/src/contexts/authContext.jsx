import React, { useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Create a context to store the user's authentication state
const AuthContext = React.createContext();

// Create a custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// Create a provider to wrap the app in
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if the user is logged in when the app loads. If they are, set the current user and set the userLoggedIn state to true
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return () => unsubscribe();
  }, []);

  // Initialize the user
  async function initializeUser(user) {
    try {
      if (user) {
        setCurrentUser({ ...user });
        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
    } catch (error) {
      console.error("Error initializing user: ", error);
    } finally {
      setLoading(false);
    }
  }

  // Store the user's authentication state in a value object. This value object will be passed to the AuthContext.Provider. The value object will be memoized so that it only updates when the currentUser, userLoggedIn, or loading state changes. This will prevent unnecessary re-renders of children components.
  const value = useMemo(
    () => ({
      currentUser,
      userLoggedIn,
      loading,
    }),
    [currentUser, userLoggedIn, loading]
  );

  // Return the AuthContext.Provider with the value object as a prop. Only render the children when the loading state is false
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
