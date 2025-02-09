import React, { useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return () => unsubscribe();
  }, []);

  async function initializeUser(user) {
    try {
      if (user) {
        setCurrentUser({ ...user });
        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
      setLoading(false);
    } catch {
      console.error("Error initializing user: ", error);
      throw error;
    }
  }

  const value = useMemo(
    () => ({
      currentUser,
      userLoggedIn,
      loading,
    }),
    [currentUser, userLoggedIn, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
