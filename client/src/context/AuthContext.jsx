import React, { createContext, useState, useEffect } from "react";
import { getToken, removeToken, isTokenExpired } from "../utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(getToken());

  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired()) {
      // decode user info from token
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUser(decoded);
      setTokenState(token);
    } else {
      setUser(null);
      setTokenState(null);
      removeToken();
    }
  }, []);

  const logout = () => {
    removeToken();
    setUser(null);
    setTokenState(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, setTokenState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
