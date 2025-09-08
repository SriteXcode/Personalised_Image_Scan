import React, { createContext, useState, useEffect } from "react";
import { getToken, getRole, removeAuth, isTokenExpired } from "../utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(getToken());
  const [role, setRole] = useState(getRole());

  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired()) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUser(decoded);
      setTokenState(token);
      setRole(getRole());
    } else {
      setUser(null);
      setTokenState(null);
      setRole(null);
      removeAuth();
    }
  }, []);

  const logout = () => {
    removeAuth();
    setUser(null);
    setTokenState(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, role, setUser, setTokenState, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
