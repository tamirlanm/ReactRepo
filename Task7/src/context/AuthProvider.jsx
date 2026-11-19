
import { useEffect, useMemo, useState } from "react";

import { AuthContext } from "./authContext";

import {
  signup,
  login,
  loginWithGoogle,
  logout,
  subscribeToAuthChanges,
  getAuthErrorMessage,
} from "../services/authService";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(
      (currentUser) => {
        setUser(currentUser);
        setSessionError("");
        setLoading(false);
      },
      (error) => {
        setUser(null);
        setSessionError(getAuthErrorMessage(error));
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      sessionError,
      signup,
      login,
      loginWithGoogle,
      logout,
    }),
    [user, loading, sessionError]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
