// src/utils/auth.js
export const TOKEN_KEY = "token";

// Save token
export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Get token
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove token
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Decode JWT (simple base64 decode)
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

// Check if token expired
export const isTokenExpired = () => {
  const token = getToken();
  if (!token) return true;

  const decoded = parseJwt(token);
  if (!decoded || !decoded.exp) return true;

  const now = Date.now() / 1000; // current time in seconds
  return decoded.exp < now;
};
